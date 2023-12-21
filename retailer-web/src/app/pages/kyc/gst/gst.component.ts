import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { Router } from '@angular/router';
import { PackageListPage } from '../../payment/package-list/package-list.page';
import { Location } from '@angular/common';
import { KycFormPage } from '../kyc-form/kyc-form.page';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.scss'],
})
export class GstComponent implements OnInit {

  gstNo: any;
  shopId: string;
  @Input() isModal: boolean;

  constructor(private modalCtrl: ModalController,
    private ngLocation: Location,
    private onBoardService: OnboardService,
    private storageService: StorageService,
    private commonService: CommonService,
    private onboardService: OnboardService,
    private router: Router,
    private alertCtrl: AlertController,
    private platform: Platform

  ) {
    this.shopId =
      this.commonService.getUserData() &&
        this.commonService.getUserData().shopId
        ? this.commonService.getUserData().shopId
        : this.storageService.getItem(Constants.SHOP_ID);
      
      this.getGstDetailsSubscription();

  }

  ngOnInit() {     
  }

  closeGstModal() {
    if (this.isModal == true) {
      this.openPackageListPageModal();
    }
    this.modalCtrl.dismiss();
  }

  getGstDetailsSubscription() {
    this.commonService.present();
    this.onboardService.getGstDetails(this.shopId ? this.shopId : null).subscribe((gstDetails: any) => {
      this.gstNo = gstDetails.data[0].GST_no;
    });
    this.commonService.dismiss();
  }

  submitGst() {
    // console.log(this.gstNo);
    if (this.gstNo) {
      const gstNo = { "GST_no": this.gstNo };
      const storeId =
        this.commonService.getUserData() &&
          this.commonService.getUserData().shopId
          ? this.commonService.getUserData().shopId
          : this.storageService.getItem(Constants.SHOP_ID);
      this.onBoardService.addGstNo(gstNo, storeId).subscribe((res: any) => {
        if (res.success) {
          this.closeGstModal();
          // this.router.navigate(['package-list']);
        } else if (res && res.error) {
          console.log(res.error.message);
          this.commonService.toast(res.error.message);
        }
      });;

    }
    else {
      this.commonService.danger("Please provide GSTIN number");
    }
  }
  async openPackageListPageModal() {
    const model = await this.modalCtrl.create({
      component: PackageListPage,
      cssClass: 'bottomModal',
      componentProps: {
        isModal: true,
      },
    });
    await model.present();
    // const { data } = await model.onWillDismiss();
    // console.log(data);
  }
  skipped() {
    this.closeGstModal();
    //this.openPackageListPageModal();
    // this.router.navigate(['package-list']);
  }

  async openKYCModal(shopExist) {
    const model = await this.modalCtrl.create({
      component: KycFormPage,
      cssClass: 'bottomModal',
      componentProps: {
        isModal: shopExist,
      },
    });
    await model.present();
  }

  async ConfirmGstNumber() {
    const alert = await this.alertCtrl.create({
      header: 'Do You Want To Continue With This Number?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            // this.router.navigate(['package-list']);
          },
        },
        {
          text: 'YES',
          role: 'confirm',
          handler: () => {

            if(this.gstNo)
                this.submitGst();
            else
                this.commonService.danger("Please provide GSTIN number");
          },
        },
      ],
    });

    await alert.present();


  };
  async ConfirmGstSkip() {
    const alert = await this.alertCtrl.create({
      header: 'Do You Want To Skip?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            // this.router.navigate(['kyc-form', 0]);
            // this.cancel();
          },
        },
        {
          text: 'YES',
          role: 'confirm',
          handler: () => {
            this.skipped();
          },
        },
      ],
    });

    await alert.present();


  };

}
