import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from './../../../lib/services/storage.service';
import { ModalController } from '@ionic/angular';
import { DeliveryDayPreferenceComponent } from 'src/app/components/delivery-day-preference/delivery-day-preference.component';
import { DeliveryQuantityComponent } from 'src/app/components/delivery-quantity/delivery-quantity.component';
import { LocationService } from 'src/app/lib/services/location.service';
import { CatalogueService } from 'src/app/lib/services/catalouge.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { OptionsMenuComponent } from 'src/app/components/options-menu/options-menu.component';
import { UserService } from 'src/app/lib/services/user.service';

@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.page.html',
  styleUrls: ['./productlisting.page.scss'],
})
export class ProductlistingPage implements OnInit {
  orders = [
    'Carrot',
    'Cherry',
    'Potato',
    'Mango',
    'Apple',
    'Carrot',
    'Cherry',
    'Potato',
    'Mango',
    'Potato',
    'Mango',
    'Apple',
    'Carrot',
    'Cherry',
    'Potato',
    'Mango',
    'Apple',
  ];
  @ViewChild('search') search: ElementRef<any> | undefined;
  isSearch = false;
  searchText: any;
  searchResult: any;
  products = [];
  allProducts;
  subCategories = [];
  categories = [];
  microCategories = [];
  allMicroCategories;
  selectedCategory = 0;
  selectedSubCategory = 0;
  selectedMicroCategory = 1;
  productUserId = '';
  retailerID: any;
  catalogueVersion = '';
  catalogueLink = '';
  cartData: any;
  cartDataTemp: any;
  recommend = ['ParleG ', 'Banana ', 'Apple ', 'Mango '];
  hint = [
    'Simple ',
    'Aggregate ',
    'Simple ',
    'Multiple',
    'Simple ',
    'Aggregate ',
    'Simple ',
  ];
  selectedProduct = null;
  vendorDetails: any;

