import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Constants } from 'src/app/config/constants';
import { ModalController } from '@ionic/angular';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { ReferralService } from 'src/app/referal/referral.service';
import { PaymentService } from 'src/app/lib/services/payment.service';
import { StorageService } from 'src/app/lib/services/storage.service';
//import { MyReferalComponent } from 'src/app/referal/my-referal/my-referal.component';
//import { DashboardComponent } from 'src/app/referal/dashboard/dashboard.component';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { ConfirmationPopupComponent } from 'src/app/components/confirmation-popup/confirmation-popup.component';
import { UserService } from 'src/app/lib/services/user.service';
import { AuthService } from 'src/app/lib/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  isKYCStatus: boolean = false;
  isBankDetailStatus: boolean = false;
  isVehicleDetailStatus: boolean = false;
  isFlatRate: boolean = false;
  isOnbording: boolean = false;
  isSubscribed: boolean = false;
  isActive: boolean = false;
  userDetail: any;
  subscriptionsStatus: any;
  appEnvirorment = environment.production
  env_name = environment.env_name
  deactivateInfo: any;
  userDeactivationId: any;

  constructor(private router: Router,
    private ngLocation: Location,
    private modalCtrl: ModalController,
    public commonservice: CommonService,
    private alertController: AlertController,
    public refferalservice: ReferralService,
    private onboardService: OnboardService,
    private paymentService: PaymentService,
    private storageService: StorageService,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private userService: UserService,
    public authservice: AuthService) {

    /* App Version */
    console.log(this.appEnvirorment)
    this.platform.ready().then(() => {
      if (this.platform.is("android") || (this.platform.is("ios"))) {
        this.commonservice.appCheckUpdate()
      }
    });

  }

  ngOnInit() {
    //this.getUserDetails();
  }

  ionViewWillEnter() {
    this.getShopOwnerDetails();
    this.getUserDetails();
    this.checkSubscriptionStatus();
  }

  getShopOwnerDetails() {
    this.onboardService.getOnboardingAndSubscription().subscribe((userDetails: any) => {
      if (userDetails.isProfile.success && userDetails.isProfile.data != null && userDetails.isProfile.data != undefined && userDetails.isProfile.data != '') {
        this.isFlatRate = userDetails.isProfile.data.deliveryData.flatRate;
        this.isOnbording = userDetails.isProfile.data.deliveryData.onbording;
        this.isSubscribed = userDetails.isProfile.data.deliveryData.subscribed;
        this.isActive = userDetails.isProfile.data.deliveryData.active;
        this.userDeactivationId = userDetails.isProfile.data.deliveryData._id;

        this.isKYCStatus = userDetails.isProfile.data.deliveryData.KYCStatus;
        this.isBankDetailStatus = userDetails.isProfile.data.deliveryData.bankDetailStatus;
        this.isVehicleDetailStatus = userDetails.isProfile.data.deliveryData.vehicleDetailStatus;
      }
    });
  }

  checkSubscriptionStatus() {
    const entityId = this.commonservice.userData.entityId;
    this.paymentService.checkStatusSubscriptions(entityId).subscribe((statusSubscr: any) => {
      if (statusSubscr.success && statusSubscr.data.subscription_status == "ACTIVE") {
        this.subscriptionsStatus = true
      } else {
        this.subscriptionsStatus = false
      }
      this.storageService.setItem(Constants.ACTIVE_SUBSCRIPTION_FLAG, this.subscriptionsStatus)
    }, err => {
      console.log(err);
    })
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe((res: any) => {
      console.log('userResult', res);
      if (res.success && res.data != undefined) {
        this.userDetail = res['data'];
      }
    }, (error) => {
      console.log();
    });
  }

  // async openMyRewardsModal() {
  //   this.refferalservice.openMyRewardsModal();
  // }

  // async openReferralDashboardModal() {
  //   this.refferalservice.openReferralDashboardModal();
  // }

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  goToKYC() {
    this.router.navigate(['/kyc-status']);
  }

  goToSubscription() {
    this.router.navigate(['/package-list']);
  }

  goToBankDetails() {
    this.router.navigate(['/bank-details']);
  }

  goToDeliveryOptions() {
    this.router.navigate(['/delivery-options']);
  }

  goToSelectVehicle() {
    this.router.navigate(['/select-vehicle']);
  }

  goToHelp() {
    this.router.navigate(['/help']);
  }

  async confirmationPopupComponentModal(status: any) {
    const modal = await this.modalCtrl.create({
      component: ConfirmationPopupComponent,
      cssClass: 'cancel-modal-css',
      backdropDismiss: false,
      componentProps: { isModal: false, confirmPopupStatus: status }
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        if (modelData.data.status == 'Yes' && modelData.data.confirmPopupStatus == 'Log Out') {
          this.logOut();
        } else if (modelData.data.status == 'Yes' && modelData.data.confirmPopupStatus == 'Deactivate') {
          this.deActivate();
        }
      }
    });
    await modal.present();
  }

  logOut() {
    this.updateDeliveryBoyStatus();
    this.authservice.logOutUser()
  }

  updateDeliveryBoyStatus() {
    let isToggleValue = Object.assign({ "active": false})
    this.onboardService.patchChangeStatusToggle(isToggleValue).subscribe((res: any) => {
      // this.commonService.dismiss();
      if (res?.isTrip.success) {
        console.log('toggle res ', res);
      }
    }, (error) => {
      // this.commonService.dismiss();
      this.commonservice.danger(error?.message);
    });
  }

  deActivate() {
    if (this.userDeactivationId !== undefined && this.userDeactivationId !== null && this.userDeactivationId !== "") {
      this.deactivateInfo = Object.assign({ "active": !this.isActive, "_id": this.userDeactivationId })
      this.onboardService.updateDeliveryPersonInfo(this.deactivateInfo).subscribe((res: any) => {
        if (res?.isTrip?.success && res?.isTrip?.data != undefined) {
          console.log(res);
        }
      }, (error) => {
        this.commonservice.danger(error?.message);
      });
    }
  }


  async logOutUser() {
    let logout = false;
    const alert = await this.alertController.create({
      header: 'Are you sure , want to logout?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            logout = false;
          },

        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            logout = true;
          },

        },
      ],
    })
    await alert.present();
    await alert.onDidDismiss().then((loged) => {
      if (loged !== null && logout === true && loged.role === 'confirm') {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  openSetting() {
    this.router.navigate(['/setting']);
  }

  onBack() {
    this.router.navigate(['/home']);
  }
}
