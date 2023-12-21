import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { KycStatusPage } from 'src/app/pages/kyc/kyc-status/kyc-status.page';

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
    private alertCtrl: AlertController,) {
    this.shopId =
      this.commonService.getUserData() &&
        this.commonService.getUserData().shopId
        ? this.commonService.getUserData().shopId
        : this.storageService.getItem(Constants.SHOP_ID);
    if (!this.isModal) {
      this.getGstDetailsSubscription();
    }

  }

  ngOnInit() { }

  closeGstModal() {
    if (this.isModal == true) {
      //this.openPackageListPageModal();
      //this.ngLocation.back();
    }
    this.modalCtrl.dismiss();
  }

  getGstDetailsSubscription() {
    this.onboardService.getGstDetails(this.shopId ? this.shopId : null).subscribe((gstDetails: any) => {
      this.gstNo = gstDetails.data[0].GST_no;
    });
  }

  submitGst() {
    // console.log(this.gstNo);
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
        this.commonService.toast(res.error.message);
      }
    });;
  }
  /* async openPackageListPageModal() {
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
  } */
  skipped() {
    this.closeGstModal();
    //this.openPackageListPageModal();
    // this.router.navigate(['package-list']);
  }

  async openKYCModal(shopExist) {
    const model = await this.modalCtrl.create({
      component: KycStatusPage,
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
            this.submitGst();
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
