import { Component, OnInit, Optional } from '@angular/core';
import { CommonService } from 'src/app/lib/services/common.service';
import { Router } from '@angular/router';
import { CatalogueService } from 'src/app/lib/services/catalouge.service';
import { Constants } from 'src/app/config/constants';
import { StorageService } from './../../lib/services/storage.service';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { ModalController, LoadingController, Platform, IonRouterOutlet } from '@ionic/angular';
import { LocationService } from 'src/app/lib/services/location.service';
import { ReferralService } from 'src/app/referal/referral.service';
import { UserService } from 'src/app/lib/services/user.service';
import { App } from '@capacitor/app';
import { PaymentdoneGuard } from 'src/app/lib/guard/paymentdone.guard';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  categoryList: any;
  merchantListArray: any;
  merchantListArrayCopyForFilter = [];
  currentAddress: any = this.storageService.getItem(Constants.USER_LOCATION) ? this.storageService.getItem(Constants.USER_LOCATION) : '';
  loadingStore: boolean = true;
  searchShopDetails: string;
  filtermerchantListArray: any;
  favShops = new Set();
  address: any;
  flag: boolean;
  filter = { rangeValue: 20, ratingNumber: 1, isVeg: this.storageService.getItem(Constants.SELECT_PREFERENCE) == 'veg' ? true : false, deliveryType: null }
  first: boolean = true;
  isClick: boolean = false;
  addressdisable: boolean = true;
  count: any;
  showCard: any = 5;
  backButton = 0;


  constructor(
    public commonservice: CommonService,
    private modalCtrl: ModalController,
    private router: Router,
    private catalogueService: CatalogueService,
    private storageService: StorageService,
    private locationService: LocationService,
    private loadingController: LoadingController,
    public refferalservice: ReferralService,
    private platform: Platform,
    private userService: UserService,
    private paymentdonegaurd: PaymentdoneGuard,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      var url =this.router['routerState'].snapshot.url;
      if(url == "/tabs/home"){
        if(this.backButton==0){
          this.backButton++;
          this.commonservice.presentToast("Press again to exit");
          setTimeout(() => {
            this.backButton = 0;
          }, 4000);
        }else{
          if (!this.routerOutlet.canGoBack()) {
            App.exitApp();
          }
        }
      }
    });
  }

  ngOnInit() {
    ////////////////////// Force Update //////////////////////
    this.platform.ready().then(() => {
      if (this.platform.is("android") || (this.platform.is("ios"))) {
        this.commonservice.appCheckUpdate()
      }
    });
    this.locationService.locationSubscription = this.locationService.updateAddress.subscribe(res => {
      if (res && !this.first) {
        this.ionViewWillEnter();
      }
    })
    this.getSpashScreenData();
  }

  ionViewWillEnter() {
    this.first = false;
    if (this.storageService.getItem(Constants.USER_SAVED_LOCATION) && this.storageService.getItem(Constants.USER_SAVED_LOCATION).length != 0) { // check if user has any saved location or else ask the user to save location
      this.storageService.getItemWithPromise(Constants.USER_SAVED_LOCATION).then((changedLocation: any) => {  // get the saved location array
        if (!this.storageService.getItem(Constants.USER_LOCATION)) { //check user dosent have user location selected
          this.locationService.currentLatLong = {
            lat: changedLocation[0].location.latitude,
            lon: changedLocation[0].location.longitude
          };
          this.currentAddress = {
            'display_name': changedLocation[0].streetAddress + ' near ' + changedLocation[0].landmark + ', ' + changedLocation[0].region + ', ' + changedLocation[0].city + ' ' + changedLocation[0].state + ', ' + changedLocation[0].country + ' ' + changedLocation[0].pincode,
            lat: changedLocation[0].location.latitude,
            lon: changedLocation[0].location.longitude,
            addressType: changedLocation[0].addressType
          }
          this.storageService.setItem(Constants.USER_LOCATION, this.currentAddress);
        } else {
          this.currentAddress = this.storageService.getItem(Constants.USER_LOCATION)
          this.locationService.currentLatLong = {
            lat: this.currentAddress.lat,
            lon: this.currentAddress.lon
          };
        }
      });
    }
    this.paymentdonegaurd.paymentDoneFlag = false;
    this.loadingStore = this.merchantListArray ? false : true;
    this.currentAddress = this.storageService.getItem(Constants.USER_LOCATION);
    if (this.commonservice.userData) {
      this.commonservice.setUserData();
      ////////////////////// Add Address Popup Trigger //////////////////////
      this.getAllAddress();
      this.getFavouriteShops();
      this.merchantList()
    } else {
      this.merchantList()
    }
  }
  ionViewWillLeave() {
    this.addressdisable = true;
  }

  favouriteShop(event) {
    let shop_id = event.shop_id;
    let isFavourite = event.isFavourite;
    if (this.commonservice.userData) {
      this.commonservice.presentProgressBarLoading()
      let string = String(shop_id)
      this.userService.addFavourite({ shopId: string }).subscribe(res => {
        if (isFavourite) {
          this.commonservice.danger('Shop removed from favourites.')
        } else {
          this.commonservice.success('Shop added to favourites.')
        }
        this.getFavouriteShops(true);
        this.commonservice.closeProgressBarLoading()
      }, error => {
        this.commonservice.closeProgressBarLoading()
        this.commonservice.toast(error.error.error.message)
      })
    } else {
      this.commonservice.danger("Login Required");
    }
  }

  getFavouriteShops(toFilter?) {
    console.log('filter api called')
    this.commonservice.presentProgressBarLoading()
    this.userService.getFavouriteShop().subscribe(res => {
      this.favShops.clear();
      let fav = []
      res['data'].map(res => {
        this.favShops.add(parseInt(res.shopId));
        fav.push(parseInt(res.shopId))
      });
      this.storageService.setItem(Constants.FAV_SHOPS, fav)
      this.commonservice.closeProgressBarLoading()
      if (toFilter) {
        this.merchantListArray?.map(shops => {
          if (this.favShops?.has(shops.shop_id)) {
            shops.myfavshop = true;
            this.commonservice.closeProgressBarLoading()
          } else {
            shops.myfavshop = false;
          }
        });
        this.filterData(this.filter, 'confirm', this.merchantListArray);
      }
    }, error => {
      this.commonservice.closeProgressBarLoading()
    })
  }

  getAllAddress() {
    let savedAddress = this.storageService.getItem(Constants.USER_SAVED_LOCATION);
    if (!savedAddress.length) {
      this.userService.getAllAddress().subscribe(res => {
        this.address = res['data'];
        if (res['data'].length != 0) {
          this.storageService.setItem(Constants.USER_SAVED_LOCATION, res['data']);
          this.currentAddress = {
            'display_name': res['data'][0].streetAddress + ' near ' + res['data'][0].landmark + ', ' + res['data'][0].region + ', ' + res['data'][0].city + ' ' + res['data'][0].state + ', ' + res['data'][0].country + ' ' + res['data'][0].pincode,
            lat: res['data'][0].location.latitude,
            lon: res['data'][0].location.longitude,
            addressType: res['data'][0].addressType
          }
          this.locationService.currentLatLong = {
            lat: this.currentAddress.lat,
            lon: this.currentAddress.lon
          };
          this.storageService.setItem(Constants.USER_LOCATION, this.currentAddress)
          this.merchantList()
        }
        else {
          this.commonservice.alert1('Save your location !', 'Please enter your location to help us find the shops near you', 'Add Address', '', () => { this.router.navigate(['/update-address/0']) }, () => { this.getAllAddress() });
        }
      })
    }
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  /**
   * @name openFilterModal
   * @type Function - Open Popup and Filter products
   * **/
  async openFilterModal(val) {
    this.isClick = true
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
      cssClass: 'OtpBox-AddMember',
      componentProps: {
        tab: val,
        filter: this.filter
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    this.isClick = false;
    this.filterData(data, role, this.merchantListArray);
  }

  filterData(data, role, merchantData) {
    console.log('filtering')
    this.merchantListArrayCopyForFilter = merchantData;
    if (role === 'confirm' && this.merchantListArrayCopyForFilter) {
      this.showCard = 5;
      merchantData = this.merchantListArrayCopyForFilter.filter(
        (e) =>
          (data?.isVeg && e.veg === data?.isVeg) ||
          (data?.delivery && e.deliveryType !== 2) ||
          (data?.ratingNumber && e.avg_rating > data?.ratingNumber) ||
          (data.rangeValue > +e.distance)
      ).sort((a, b) => a.distance - b.distance);
      this.merchantListArrayCopyForFilter = []
      this.merchantListArrayCopyForFilter.push(...merchantData?.filter(shop => shop.myfavshop))
      this.merchantListArrayCopyForFilter.push(...merchantData?.filter(shop => !shop.myfavshop))
      this.count = this.merchantListArrayCopyForFilter.slice(0, this.showCard);
    }
    if (this.searchShopDetails) {
      this.filtermerchantListArray = [];
      this.searchShop();
    }
  }

  /**
   * @name getSpashScreenData
   * @type Function - Get all categories, microcategories, and products
   * **/
  async getSpashScreenData() {
    if (this.storageService.getCat(Constants.PRODUCT_DATA)) {
      const data = await this.storageService.getCat(Constants.PRODUCT_DATA);
      if (data.categoryData) {
        this.setCategoriesData(data.categoryData);
      }
    } else {
      this.catalogueService.getSplashApi();
    }
  }

  /**
   * @name setCategoriesData
   * @type Function - Set categories Data
   * **/
  setCategoriesData(categoryData: any): void {
    this.categoryList = categoryData;
    const formattedcategoryList = [];
    for (const item in categoryData) {
      formattedcategoryList.push({
        ...this.categoryList[item],
        title: item,
      });
    }
    this.categoryList = formattedcategoryList;
  }

  openDetails(details) {
  }

  /**
   * @name merchantList
   * @type Function - Get all store/merchant data
   * **/
  async merchantList() {
    console.log('shop api called')
    this.commonservice.presentProgressBarLoading()
    this.catalogueService.getmerchantListArray(null).subscribe((res: any) => {
      this.loadingStore = false;
      if (res && res.data) {
        this.merchantListArray = res.data?.stores;
        !this.merchantListArray?.length ? this.flag = true : this.flag = false;
        if (res.data?.stores?.length != 0) {
          this.storageService.setItem(Constants.HOME_STORE, this.merchantListArray);
          this.merchantListArray?.map(shops => {
            if (this.favShops?.has(shops.shop_id)) {
              shops.myfavshop = true;
              this.commonservice.closeProgressBarLoading()
            }
          });
          this.filterData(this.filter, 'confirm', this.merchantListArray);
        }
      }
    }, err => {
      this.loadingStore = false;
    });
    this.addressdisable = false;
  }

  featureNotAvailable() {
    this.commonservice.featureNotAvailable();
  }

  error() {
    this.commonservice.toast('Catelog Not Present')
  }

  searchShop() {
    if (this.merchantListArrayCopyForFilter) {
      if (this.searchShopDetails != '') {
        this.filtermerchantListArray = this.merchantListArrayCopyForFilter.filter(res => (res.shop_name.toLowerCase()).includes(this.searchShopDetails.toLowerCase()))
      }
    }
  }

  // Refer Invite Category
  refferalModule() {
    this.router.navigate(['referal'])
  }

  moveToStoreListing(category) {
    this.router.navigateByUrl(`/store-listing/${category}`);
  }

  onIonInfinite(ev) {
    setTimeout(() => {
      this.showCard += 5;
      this.count = this.merchantListArrayCopyForFilter.slice(0, this.showCard);
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
