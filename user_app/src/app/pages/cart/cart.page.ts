import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/lib/services/storage.service';
import { ModalController } from '@ionic/angular';
import { DeliveryDayPreferenceComponent } from 'src/app/components/delivery-day-preference/delivery-day-preference.component';
import { CommonService } from 'src/app/lib/services/common.service';
import { SupportPage } from '../order/support/support.page';
import { DatePipe } from '@angular/common';
import { LocationService } from 'src/app/lib/services/location.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartData: any;

  todaysDate = new Date(new Date().getTime() + 19800000).toJSON().split('T')[0];
  totalDiscount = 0;
  previousDiscount = 0;
  modalData: any;
  deliveryCharges: any;
  deliveryStatus: boolean = true;
  isDisable: boolean = false;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private modalCtrl: ModalController,
    public commonService: CommonService,
    private datePipe: DatePipe,
    private locationService: LocationService
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (localStorage.getItem(Constants.CART_DATA)) {
      this.cartData = this.storageService.getItem(Constants.CART_DATA);
      this.cartData.amount = 0;
      this.cartData.discount = 0;
      this.cartData.amountWithDiscount = 0;
      this.cartData.amountWithoutDiscount = 0;
      this.cartData.aggregateDeliveryCharges = 0;
      /**
       * this is for tomorrow'sdate
       */
      // Display discount price if product date is selected for today.
      this.cartData.aggregateDeliveryCharges = 0;
      this.cartData.cart.map(cartDataCart => {
        cartDataCart.timeSlots.map(cartDataCartTimeSlots => {
          cartDataCartTimeSlots.shops.map(cartDataCartTimeSlotsShops => {
            cartDataCartTimeSlotsShops.perShopAmount = 0;
            cartDataCartTimeSlotsShops.perShopDiscount = 0;
            cartDataCartTimeSlotsShops.deliveryCharges = 0; //aggregate delivery charges
              let distanceCharge = this.storageService.getItem(Constants.HOME_STORE).filter(distanceCharge1 => 
               cartDataCartTimeSlotsShops.shopId == distanceCharge1.shop_id
              )
              cartDataCartTimeSlotsShops.distance = {
                deliveryDistanceLimit: distanceCharge[0].deliveryDistanceLimit,
                shopDistance:distanceCharge[0].distance
              }
              cartDataCartTimeSlotsShops.deliveryChargesPerUnit =distanceCharge[0].deliveryCharges
              cartDataCartTimeSlotsShops.deliveryStatus = distanceCharge[0].deliveryDistanceLimit < distanceCharge[0].distance? false : true;       
            this.calculateDeliveryCharges(cartDataCartTimeSlotsShops,true)
            cartDataCartTimeSlotsShops.products.map(cartDataCartTimeSlotsShopsProd => {
              //perShop amount and Discount calculation
              cartDataCartTimeSlotsShops.perShopAmount += (cartDataCartTimeSlotsShopsProd?.price * cartDataCartTimeSlotsShopsProd?.qty * cartDataCartTimeSlotsShopsProd?.unit);
              if (cartDataCart.date != this.todaysDate) {
                //cartdiscount handled when empty string comes from backend.
                let cartDiscount = cartDataCartTimeSlotsShopsProd.discount === "" ? 0 : cartDataCartTimeSlotsShopsProd.discount
                this.cartData.discount += ((cartDiscount ? cartDiscount : 0) * cartDataCartTimeSlotsShopsProd?.price / 100) * parseFloat(cartDataCartTimeSlotsShopsProd?.qty) * parseFloat(cartDataCartTimeSlotsShopsProd?.unit);
                //perShopDiscountCalculation
                cartDataCartTimeSlotsShops.perShopDiscount += (parseInt(cartDiscount) * cartDataCartTimeSlotsShopsProd?.price / 100) * cartDataCartTimeSlotsShopsProd?.qty * cartDataCartTimeSlotsShopsProd?.unit;
              }
              this.cartData.amount += parseFloat(cartDataCartTimeSlotsShopsProd.price) * parseFloat(cartDataCartTimeSlotsShopsProd?.qty) * parseFloat(cartDataCartTimeSlotsShopsProd?.unit);
              this.cartData.amountWithDiscount = this.cartData?.amount - this.cartData?.discount;
              this.cartData.amountWithoutDiscount = this.cartData?.amount;
            })
          })
        })
      });
      // --- Display discount price ends here --- //
      this.cartData.cart.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      this.cartData.delivery.location= {
        address:this.storageService.getItem(Constants.USER_LOCATION)? this.storageService.getItem(Constants.USER_LOCATION).display_name: '',
        type: this.storageService.getItem(Constants.USER_LOCATION).addressType?this.storageService.getItem(Constants.USER_LOCATION).addressType:'Other',
        lat: this.locationService.currentLatLong?.lat,
        lon: this.locationService.currentLatLong?.lon
      }
      this.upadteLocalCart();
    } else {
      this.cartData = null;
    }
  }

  async support() {
    const model = await this.modalCtrl.create({
      component: SupportPage,
      cssClass: 'OtpBox-AddMember'
    });
    await model.present();
    const { data } = await model.onWillDismiss();
  }

  async updateQuantity(type, item, slotIndex, vendorIndex, productIndex, cartIndex, shop) {
    if (type === 'add') {
      item.unit += 1;
      this.cartData.totalProducts += 1;
      //cartdiscount
      this.cartData.amount += item?.price * parseFloat(item?.qty);
      this.cartData.cart.map((crtDate, i) => {
        if (crtDate.date !== this.todaysDate && cartIndex == i) {
          //cartdiscount handled when empty string comes from backend.
          let itemsDiscount = item?.discount === "" ? 0 : item?.discount
          this.cartData.discount += ((parseInt((itemsDiscount ? itemsDiscount : 0)) * item?.price) / 100) * parseFloat(item?.qty);
        }
      });
      this.calculateDeliveryCharges(shop)
      this.calculatePerShopAmountandDiscount(shop, cartIndex)
      this.cartData.amountWithDiscount = this.cartData?.amount - this.cartData?.discount;
      this.cartData.amountWithoutDiscount = this.cartData?.amount;
      this.upadteLocalCart();
    } else {
      if (item.unit > 1) {
        item.unit -= 1;
        this.cartData.totalProducts -= 1;
        this.cartData.amount -= item?.price * parseFloat(item?.qty);
        this.cartData.cart.map((crtDate, i) => {
          if (crtDate.date !== this.todaysDate && cartIndex == i) {
            //cartdiscount handled when empty string comes from backend.
            let itemsDiscount = item?.discount === "" ? 0 : item?.discount
            this.cartData.discount -= ((parseInt((itemsDiscount ? itemsDiscount : 0)) * item?.price) / 100) * parseFloat(item?.qty);
            
          }
        });
        this.calculateDeliveryCharges(shop)
        this.calculatePerShopAmountandDiscount(shop, cartIndex)
        this.cartData.amountWithDiscount = this.cartData?.amount - this.cartData?.discount;
        this.cartData.amountWithoutDiscount = this.cartData?.amount;
        this.upadteLocalCart();
      } else {
        await this.commonService.alert('Item will be removed from cart', 'Are you sure?', 'Remove', 'Cancel', () => {
          this.cartData.amount -= item?.price * parseFloat(item?.qty);
          this.cartData.cart.map((crtDate, i) => {
            if (crtDate.date !== this.todaysDate && cartIndex == i) {
              //cartdiscount handled when empty string comes from backend.
              let itemsDiscount = item?.discount === "" ? 0 : item?.discount
              this.cartData.discount -= ((parseInt((itemsDiscount ? itemsDiscount : 0)) * item?.price) / 100) * parseFloat(item?.qty);
            }
          });
          this.cartData.amountWithDiscount = this.cartData?.amount - this.cartData?.discount;
          this.cartData.amountWithoutDiscount = this.cartData?.amount;
          this.cartData.cart[cartIndex].timeSlots[slotIndex].shops[vendorIndex].products.length == 1 ?
            this.cartData.cart[cartIndex].timeSlots[slotIndex].shops.length == 1 ?
              this.cartData.cart[cartIndex].timeSlots.length == 1 ? this.cartData?.cart.splice(cartIndex, 1) :
                this.cartData.cart[cartIndex].timeSlots[slotIndex].shops[vendorIndex].products.splice(productIndex, 1) :
              this.cartData.cart[cartIndex].timeSlots[slotIndex].shops[vendorIndex].products.splice(productIndex, 1) && this.cartData.cart[cartIndex].timeSlots[slotIndex].shops.splice(vendorIndex,1) :
            this.cartData.cart[cartIndex].timeSlots[slotIndex].shops[vendorIndex].products.splice(productIndex, 1);
          this.cartData.totalProducts -= 1;
          this.cartData.aggregateDeliveryCharges -= shop.deliveryCharges;
          this.calculatePerShopAmountandDiscount(shop, cartIndex)
          this.upadteLocalCart();
        }, () => { })
      }
    }
    this.upadteLocalCart();
  }

  calculatePerShopAmountandDiscount(shop, cartIndex) {
    let shopDiscount = 0;
    let shopAmount = 0;
    shop.products.map(res => {
      let resDiscount = res.discount === '' ? 0 : res.discount
      shopAmount += (res.price * res.qty * res.unit);
      this.cartData.cart.map((crtDate, i) => {
        if (crtDate.date !== this.todaysDate && cartIndex == i) {
          //cartdiscount handled when empty string comes from backend.
          shopDiscount += ((resDiscount * res.price) / 100) * res.qty * res.unit;
        }
      });
    })
    shop.perShopDiscount = shopDiscount
    shop.perShopAmount = shopAmount
  }

  calculateDeliveryCharges(shop,isFirst?) {
    let prevCharge = shop.deliveryCharges;
    // calculating the total price of all products in the shop by multiplying each product's unit price by its quantity, adding all values, and returning the final total.
    let finalUnit = shop.products?.reduce((acc, res) => acc + (res.unit * res.qty), 0);
    //accesing delivery charges perUnit
    let deliveryChargesPerUnit = shop.deliveryChargesPerUnit;
    //calculating deliveryCharges Based on finalUnit of products in a particular shop
    let deliveryAmount = shop.deliveryCharges
    if (finalUnit < 11) {
      deliveryAmount = Math.round(parseFloat(shop.distance?.shopDistance) * parseInt(deliveryChargesPerUnit?.BASE_TIER.value));
      shop.deliveryCharges = deliveryAmount < 10 ? 10 : deliveryAmount
    } else if (finalUnit < 21) {
      deliveryAmount = Math.round(parseFloat(shop.distance?.shopDistance) * parseInt(deliveryChargesPerUnit?.MEDIUM_TIER.value));
      shop.deliveryCharges = deliveryAmount < 10 ? 10 : deliveryAmount
    } else {
      deliveryAmount = Math.round(parseFloat(shop.distance?.shopDistance) * parseInt(deliveryChargesPerUnit?.TOP_TIER.value));
      shop.deliveryCharges = deliveryAmount < 10 ? 10 : deliveryAmount
    }

    if(isFirst){
      this.cartData.aggregateDeliveryCharges += shop.deliveryCharges;
    }else{
      this.cartData.aggregateDeliveryCharges = this.cartData.aggregateDeliveryCharges + (shop.deliveryCharges - prevCharge);
    }
    this.upadteLocalCart();
  }


  checkout() {
    this.upadteLocalCart();
    this.router.navigate(['/payment-screen']);
  }

  checkForDelivery(shop?,forAll?) {
    if(forAll){
      this.deliveryStatus = true;
      this.cartData.cart.map(cartDataCart => {
        cartDataCart.timeSlots.map(cartDataCartTimeSlots => {
          cartDataCartTimeSlots.shops.map(cartDataCartTimeSlotsShops => {
            if (cartDataCartTimeSlotsShops.distance.deliveryDistanceLimit < cartDataCartTimeSlotsShops.distance.shopDistance) {
              this.deliveryStatus = false;
              cartDataCartTimeSlotsShops.deliveryStatus = false;
            }else{
              cartDataCartTimeSlotsShops.deliveryStatus = true;
            }
          })
        })
      })
    }else{
      if (shop.distance.deliveryDistanceLimit < shop.distance.shopDistance) {
        this.deliveryStatus = false;
        shop.deliveryStatus = false;
      }else{
        shop.deliveryStatus = true;
      }
    }
  }

  notDelivering(){
    this.commonService.danger('We are not delivering at your location.')
  }

  upadteLocalCart() {
    this.checkForDelivery('',true);
    const cartData = this.cartData?.totalProducts ? JSON.parse(JSON.stringify(this.cartData)) : null;
    if (cartData) {
      this.storageService.setItem(Constants.CART_DATA, cartData);
    } else {
      this.cartData.cart = [];
      this.storageService.remove(Constants.CART_DATA);
    }
  }

  removeProducts(cartIndex, slotIndex, vendorIndex) {
    if (this.cartData[cartIndex].timeSlots[slotIndex].Vendor[vendorIndex].products.length < 1) {
      this.cartData[cartIndex].timeSlots[slotIndex].Vendor.splice(vendorIndex, 1);
    } else if (this.cartData[cartIndex].timeSlots[slotIndex].Vendor.length < 1) {
      this.cartData[cartIndex].timeSlots.splice(slotIndex, 1);
    } else if (this.cartData[cartIndex].timeSlots.length < 1) {
      this.cartData.splice(cartIndex, 1);
    }
  }

  async OpenCalendarModal(item, cartIndex, slotIndex, shopIndex, itemIndex) {
    let product = item.timeSlots[slotIndex].shops[shopIndex].products[itemIndex];
    let shop = item.timeSlots[slotIndex].shops[shopIndex];
    let defaultDate = item.date;
    this.isDisable = true;
    const model = await this.modalCtrl.create({
      component: DeliveryDayPreferenceComponent,
      cssClass: 'DeliveryDayPreference-component-css',
      componentProps: {
        product: item,
      },
    });
    await model.present();
    this.modalData = await model.onWillDismiss();
    this.isDisable = false;
    if(this.modalData.data){
      if (item.timeSlots[slotIndex].shops[shopIndex].products.length == 1) {
        item.timeSlots[slotIndex].shops.splice(shopIndex, 1);
        this.cartData.totalProducts -= 1;
        if (item.timeSlots[slotIndex].shops.length == 0) {
          item.timeSlots.splice(slotIndex, 1);
          if (item.timeSlots.length == 0) {
            this.cartData.cart.splice(cartIndex, 1);
          }
        }
      } else {
        item.timeSlots[slotIndex].shops[shopIndex].products.splice(itemIndex, 1);
        this.cartData.totalProducts -= 1;
      }
      this.addToCart(product, shop, defaultDate)
    }
  }

  async addToCart(item, shop, defaultDate) {
    // If date is not selected than default date is today
    let selectedDate;
    let previousCartData = this.cartData ? JSON.parse(JSON.stringify(this.cartData)) : [];
    if (this.modalData.data == undefined) {
      selectedDate = {
        data: { date: defaultDate },
        role: undefined
      }
    } else {
      selectedDate = this.modalData;
    }
    if (previousCartData == undefined) {
      previousCartData = this.cartData;
    }
    const { data } = selectedDate;
    if (data) {
      const checkDateIndex = previousCartData.cart.findIndex(
        (x) => x.date == data.date
      );
      if (checkDateIndex > -1) {
        const slotIndex = previousCartData.cart[checkDateIndex].timeSlots.findIndex(
          (x) => x.timeSlot === "06AM-10PM"
        );
        if (slotIndex > -1) {
          const vendorIndex = previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.findIndex(
            (x) => x.shopId === shop.shopId,
          );
          previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.catalogVersion = shop.catalogVersion,
            previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.catalogUrl = shop.catalogUrl

          if (vendorIndex > -1) {
            const itemIndex = previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops[vendorIndex].products.findIndex(
              (x) => x.id === item.id
            );
            if (itemIndex > -1) {
              previousCartData.totalProducts += 1;
              previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops[
                vendorIndex
              ].products[itemIndex].qty = item.qty;
              previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops[
                vendorIndex
              ].products[itemIndex].unit += 1;
            } else {
              previousCartData.totalProducts += 1;
              previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops[
                vendorIndex
              ].products.push(item);
            }
          } else {
            previousCartData.totalProducts += 1;
            previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.push({
              shopId: shop.shopId,
              retailerId: shop.retailerId,
              catalogUrl: shop.catalogUrl,
              catalogVersion: shop.catalogVersion,
              products: [item],
              distance: {
                shopDistance: shop.distance.shopDistance,
                deliveryDistanceLimit: shop.deliveryDistanceLimit
              },
              shop_name: shop.shop_name,
              deliveryCharges: shop.deliveryCharges,
              deliveryChargesPerUnit: shop.deliveryChargesPerUnit
            });
          }
        } else {
          previousCartData.totalProducts += 1;
          previousCartData.cart[checkDateIndex].timeSlots.push({
            timeSlot: "06AM-10PM",
            shops: [
              {
                shopId: shop.shopId,
                retailerId: shop.retailerId,
                catalogUrl: shop.catalogUrl,
                catalogVersion: shop.catalogVersion,
                products: [item],
                distance: {
                  shopDistance: shop.distance.shopDistance,
                  deliveryDistanceLimit: shop.deliveryDistanceLimit
                },
                shop_name: shop.shop_name,
                deliveryCharges: shop.deliveryCharges,
                deliveryChargesPerUnit: shop.deliveryChargesPerUnit
              },
            ],
          });
        }
      } else {
        previousCartData.totalProducts += 1;
        previousCartData.cart.push({
          date: data.date,
          timeSlots: [
            {
              timeSlot: "06AM-10PM",
              shops: [
                {
                  shopId: shop.shopId,
                  retailer_id: shop.retailerID,
                  catalogUrl: shop.catalogUrl,
                  catalogVersion: shop.catalogVersion,
                  products: [item],
                  distance: {
                    shopDistance: shop.distance.shopDistance,
                    deliveryDistanceLimit: shop.deliveryDistanceLimit
                  },
                  shop_name: shop.shop_name,
                  deliveryCharges: shop.deliveryCharges,
                  deliveryChargesPerUnit: shop.deliveryChargesPerUnit
                },
              ],
            },
          ],
        });
      }
      this.cartData = previousCartData;
      this.storageService.setItem(Constants.CART_DATA, previousCartData);
      this.ionViewWillEnter();
    }
  }
}
