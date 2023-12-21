import { Component, OnInit, } from '@angular/core';
import { CartService } from 'src/app/lib/services/cart.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { SupportPage } from 'src/app/pages/order/support/support.page';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePickerComponent } from '../../employees/date-picker/date-picker.component';
import * as moment from 'moment';
import { DeliveryDayPreferenceComponent } from 'src/app/components/delivery-day-preference/delivery-day-preference.component';
import { Constants } from 'src/app/config/constants';
import { StorageService } from './../../../lib/services/storage.service';
import { LocationService } from 'src/app/lib/services/location.service';
import { SupprtCallComponent } from '../../supprt-call/supprt-call.component';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import {  Platform, IonRouterOutlet } from '@ionic/angular';
import { Optional } from '@angular/core';
export enum OrderStatus {
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
  Rejected = 'REJECTED',
  NoShow = 'NO_SHOW',
  PendingPayment = 'PAYMENT_PENDING',
}

@Component({
  selector: 'app-active-order',
  templateUrl: './active-order.page.html',
  styleUrls: ['./active-order.page.scss'],
})
export class ActiveOrderPage implements OnInit {
  orders =[];
  orderSet = [];
  order: any;
  activeNav = 'ALL';
  searchShopDetails='';
  format = 'YYYY-MM-DD';
  selectedDate: any;
  flag: boolean;
  statusSegment = 'ALL';
  segment;
  segmentTime: any;
  addDisable: boolean = false;
  cartData = {
    delivery: {
      location: {
        address: this.storageService.getItem(Constants.USER_LOCATION) ? this.storageService.getItem(Constants.USER_LOCATION).display_name : '',
        type: "Home",
        lat: this.locationService.currentLatLong.lat,
        lon: this.locationService.currentLatLong.lon
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
  limit = 5;
  offset = 0;
  responce:any;
  allOrder: any = [];
  deliveryDate = 'ALL';
 

  constructor(private locationService: LocationService, private storageService:StorageService ,private cartService: CartService, private modalCtrl: ModalController,private route: ActivatedRoute, public commonservice: CommonService, private router: Router,private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet) 
  { 
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        this.router.navigate(['/tabs/home']);
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.order = res.order
    })   
  }
  ionViewWillEnter(){
    this.allOrder = []
    if(this.order == 'ACTIVE'){
      this.statusSegment = 'NEW,PROCESSING,READY,ACCEPTED,DISPATCHED,IN_TRANSIT,PICKEDUP,REACHED_DELIVERY_LOCATION,DELIVERED';
      this.getOrders(this.statusSegment, this.deliveryDate);
    }else if(this.order =='COMPLETED'){
      this.statusSegment = 'COMPLETED'
      this.getOrders(this.statusSegment, this.deliveryDate);
    }
  }
   

  async openDateModal() {
    this.addDisable = true;
    const model = await this.modalCtrl.create({
      component: DatePickerComponent,
      cssClass: 'bottomModal',
      componentProps: {
        date: null,
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.addDisable = false;
    this.selectedDate = data ? data.substring(0, 10) : undefined;
    if (this.selectedDate != undefined) {
       this.currentDay(this.selectedDate);
    } else {
       this.currentDay(this.deliveryDate);
    }
  }

  // getOrder(id) {
  //   this.commonservice.presentLoading()
  //   this.cartService.getOrder(id).subscribe(res => {
  //     this.commonservice.dissmiss_loading()
  //     if(res['success']){
  //       this.reorder(res['data']);
  //     }
  //   },error=>{
  //     this.commonservice.dissmiss_loading();
  //     this.commonservice.toast(error.error.error.message);
  //   })
  // }

  // async reorder(order){
  //   const model = await this.modalCtrl.create({
  //     component: DeliveryDayPreferenceComponent,
  //     cssClass: 'DeliveryDayPreference-component-css',
  //   });
  //   await model.present();
  //   const { data } = await model.onWillDismiss();
  //   order.products.map(res=>{
  //     this.addToCart(res,data,order.shop.shop_id,order.seller.retailerId);
  //   })
  // }

  // async addToCart(item, date, shop_id, retailer_id) {
  //   // If date is not selected than default date is today
  //   let defaultDate = new Date().toISOString().split('T')[0];
  //   let previousCartData = this.storageService.getItem(Constants.CART_DATA);
  //   console.log(item,previousCartData);
  //   let selectedDate;
  //   if (date == undefined) {
  //     selectedDate = {
  //       data: { date: defaultDate },
  //     }
  //   } else {
  //     selectedDate = date;
  //   }
  //   if (!previousCartData) {
  //     console.log(this.cartData);
  //     previousCartData = this.cartData;
  //   }
  //   const { data } = selectedDate;
  //   if (data) {
  //     data.date = new Date(data.date).toISOString().split('T')[0];
  //     const checkDateIndex = previousCartData.cart.findIndex(
  //       (x) => new Date(x.date).toLocaleDateString() === new Date(data.date).toLocaleDateString()
  //     );
  //     if (checkDateIndex > -1) {
  //       const slotIndex = previousCartData.cart[checkDateIndex].timeSlots.findIndex(
  //         (x) => x.timeSlot === "06AM-10PM"
  //       );
  //       if (slotIndex > -1) {
  //         const vendorIndex = previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.findIndex(
  //           (x) => x.shopId === shop_id,
  //         );
  //         previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.catalogVersion = this.vendorDetails.store_meta[0]?.version,
  //           previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.catalogUrl = this.vendorDetails.store_meta[0]?.url;

  //         if (vendorIndex > -1) {
  //           const itemIndex = previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops[vendorIndex].products.findIndex(
  //             (x) => x.id === item.id
  //           );
  //           if (itemIndex > -1 && previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops[vendorIndex].products[itemIndex].qty == item.qty) {
  //             previousCartData.totalProducts += 1;
  //             previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops[
  //               vendorIndex
  //             ].products[itemIndex].unit += 1;
  //           } else {
  //             previousCartData.totalProducts += 1;
  //             previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops[
  //               vendorIndex
  //             ].products.push(item);
  //           }
  //         } else {
  //           previousCartData.totalProducts += 1;
  //           previousCartData.cart[checkDateIndex].timeSlots[slotIndex].shops.push({
  //             shopId: shop_id,
  //             retailer_id: retailer_id,
  //             catalogUrl: this.vendorDetails.store_meta[0]?.url,
  //             catalogVersion: this.vendorDetails.store_meta[0]?.version,
  //             products: [item],
  //           });
  //         }
  //       } else {
  //         previousCartData.totalProducts += 1;
  //         previousCartData.cart[checkDateIndex].timeSlots.push({
  //           timeSlot: "06AM-10PM",
  //           shops: [
  //             {
  //               shopId: shop_id,
  //               retailer_id: retailer_id,
  //               catalogUrl: this.vendorDetails.store_meta[0]?.url,
  //               catalogVersion: this.vendorDetails.store_meta[0]?.version,
  //               products: [item],
  //             },
  //           ],
  //         });
  //       }
  //     } else {
  //       previousCartData.totalProducts += 1;
  //       previousCartData.cart.push({
  //         date: data.date,
  //         timeSlots: [
  //           {
  //             timeSlot: "06AM-10PM",
  //             shops: [
  //               {
  //                 shopId: shop_id,
  //                 retailer_id: retailer_id,
  //                 catalogUrl: this.vendorDetails.store_meta[0]?.url,
  //                 catalogVersion: this.vendorDetails.store_meta[0]?.version,
  //                 products: [item],
  //               },
  //             ],
  //           },
  //         ],
  //       });
  //     }
  //     this.storageService.setItem(Constants.CART_DATA, previousCartData);
  //   }
  // }

  changeOrderSegment(status: any) {
    this.allOrder =[];
    this.offset = 0;
    this.statusSegment = status;
    // this.currentDay(this.activeNav)
    this.getOrders(this.statusSegment, this.deliveryDate)
  }
  onIonInfinite(ev,order_type) {
    setTimeout(() => {    
       this.offset +=5;
       this.getOrders(this.statusSegment, this.deliveryDate);       
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  getOrders(order_type, deliveryDate, searchShopDetails?) {
    // this.commonservice.presentLoading()
    this.cartService.getOrders(this.statusSegment,this.limit,this.offset,this.deliveryDate,this.searchShopDetails).subscribe(res => {
      this.orders = res['data'];
      this.allOrder.push(...this.orders);
      console.log(this.allOrder)
      this.allOrder.length == 0 ? this.flag = true : this.flag = false; 
        this.allOrder.forEach(element => {
          console.log(element.status)
        });
      // if (this.order == 'ACTIVE') {
      //   const activeOutput = this.allOrder.filter(obj => obj.status != 'COMPLETED' && obj.status != 'NO_SHOW' && obj.status != 'CANCELLED' && obj.status != 'REJECTED' && obj.status != 'DELIVERED')
      //   this.allOrder = activeOutput;
      //   this.orderSet.length == 0 ? this.flag = true : this.flag = false;
      // }
      // else if (this.order == 'COMPLETED') {
      //   const completedOutput = this.orders.filter(obj => obj.status == 'COMPLETED' || obj.status == 'NO_SHOW' || obj.status == 'CANCELLED' || obj.status == 'REJECTED')
      //   this.orderSet = completedOutput;
      //   this.orderSet.length == 0 ? this.flag = true : this.flag = false;
      // }

      // this.commonservice.dissmiss_loading()
      // this.currentDay(this.activeNav);
      // this.filterBySearch(); 

    }, error => {
      this.commonservice.dissmiss_loading()
      this.commonservice.toast(error.error.error.message)
    })
  }
  
  async support() {
    this.addDisable = true
    const model = await this.modalCtrl.create({
      component: SupportPage,
      cssClass: 'OtpBox-AddMember'
    });
    await model.present();
    this.addDisable = false
    const { data } = await model.onWillDismiss();
    if(data == "Call" ){
      if(this.allOrder.length == 0){
        this.commonservice.danger("You don't have any order")
      }else{
        this.supportCall()
      }
    }
  }

  async supportCall() {
    const model = await this.modalCtrl.create({
      component: SupprtCallComponent,
      cssClass: 'OtpBox-AddMember',
      componentProps: {
        order: this.allOrder
      }
    });
    await model.present();
    const { data } = await model.onWillDismiss();
  }


  filterBySearch() {
    this.orders = [];
    this.allOrder =[];
    this.offset = 0;
    this.cartService.getOrders(this.statusSegment, this.limit, this.offset, this.deliveryDate, this.searchShopDetails).subscribe((orders: any) => {
        if (orders.data?.length == 0) {
          this.commonservice.toast("No data available, please try again later.");
        } else if (orders.success == true && orders.data != undefined && orders.data?.length != 0) {
          this.orders = orders.data;
          this.allOrder.push(...this.orders);
          console.log(this.orders)
        }
      }, (error) => {
        console.log(error)
      });
  }

  currentDay(day) {
    this.allOrder = []; //clearing allOrder's array as when filter is applied then we're getting data from the api..
    this.offset = 0; //resetting offset as filter was applied so we need to get data from 0th index
    this.activeNav = day;
    const deliveryDate = this.getDeliveryDate(day);
    this.deliveryDate = deliveryDate;
    console.log(deliveryDate, this.deliveryDate);
    this.getOrders(this.statusSegment, deliveryDate);
  }

  getDeliveryDate(day) {
    switch (day) {
      case 'ALL':
        return 'ALL';
      case 'Today':
        return moment().format('YYYY-MM-DD');
      case 'Yesterday':
        return moment().subtract(1, 'd').format('YYYY-MM-DD');
      default:
        return day;
    }
  }  







  // currentDay(day) {

  //   if (this.orders) {
  //     this.flag=false;
  //     this.activeNav = day;
  //     this.orders = this.orderSet.filter((order) => {
  //       if (day == 'ALL' && (this.statusSegment == 'ALL' || this.statusSegment == order.status)) {
  //         return order;
  //       }
  //       else if (day == 'Today' && (this.statusSegment == 'ALL' || this.statusSegment == order.status)) {
  //         let todaydate = moment.utc(order.delivery.deliveryDate);
  //         let todayLocalDate = todaydate.format('DD/MM/YYYY');
  //         let currentLocal = moment().format('DD/MM/YYYY');
  //         if (todayLocalDate == currentLocal) {
  //           return order;
  //         }
  //       }
  //       else if (day == 'Yesterday' && (this.statusSegment == 'ALL' || this.statusSegment == order.status)) {
  //         const yesterdayDate = moment().subtract(1, 'd').format('DD/MM/YYYY');
  //         let orderDate = moment.utc(order.delivery.deliveryDate).format('DD/MM/YYYY');
  //         let localDate = orderDate;
  //         if (yesterdayDate == localDate) {
  //           return order;
  //         }
  //       }
  //       else if (day == this.selectedDate && (this.statusSegment == 'ALL' || this.statusSegment == order.status)) {
  //         const date = new Date(day).toISOString();
  //         var selectDate = moment.utc(day);
  //         var selectLocalDate = selectDate.format('YYYY-MM-DD')
  //         var dateWise = moment.utc(order.delivery.deliveryDate);
  //         var localDateWise = dateWise.format('YYYY-MM-DD');
  //         if (selectLocalDate == localDateWise) {
  //           return order;
  //         }
  //       }
  //     });
  //   }
  //   if (this.allOrder.length==0) {
  //     this.flag=true
  //   } 
  // }
  DoOrder(){
    this.router.navigate(['/tabs/home']);
  }
}
