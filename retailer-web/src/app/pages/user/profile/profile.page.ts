import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { DashboardComponent } from 'src/app/referal/dashboard/dashboard.component';
import { ModalController } from '@ionic/angular';
import { CommonService } from '../../../lib/services/common.service';
import { AuthService } from '../../../lib/services/auth.service';
import { GstComponent } from '../../kyc/gst/gst.component';
import { ReferralService } from 'src/app/referal/referral.service'
import { StorageService } from 'src/app/lib/services/storage.service';
import { PaymentService } from 'src/app/lib/services/payment.service';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { OnboardService } from 'src/app/lib/services/onboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  subscriptionsStatus: any;
  ionVersionNumber:string;
  appEnvirorment=environment.production
  wantToLogOut ;
  shopId: string;
  gstSubmitted: any;
  isSubscribed: any;
  kycVerified: any;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    public commonservice: CommonService,
    public authservice: AuthService,
    private storageService: StorageService,
    public refferalservice: ReferralService,
    private paymentService: PaymentService,
    private platform: Platform,
    private alertCtrl: AlertController,
    private onboardService: OnboardService,
  ) { 
     /* App Version */
     console.log(this.appEnvirorment)
     this.platform.ready().then(() => {
      if (this.platform.is("android")||(this.platform.is("ios"))){
        this.commonservice.appCheckUpdate()
      }
    });
  }
  // Refer Banner
  refferalModule() {
    this.refferalservice.openReferralDashboardModal();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getShopOwnerDetails()
  }

  getShopOwnerDetails(){
    this.shopId =
      this.commonservice.getUserData() && this.commonservice.getUserData().shopId
        ? this.commonservice.getUserData().shopId : this.storageService.getItem(Constants.SHOP_ID);

    this.onboardService.getShopOwnerDetails(this.shopId ? this.shopId : null).subscribe((shopDetails: any) => {
      this.gstSubmitted = shopDetails.data.shop.GST_no;
      this.kycVerified = shopDetails.data.shop.isKYCVerified;
      this.isSubscribed = shopDetails.data.shop.isSubscribed;
    });
  }

  checkSubscriptionStatus() {
    this.commonservice.present();
    const storeId =
      this.commonservice.getUserData() &&
      this.commonservice.getUserData().shopId
        ? this.commonservice.getUserData().shopId
        : this.storageService.getItem(Constants.SHOP_ID)
        ? this.storageService.getItem(Constants.SHOP_ID)
        : this.commonservice.getUserData().userId;
    this.paymentService.checkStatusSubscriptions(storeId).subscribe((statusSubscr: any) => {
      this.commonservice.dismiss();
      if ((statusSubscr?.success) && (statusSubscr?.data && statusSubscr?.data != null && statusSubscr.data != undefined)) {
        this.subscriptionsStatus = statusSubscr.data;
        if (statusSubscr?.success && statusSubscr.data.subscription_status === 'ACTIVE') {
          this.router.navigate(['/subscription']);
        } else {
        
          console.log("in Packge list");
          this.router.navigate(['/package-list']);
        }
      } else {
        if (statusSubscr?.error && statusSubscr?.error != null && statusSubscr.error != undefined) {
          this.commonservice.danger(statusSubscr?.error?.message);
        }
      }
    });
  }
 
  async openReferralDashboardModal() {
    const modal = await this.modalCtrl.create({
      component: DashboardComponent,
    });
    modal.present();
  }

  async openGstModal() {
    const modal = await this.modalCtrl.create({
      component: GstComponent,
      cssClass: 'bottomModal',
      componentProps: {isModal : false,}
    });
    await modal.present();
  };

  // async showToast() {
  //   await this.toastctrl
  //     .create({
  //       message: "Hey! it's not available",
  //       duration: 2000,
  //     })
  //     .then((res) => res.present());
  // }

  // notAvailable(){
  //   this.referralService.showToast();
  // }
  async logOutUser() {

    this.wantToLogOut =  0 ;
    const alert = await this.alertCtrl.create({
      header: 'Are you sure , want to logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.wantToLogOut = 0;
          },

        },
        {
          text: 'Yes',
          handler: () => {
            this.wantToLogOut = 1;
          },

        },
      ],
    })
    await alert.present();
    await alert.onDidDismiss();
    if (this.wantToLogOut) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
      
 
  }
  editProfile(){
    this.router.navigate(['/edit-profile']);

  }
  
}
