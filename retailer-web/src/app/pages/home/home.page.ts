import { ActionSheetController, Platform, IonRouterOutlet} from '@ionic/angular';
import { Component } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { Router } from '@angular/router';
import { CommonService } from '../../lib/services/common.service';
import { ReferralService } from 'src/app/referal/referral.service';
import { PaymentService } from 'src/app/lib/services/payment.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { Optional } from '@angular/core';
import { App } from '@capacitor/app';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  subscriptionsStatus: any;

  public homeList = [

    {
      name: 'Catalog Management',
      imgsrc: '/assets/images/homeImg/catalog-1.svg',
      url: 'catalog',
      disable: 'catalog'
    },

    {
      name: 'Referral Management',
      imgsrc: '/assets/images/homeImg/referral-1.svg',
      url: 'referral',
      disable: 'referral'
    },

    {
      name: 'Subscription',
      imgsrc: '/assets/images/homeImg/subscription-1.svg',
      url: 'subscription',
      disable: 'subscription'
    },

    {
      name: 'Order Management',
      imgsrc: '/assets/images/homeImg/sent-1.svg',
      url: 'order',
      disable: 'order'
    },
    {
      name: 'CRM',
      imgsrc: '/assets/images/homeImg/crm 1.svg',
      url: 'customers',
      disable: 'crm'
    },
    {
      name: 'Delivery management',
      imgsrc: '/assets/images/homeImg/truck-1.svg',
      url: 'delivery',
      disable: 'yes'
    },
    {
      name: 'Payment Management',
      imgsrc: '/assets/images/homeImg/credit-card.svg',
      url: 'payment',
      disable: 'yes'
    },
    {
      name: 'Customer Service',
      imgsrc: '/assets/images/homeImg/Group (1).svg',
      url: 'customer',
      disable: 'yes'
    },
    {
      name: 'B2B Buy',
      imgsrc: '/assets/images/homeImg/Group (2).svg',
      url: 'b2b',
      disable: 'yes'
    },
    {
      name: 'Promote',
      imgsrc: '/assets/images/homeImg/megaphone 1.svg',
      url: 'promote',
      disable: 'yes'
    },
    {
      name: 'User Management',
      imgsrc: '/assets/images/homeImg/users.svg',
      url: 'user',
      disable: 'yes'
    },
    {
      name: 'P & L',
      imgsrc: '/assets/images/homeImg/loss-icon-7 1.svg',
      url: 'pl',
      disable: 'yes'
    },
    {
      name: 'Expenses management',
      imgsrc: '/assets/images/homeImg/expense (1) 1.svg',
      url: 'expenses',
      disable: 'yes'
    },
    {
      name: 'Inventory Management',
      imgsrc: '/assets/images/homeImg/inventory-_1_ 1.svg',
      url: 'inventory',
      disable: 'yes'
    },
    


   ];


  constructor(
    private router: Router,
    public commonservice: CommonService,
    public refferalservice: ReferralService,
    private commonService: CommonService,
    private paymentService: PaymentService,
    private storageService: StorageService,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet

  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
   }


   navigatePage(status){

    if(status === 'catalog'){
    //  this.goToCatalog(); Modal Disabled
     this.router.navigate(['/select-food']);
    }

    else if(status === 'referral'){
      this.refferalModule();
    }

    else if(status === 'subscription'){
      this.checkSubscriptionStatus();
    }

    else if(status === 'order'){
     this.router.navigate(['/order']);
    }

    else if(status === 'crm'){
      this.router.navigate(['/customers']);
     }

    else if(status === 'yes'){
      this.commonService.featureNotAvailable();
    }

   }


  ngOnInit() {}

  checkSubscriptionStatus() {
    this.commonService.present();
    let shopId = this.storageService.getItem(Constants.SHOP_ID)
      ? this.storageService.getItem(Constants.SHOP_ID)
      : this.commonService.userData.shopId;
    this.paymentService
      .checkStatusSubscriptions(shopId)
      .subscribe((statusSubscr: any) => {
        this.commonService.dismiss();
        if (
          statusSubscr?.success &&
          statusSubscr?.data &&
          statusSubscr?.data != null &&
          statusSubscr.data != undefined
        ) {
          this.subscriptionsStatus = statusSubscr.data;
          if (
            statusSubscr?.success &&
            statusSubscr.data.subscription_status === 'ACTIVE'
          ) {
            this.router.navigate(['/subscription']);
          } else {
            this.router.navigate(['/package-list']);
          }
        } else {
          this.commonService.dismiss();
          if (
            statusSubscr?.success &&
            statusSubscr?.data &&
            statusSubscr?.data != null &&
            statusSubscr.data != undefined
          ) {
            this.subscriptionsStatus = statusSubscr.data;
            if (
              statusSubscr?.success &&
              statusSubscr.data.subscription_status === 'ACTIVE'
            ) {
              this.router.navigate(['/subscription']);
            } else {
              this.router.navigate(['/package-list']);
            }
          } else {
            this.commonService.dismiss();
            if (
              statusSubscr?.error &&
              statusSubscr?.error != null &&
              statusSubscr.error != undefined
            ) {
              this.commonService.danger(statusSubscr?.error?.message);
            }
          }
        }
      });
  }

  async goToCatalog() {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      cssClass: 'catalog-popup',
      buttons: [
        {
          text: 'Add Product',
          icon: 'add-outline',
          data: {
            action: '',
          },
          handler: () => {
            this.router.navigate(['/select-food']);
          }
        },
        {
          text: 'Update Product',
          icon: 'reload-outline',
          data: {
            action: '',
          },
          handler: () => {
            this.router.navigateByUrl('/my-catalog',{state:{page: "Update"}});
          }
        },
        {
          text: 'Recommended Products',
          icon: 'thumbs-up-outline',
          data: {
            action: '',
          },
          handler: () => {
            this.commonservice.featureNotAvailable();
            this.goToCatalog();
            //this.router.navigate(['/my-catalog']);
          }
        },
        {
          icon: 'close-outline',
          role: 'cancel',
          data: {
            action: 'cancel',
          }
        },
      ],
    });

    await actionSheet.present();
  }

  // Refer Banner
  refferalModule() {
    this.refferalservice.openReferralDashboardModal();
  }

  //Order Management
  orderModuleOpen(){
    this.router.navigate(['/order']);
  }
}
