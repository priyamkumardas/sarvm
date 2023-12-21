import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { StorageService } from 'src/app/lib/services/storage.service';
import { Checkout } from 'capacitor-razorpay';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/lib/services/common.service';
import { PaymentService } from 'src/app/lib/services/payment.service';
import { Location } from '@angular/common';
import { GstComponent } from 'src/app/components/gst/gst.component';
import { SubscriptionPage } from '../subscription/subscription.page';
import { LanguageService } from 'src/app/lib/services/language.service';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { Optional } from '@angular/core';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.page.html',
  styleUrls: ['./package-list.page.scss'],
})
export class PackageListPage implements OnInit {

  subscriptionsDetails: any;
  userData: any;
  paymentDetails: any;
  statusDetails: any;
  @Input() isModal: boolean;
  subscriptionsPackageList: any;
  // check user subscription
  userSubscriptionStatus: boolean = false;

  constructor(private router: Router,
    private ngLocation: Location,
    public modalCtrl: ModalController,
    public commonService: CommonService,
    private paymentService: PaymentService,
    private storageService: StorageService,
    private languageService: LanguageService,
    private onboardService: OnboardService,) { 
    /* private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet

      this.platform.backButton.subscribeWithPriority(101, () => {
        console.log('Handler was called!');
        if (this.routerOutlet.canGoBack()) {
          //this.confirmback();
          this.ngLocation.back();
        }
      }); */
    }

  ngOnInit() {
    this.getDeliveryPersonInfo();
  }

  ionViewDidEnter(){
    this.getSubscriptionsPackageList();
  }

  getDeliveryPersonInfo() {
    this.onboardService.getDeliveryPersonInfo().subscribe((res: any) => {
      if (res?.isTrip.success && res?.isTrip?.data != undefined && res?.isTrip?.data != null && res?.isTrip?.data != '') {
        this.userData = res.isTrip.data;
      }
    }, (error) => {
      this.commonService.danger(error?.message);
    });
  }

  getSubscriptionsPackageList() {
    this.commonService.presentLoader().then(loader => {
      loader.present()
      this.paymentService.getSubscriptionsPackageList().subscribe((res: any) => {
        loader.dismiss();
        if ((res?.success) && (res?.data)) {
          this.getSubscripPackage(res?.data?.url);
        }
      }, (error) => {
        loader.dismiss();
        console.log(error)
      });
    })
  }

  getSubscripPackage(itemUrl){
    this.commonService.presentProgressBarLoading()
    this.languageService.selectLanguageCDN(itemUrl).subscribe((pckData: any) => {
      this.commonService.closeProgressBarLoading()
      this.subscriptionsPackageList = pckData["LA"][0];
      console.log(this.subscriptionsPackageList);
    }, error => {
      this.commonService.closeProgressBarLoading()
      console.log(error)
    });
  }


  createSubscription() {
    this.commonService.presentLoading(); 
      let data = {
        msid: this.subscriptionsPackageList.masterId
      };
      this.initiateSubscriptionApiCall(data);


  }

  initiateSubscriptionApiCall(data) {
    this.paymentService.createSubscriptions(data).subscribe((subscrip: any) => {
      if ((subscrip.success) && (subscrip?.data && subscrip?.data?.orderId)) {
        // this.userSubscriptionStatus = true;
        // this.storageService.setItem(Constants.ACTIVE_SUBSCRIPTION_FLAG , this.userSubscriptionStatus)
        this.commonService.dissmiss_loading();
        this.subscriptionsDetails = subscrip;
        console.log(this.subscriptionsDetails);
        this.loadCheckout();
      } else {
        this.storageService.setItem(Constants.ACTIVE_SUBSCRIPTION_FLAG , this.userSubscriptionStatus)
        this.commonService.dissmiss_loading();
      }
    });
  }

  async loadCheckout() {
    if (this.subscriptionsDetails?.data) {
      const options = {
        key: environment.razorpay.razorpay_key,
        //key_secret: environment.razorpay.razorpay_key_secret,
        order_id: this.subscriptionsDetails?.data?.orderId,
        amount: environment.razorpay.razorpay_amount,
        description: 'Subscription',
        image: (Constants.PAY_IMAGE),
        currency: Constants.CURRENCY,
        name: environment.app_name_test,
        prefill: { email: `${this.userData?.uniqueId}@sarvm.ai`, contact: `+91${this.userData?.uniqueId}` },
        readonly: { email: true, contact: true },
        hidden: { email: true, contact: true },
        theme: { color: environment.app_primary_color_code }
      }
      try {
        Checkout.open(options).then((payRes: any) => {
          console.log(JSON.stringify(payRes));
          if ((payRes.response)
            //&& 
            //(payRes.response.razorpay_order_id != undefined && payRes.response.razorpay_payment_id != null))
          ) {
            this.paymentDetails = payRes.response;
            this.checkConfirmSubscriptions();
          }
        }, err => {
          let errorObj = JSON.parse(err['code'])
          this.commonService.danger(errorObj.description);
        });
      } catch (error) {
        //it's paramount that you parse the data into a JSONObject
        let errorObj = JSON.parse(error['code'])
        alert(errorObj.description);
        alert(errorObj.code);
        alert(errorObj.reason);
        alert(errorObj.step);
        alert(errorObj.source);
        alert(errorObj.metadata.order_id);
        alert(errorObj.metadata.payment_id);
      }
    }
  }

  closePackageListModal() {
    this.modalCtrl.dismiss();
  }
  
  checkConfirmSubscriptions() {
    this.commonService.present();
    if (this.paymentDetails) {
      this.paymentDetails['razorpay_payment_signature'] = this.paymentDetails['razorpay_signature'];
      delete this.paymentDetails['razorpay_signature'];
      const subsctiptInfo = this.paymentDetails;
      Object.assign(subsctiptInfo, { 
        "subscriptionId": this.subscriptionsDetails.data.subscriptionId, 
        "entityType": this.subscriptionsDetails.data.entityType,
        "entityId": this.subscriptionsDetails.data.entityId,
        "razorpay_order_id": this.paymentDetails['razorpay_order_id'],
        "razorpay_payment_id": this.paymentDetails['razorpay_payment_id'],
        "masterId": this.subscriptionsPackageList.masterId,
        "delivery_id": this.userData._id  })

      this.paymentService.confirmSubscriptions(subsctiptInfo).subscribe((subscrStatus: any) => {
        this.commonService.dismiss();
        if (subscrStatus?.success && subscrStatus?.data?.subscriptionId) {
          this.userSubscriptionStatus = true;
          this.storageService.setItem(Constants.ACTIVE_SUBSCRIPTION_FLAG , this.userSubscriptionStatus)
          this.statusDetails = subscrStatus;
          console.log(subscrStatus);
          if (this.isModal) {
            this.closePackageListModal();
            this.openSubscriptionModal();
            // this.router.navigate(['/subscription']);
          } else {
            this.router.navigate(['/subscription']);
          }

        }
        else {
          this.commonService.dismiss();
        }
      });
    }
  }

  onBack() {
    if (this.isModal) {
      this.closePackageListModal();
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/home']);
  }

  async openSubscriptionModal() {
    const modal = await this.modalCtrl.create({
      component: SubscriptionPage,
      cssClass: 'bottomModal',
      componentProps: {
        isModal: true,
      },
    });
    await modal.present();
  };

  skip() {
    if (this.isModal) {
      this.modalCtrl.dismiss();
    }
    this.router.navigate(['/home']);
  }

}