  cartPreviousData: any;
  previousCartData: any;
  modalData: any;
  defaultDate: any;
  selectedDate: any;
  cartQty = 0;
  flag: boolean;
  itemsInCart: any = [];
  itemQuantity = 0;
  totalDeliveryCharges = 0;
  Charges: any;
  addDisable: boolean =false;
  deliveryStatus: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private modalCtrl: ModalController,
    private router: Router,
    private locationService: LocationService,
    private catalogueService: CatalogueService,
    public commonservice: CommonService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(res => {
      let data;
      if (this.vendorDetails?.dataList) {
        data = this.vendorDetails.dataList;
      }
      this.vendorDetails = JSON.parse(res.vendorDetails);
      console.log(this.vendorDetails)
      this.vendorDetails.dataList = data;
    })
    this.route.params.subscribe((params) => {
      this.productUserId = params['id'];
      this.setCart();
      if (this.vendorDetails.deliveryDistanceLimit < this.vendorDetails.distance) {
        this.deliveryStatus = false;
      }
    });
      console.log(this.vendorDetails)
      this.vendorDetails.dataList = this.storageService.getItem(this.productUserId) ? this.storageService.getItem(this.productUserId) : null;
      if (this.vendorDetails.store_meta[0]?.url) {
        this.getMerchantDetails();
        this.flag = false;
      }else{  
        this.flag = true;
      }
    this.retailerID = this.vendorDetails.user_id
  }

  favouriteShop() {
    // this.commonservice.presentProgressBarLoading()
    this.commonservice.presentLoading();
    let shop_id = this.vendorDetails.shop_id;
    let isFavourite = this.vendorDetails.myfavshop;
    if (this.commonservice.userData) {
      let string = String(shop_id)
      this.userService.addFavourite({ shopId: string }).subscribe(res => {
        this.commonservice.dissmiss_loading()
        let favShops = this.storageService.getItem(Constants.FAV_SHOPS);
        if (isFavourite) {
          this.commonservice.danger('Shop removed from favourites.');
          favShops.splice(favShops.findIndex(shop_id => shop_id == this.vendorDetails.shop_id), 1);
          this.storageService.setItem(Constants.FAV_SHOPS, favShops);
        } else {
          this.commonservice.success('Shop added to favourites.');
          favShops.push(this.vendorDetails.shop_id)
          this.storageService.setItem(Constants.FAV_SHOPS, favShops);
        }
        this.vendorDetails.myfavshop = !this.vendorDetails.myfavshop;
        // this.commonservice.closeProgressBarLoading()
        
      }, error => {
        this.commonservice.dissmiss_loading()
        // this.commonservice.closeProgressBarLoading()
        this.commonservice.toast(error.error.error.message)
      })
    } else {
      this.commonservice.dissmiss_loading()
      this.commonservice.danger("Login Required");
    }
  }

  setCart() {
    if (localStorage.getItem(Constants.CART_DATA)) {
      let data = this.storageService.getItem(Constants.CART_DATA);
      this.cartData = data;
      this.itemsInCart = [];
      this.cartData.cart.map(res => {
        this.checkCartForItem(res);
      })
    } else {
      this.itemsInCart = [];
      this.cartData = {
        delivery: {
          location: {
            address: this.storageService.getItem(Constants.USER_LOCATION) ? this.storageService.getItem(Constants.USER_LOCATION).display_name : '',
            type: "Home",
            lat: this.locationService.currentLatLong.lat,
            lon: this.locationService.currentLatLong.lng
          },
          mode: "PICKUP"
        },
        instructions: "xzz",
        amount: 0,
        discount: 0,
        amountWithoutDiscount: 0,
        payment: {
          mode: "POSTPAID"
        },
        totalProducts: 0,
        cart: []
      };
    }
  }

  searchProduct(e) {
    this.searchResult = [];
    this.vendorDetails.dataList?.catalog[this.selectedCategory]?.categories[this.selectedSubCategory].categories[this.selectedMicroCategory - 1].products.map(res => {
      if (res.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        this.searchResult.push(res.id);
      }
    })
  }

  onClickSearch() {
    this.isSearch = !this.isSearch;
    // this.search.focus()
    if (this.isSearch == false) {
      this.searchText = "";
      console.log(this.searchText);
    }
    // this.search.nativeElement.focus();
  }

    
  

  getMerchantDetails() {
    // this.commonservice.presentProgressBarLoading()
    this.commonservice.presentLoading()
    this.catalogueService.getmerchant(this.vendorDetails.store_meta[0].url).subscribe((res) => {
      // this.commonservice.closeProgressBarLoading()
      this.flag = false;
      this.commonservice.dissmiss_loading()
      console.log(res);
      res['catalog'].map(cat => {
        cat.categories.splice(0, 1)
      })
      this.vendorDetails.dataList = res;
      if (!this.vendorDetails.dataList.catalog?.length) {
        this.flag = true
      }
      this.vendorDetails.dataList?.catalog?.map(res => {
        this.populateData(res);
      })
      
      if (this.vendorDetails.dataList) {
        this.storageService.setCat(this.productUserId, this.vendorDetails.dataList)
      }
    },err=>{
      
      // this.commonservice.closeProgressBarLoading()
      this.commonservice.dissmiss_loading()
    });
  }

  /**
   * @name populateData
   * @type Function - Get all categories and products
   * **/

  populateData(catalog: any): void {
    if (catalog.categories?.length) {
      catalog.categories.map(res => {
        this.populateData(res)
      })
    } else {
      for (let i = 0; i < catalog.products?.length; i++) {
        catalog.products[i].unit = 1;
        catalog.products[i].qty = catalog.products[i].quantity ? catalog.products[i].soldBy == 'Pcs' ? Math.ceil(parseFloat(catalog.products[i].quantity)) : parseFloat(catalog.products[i].quantity) : 1;
        catalog.products[i].isMandatory = false;
      }
    }
  }

  // Choose Date using calander icon.
  async selectDate(item, addToCart?) {
    this.addDisable = true
    this.cartPreviousData = this.cartData
      ? JSON.parse(JSON.stringify(this.cartData))
      : [];
    const model = await this.modalCtrl.create({
      component: DeliveryDayPreferenceComponent,
      cssClass: 'DeliveryDayPreference-component-css',
      componentProps: {
        product: item,
      },
    });
    await model.present();
    this.modalData = await model.onWillDismiss();
    this.addDisable = false
    console.log(this.modalData)
    if (addToCart) {
      this.addToCart(item)
    }
  }

  public async addToCart(item) {
    item.soldBy = this.vendorDetails?.dataList?.catalog[this.selectedCategory].key == 'restaurant' && item.soldBy == 'Pcs' ? 'Plt' : item.soldBy;
    // If date is not selected than default date is today
    this.defaultDate = new Date().toISOString().split('T')[0];
    this.previousCartData = this.cartPreviousData;
    this.selectedDate = this.modalData;
    if (this.previousCartData == undefined) {
      this.previousCartData = this.cartData;
    }
    const { data } = this.selectedDate;
    if (data) {
      const checkDateIndex = this.previousCartData.cart.findIndex(
        (x) => x.date === data.date
      );
      if (checkDateIndex > -1) {
        const slotIndex = this.previousCartData.cart[checkDateIndex].timeSlots.findIndex(
          (x) => x.timeSlot === "06AM-10PM"
        );
        if (slotIndex > -1) {
          const vendorIndex = this.previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.findIndex(
            (x) => x.shopId === this.productUserId,
          );
          this.previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.catalogVersion = this.vendorDetails.store_meta[0]?.version,
            this.previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.catalogUrl = this.vendorDetails.store_meta[0]?.url;

          if (vendorIndex > -1) {
            const itemIndex = this.previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops[vendorIndex].products.findIndex(
              (x) => x.id === item.id && x.qty == item.qty
            );
            console.log(itemIndex)
            if (itemIndex > -1) {
              this.previousCartData.totalProducts += 1;
              this.previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops[
                vendorIndex
              ].products[itemIndex].unit += 1;
            } else {
              this.previousCartData.totalProducts += 1;
              this.previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops[
                vendorIndex
              ].products.push(item);
            }
          } else {
            this.previousCartData.totalProducts += 1;
            this.previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.push({
              shopId: this.productUserId,
              retailerId: this.retailerID,
              catalogUrl: this.vendorDetails.store_meta[0]?.url,
              catalogVersion: this.vendorDetails.store_meta[0]?.version,
              products: [item],
              distance: {
                shopDistance: this.vendorDetails.distance,
                deliveryDistanceLimit: this.vendorDetails.deliveryDistanceLimit
              },
              shop_name: this.vendorDetails.shop_name,
              deliveryChargesPerUnit: this.vendorDetails.deliveryCharges
            });
          }
        } else {
          this.previousCartData.totalProducts += 1;
          this.previousCartData.cart[checkDateIndex].timeSlots.push({
            timeSlot: "06AM-10PM",
            shops: [
              {
                shopId: this.productUserId,
                retailerId: this.retailerID,
                catalogUrl: this.vendorDetails.store_meta[0]?.url,
                catalogVersion: this.vendorDetails.store_meta[0]?.version,
                products: [item],
                distance: {
                  shopDistance: this.vendorDetails.distance,
                  deliveryDistanceLimit: this.vendorDetails.deliveryDistanceLimit
                },
                shop_name: this.vendorDetails.shop_name,
                deliveryChargesPerUnit: this.vendorDetails.deliveryCharges
              },
            ],
          });
        }
      } else {
        this.previousCartData.totalProducts += 1;
        this.previousCartData.cart.push({
          date: data.date,
          timeSlots: [
            {
              timeSlot: "06AM-10PM",
              shops: [
                {
                  shopId: this.productUserId,
                  retailerId: this.retailerID,
                  catalogUrl: this.vendorDetails.store_meta[0]?.url,
                  catalogVersion: this.vendorDetails.store_meta[0]?.version,
                  products: [item],
                  distance: {
                    shopDistance: this.vendorDetails.distance,
                    deliveryDistanceLimit: this.vendorDetails.deliveryDistanceLimit
                  },
                  shop_name: this.vendorDetails.shop_name,
                  deliveryChargesPerUnit: this.vendorDetails.deliveryCharges
                },
              ],
            },
          ],
        });
      }
      this.cartData = this.previousCartData;
      this.storageService.setItem(Constants.CART_DATA, this.previousCartData);
    }
    this.cartData.cart.map(res => {
      this.checkCartForItem(res);
    })
  }

  addDateToProductDetails(selectedCartData, productId) {
    this.subCategories.map(subCat => {
      subCat.activeProducts.map(activeProd => {
        if (activeProd.id == productId) {
          activeProd.date = selectedCartData.cart;
        }
      });
    });
  }

  async quantity(item) {
    this.addDisable = true
    const model = await this.modalCtrl.create({
      component: DeliveryQuantityComponent,
      cssClass: 'OtpBox-AddMember',
      componentProps: {
        unit: item.soldBy,
        price: item.price,
        moq: item.quantity
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.addDisable = false
    if(data != undefined){
    if(data?.quantity)
    {
      this.selectDate(item, this.addToCart)
    }
    this.vendorDetails?.dataList.catalog.map(res=>{
      this.updateQty(res,item,data);
    })
    item.qty = data?.quantity ? data.quantity : item.qty;
  }else{
    item.qty != item.quantity ? item.qty : item.quantity
  }
}

  updateQty(catalog,item,data){
    if (catalog.categories?.length) {
      catalog.categories.map(res => {
        this.updateQty(res,item,data)
      })
    } else {
      for (let i = 0; i < catalog.products?.length; i++) {
        if(item.id == catalog.products[i].id){
          console.log(catalog);
          catalog.products[i].qty = data?.quantity ? data.quantity : catalog.products.qty;
        }
      }
    }
  }

  async optionsMenu() {
    const model = await this.modalCtrl.create({
      component: OptionsMenuComponent,
      cssClass: 'OtpBox-AddMember',
      componentProps: {
        shopId: parseInt(this.productUserId),
        vendDetails: this.vendorDetails
      }
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    if (data == 'fav') {
      this.favouriteShop();
    }
  }

  checkCartForItem(cart) {
    if (cart.timeSlots) {
      cart.timeSlots.map(res => {
        this.checkCartForItem(res);
      })
    } else if (cart.shops) {
      cart.shops.map(res => {
        this.checkCartForItem(res);
      })
    } else {
      console.log(this.itemsInCart)
      for (let i = 0; i < cart.products.length; i++) {
        if (!this.itemsInCart.includes(cart.products[i].id)) {
          this.itemsInCart.push(cart.products[i].id);
        }
      }
      console.log(this.itemsInCart)
    }
  }

  sellerProfile(details) {
    console.log(details.shop_id);
    this.router.navigate([`/seller-profile/${details.shop_id}`], {
      state: { ...details }
    });
  }
}
