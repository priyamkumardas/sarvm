import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';import { Location } from '@angular/common';
import { ModalController, Platform, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/lib/services/order.service';
import { OrderPage } from '../order/order.page';
import { CommonService } from 'src/app/lib/services/common.service';
import { DispatchModalComponent } from 'src/app/components/dispatch-modal/dispatch-modal.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { CancelOrderModalComponent } from '../cancel-order-modal/cancel-order-modal.component';

export enum OrderStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  PROCESSING = 'PROCESSING',
  READY = 'READY',
  DELIVERY = 'DELIVERY',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
}



@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  @Input('order') orders;

  value;
  modelData;
  selectedSegment = OrderStatus.NEW;
  readonly OrderStatus = OrderStatus;
  segmentTime: any;
  title: any;
  orderStatus = OrderStatus;
  tabs = Object.values(OrderStatus);
  orderId: string;
  order: any;
  orders1: any = []
  status: any;
  titleText: any;
  okayButton: any;
  sendStatusText: any = "Hello";
  segment: string;
  allOrdersData: any = [];
  searchLang;
  id:any;
  


  constructor(private ngLocation: Location,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private orderService: OrderService,
    private actionSheetCtrl: ActionSheetController,
    private inAppBrowser: InAppBrowser,
    private platform: Platform,
  ) {
    this.route.params.subscribe((res) => {
      this.orderId = res.orderId;
      // console.log(this.orderId);
      this.status = res.orderStatus;
      if (res.orderStatus != null && res.orderStatus != undefined && res.orderStatus != "") {
        this.title = res.orderStatus.charAt(0).toUpperCase() + res.orderStatus.slice(1).toLowerCase() + " Order Details";
      } else {
        this.title = "Order Details";
      }
    });

    // New Design
    this.segment = "1";
  }

  ngOnInit() {
this.id = this.orderId;
this.selectedSegment = this.status

    this.okayButton = this.router.getCurrentNavigation().extras.state
      ? this.router.getCurrentNavigation().extras.state.page
      : null;
    this.getOrderDetails();
    console.log(this.orders);
   this. getOrdersAccordingToCurrentSegment(this.status);
   console.log('segment',this.segmentTime);
   

  }

  openWithInAppBrowser(url) {
    let latlon = url.delivery?.location?.lat + ',' + url.delivery?.location?.lon
    if (this.platform.is('ios')) {
      this.inAppBrowser.create('maps://?q=' + latlon, '_system');
    } else {
      let label = encodeURI(url.user?.name + ' location');
      this.inAppBrowser.create('geo:0,0?q=' + latlon + '(' + label + ')', '_system');
    }
  }

  getOrderDetails() {
    if (this.orderId != null && this.orderId != undefined && this.orderId != "") {
      this.commonService.present();
      this.orderService.getOrderByIdDetails(this.orderId).subscribe((order: any) => {
        if (order.success == true && order.data != null && order.data != undefined) {
          this.order = order.data;
          this.commonService.dismiss();
        } else {
          this.commonService.dismiss();
        }
      }, (error) => {
        console.log(error)
        this.commonService.dismiss();
        // this.commonService.danger(error);
      });
    }
  }

  orderStatusChangeView(orderItem: any, statusText: string) {
    this.commonService.present();
    if (orderItem.orderID != null && orderItem.orderID != undefined && orderItem.orderID != "") {
      let statusOrder = {
        "status": statusText
      }
      this.orderService.updateOrderStatus(orderItem.orderID, statusOrder).subscribe((order: any) => {
        if (order.success) {
          orderItem.status = statusText;
          // this.orderContainerComponent.changeOrderStatusModal(orderItem,statusText,'DELIVERY')
          /* this.orderItemStatus = order;
          this.orderPage.isUpdateOrderItem.next(orderItem); */
          this.commonService.dismiss();
        } else {
          this.commonService.dismiss();
        }
      }, (error) => {
        console.log(error)
        this.commonService.dismiss();
        // this.commonService.danger(error);
      });
    } else {
      this.commonService.dismiss();
    }
  }

  changeOrderStatus(orderItem: any, statusText: string) {
    statusText == 'DISPATCHED' ? this.openDispatchModal(orderItem, statusText) : this.changeOrderStatusModal(orderItem, statusText)
  }

  async changeOrderStatusModal(orderItem: any, statusText: string) {
    if (statusText == 'Received') {
      this.confirmPayment(orderItem, statusText)
    }
    else {
      console.log(statusText, 'statusText')
      const modal = await this.modalCtrl.create({
        component: CancelOrderModalComponent,
        cssClass: 'cancel-order-modal',
        mode:'ios',
        componentProps: {
          'orderType': statusText,
          isOrder: false
        }
      });
      modal.onDidDismiss().then((modelData: any) => {
        if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
          if (modelData.data.status == 'Yes') {
            this.status = statusText;
            this.orderStatusChangeView(orderItem, statusText);
          }
          console.log(modelData);
        }
      });
      await modal.present();
    }
  }

  async openDispatchModal(orderItem: any, statusText: string) {
    const modal = await this.modalCtrl.create({
      component: DispatchModalComponent,
      cssClass: 'DeliveryDayPreference-component-css',
      componentProps: {
        'orderType': statusText
      }
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        if (modelData.data.status == 'deliveryMe' || modelData.data.status == 'deliveryBoy') {
          this.status = statusText;
          this.orderStatusChangeView(orderItem, statusText);
        }
        console.log(modelData);
      }
    });
    await modal.present();
  }

  async confirmPayment(orderItem: any, statusText: string) {
    const modal = await this.modalCtrl.create({
      component: CancelOrderModalComponent,
      cssClass: 'cancel-order-modal',
      mode:'ios',
      componentProps: {
        amount : this.order?.amount,
        'orderType': statusText,
        isOrder: true
      }
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        if (modelData.data.status == 'Yes') {
          this.checkPaymentAcknowledgement(orderItem);
        }
        console.log('Modal Data : ' + modelData);
      }
    });
    await modal.present();
  }

  checkPaymentAcknowledgement(orderItem: any) {
    if (orderItem.orderID != null && orderItem.orderID != undefined && orderItem.orderID != "") {
      let paymentOrder = {
        "acknowledged": true
      }
      this.orderService.updatePaymentStatus(orderItem.orderID, paymentOrder).subscribe((order: any) => {
        if (order.success) {
          this.ngLocation.back();
        }
      }, (error) => {
        this.commonService.danger(error);
      });
    }
  }

  async openCancelModal(orderItem: any, statusText: string) {
    const modal = await this.modalCtrl.create({
      component: CancelOrderModalComponent,
      cssClass: 'cancel-order-modal',
      mode:'ios',
      componentProps: {
        'orderType': statusText,
      }
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "") {
        if (modelData.data.status == 'Yes') {
          this.orderStatusChangeView(orderItem, statusText);
        }
        console.log(modelData);
      }
    });
    await modal.present();
  }

  getCharector(str: any) {
    return str.charAt(0) + str.charAt(str.indexOf(' ') + 1)
  }

  onBack() {
    this.ngLocation.back();
  }

  async openAction(orderItem) {
    console.log(orderItem);
    let tempButtons = [
      // {
      //   icon: 'close-outline',
      //   role: 'cancel',
      //   data: {
      //     action: 'cancel',
      //   }
      // },
      {
        text: 'Accept',
        data: {
          action: '',
        },
        handler: () => {
          this.changeOrderStatusModal(orderItem, 'ACCEPTED')
        }
      },
      {
        text: 'Process',
        data: {
          action: '',
        },
        handler: () => {
          this.changeOrderStatusModal(orderItem, 'PROCESSING')
        }
      },
      {
        text: 'Ready',
        data: {
          action: '',
        },
        handler: () => {
          this.changeOrderStatusModal(orderItem, 'READY')
        }
      },
      {
        text: 'Dispatch',
        data: {
          action: '',
        },
        handler: () => {
          this.openDispatchModal(orderItem, 'DISPATCHED')
        }
      },
      {
        text: 'Start Delivery',
        data: {
          action: '',
        },
        handler: () => {
          this.changeOrderStatusModal(orderItem, 'PICKEDUP')
        }
      },
      {
        text: 'Reached Delivery Location',
        data: {
          action: '',
        },
        handler: () => {
          this.changeOrderStatusModal(orderItem, 'IN_TRANSIT')
        }
      },
      {
        text: 'Delivered',
        data: {
          action: '',
        },
        handler: () => {
          this.changeOrderStatusModal(orderItem, 'DELIVERED')
        }
      },
      {
        text: 'Payment Received',
        data: {
          action: '',
        },
        handler: () => {
          this.confirmPayment(orderItem, 'PAYMENT_PENDING')
        }
      },
    ]
    if (this.status == 'ACCEPTED') { tempButtons.splice(0, 1) }
    if (this.status == 'PROCESSING') { tempButtons.splice(0, 2) }
    if (this.status == 'READY') { tempButtons.splice(0, 3) }
    if (this.status == 'DISPATCHED') { tempButtons.splice(0, 4) }
    if (this.status == 'PICKEDUP') { tempButtons.splice(0, 5) }
    if (this.status == 'IN_TRANSIT') { tempButtons.splice(0, 6) }
    if (this.status == 'DELIVERED') { tempButtons.splice(0, 2) }
    if (this.status == 'PAYMENT_PENDING') { tempButtons.splice(0, 7) }

    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      buttons: tempButtons,
    });

    await actionSheet.present();
  }

  // for pickup
  async openActionPickup(orderItem) {
    console.log(orderItem);
    let tempButtons = [
      // {
      //   icon: 'close-outline',
      //   role: 'cancel',
      //   data: {
      //     action: 'cancel',
      //   }
      // },
      {
        text: 'Accept',
        data: {
          action: '',
        },
        handler: () => {
          this.changeOrderStatusModal(orderItem, 'ACCEPTED')
        }
      },
      {
        text: 'Process',
        data: {
          action: '',
        },
        handler: () => {
          this.changeOrderStatusModal(orderItem, 'PROCESSING')
        }
      },
      {
        text: 'Ready',
        data: {
          action: '',
        },
        handler: () => {
          this.changeOrderStatusModal(orderItem, 'READY')
        }
      },
      {
        text: 'Pickup',
        data: {
          action: '',
        },
        handler: () => {
          this.changeOrderStatusModal(orderItem, 'DELIVERED')
        }
      },
      {
        text: 'Payment Received',
        data: {
          action: '',
        },
        handler: () => {
          this.confirmPayment(orderItem, 'PAYMENT_PENDING')
        }
      },
    ]
    if (this.status == 'ACCEPTED') { tempButtons.splice(0, 1) }
    if (this.status == 'PROCESSING') { tempButtons.splice(0, 2) }
    if (this.status == 'READY') { tempButtons.splice(0, 3) }
    if (this.status == 'DISPATCHED') { tempButtons.splice(0, 4) }
    if (this.status == 'PAYMENT_PENDING') { tempButtons.splice(0, 5) }
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      buttons: tempButtons,
    });
    await actionSheet.present();
  }

  changeSegment(e) {
    if (this.segmentTime) {
      clearTimeout(this.segmentTime)
    }
    this.segmentTime = setTimeout(() => {
      this.segemntChanged(e);
    }, 1000);
  }

  segemntChanged(e) {
    console.log(this.selectedSegment);
    console.log(e);
    this.commonService.present()
    this.orders1 = [];
    if (e.target != undefined && e.target != null) {
      console.log(e?.target?.value.toUpperCase());
      if (e?.target?.value.toUpperCase() === "DISPATCHED" || e?.taget?.value.toUpperCase() === 'IN_TRANSIT' || e?.taget?.value.toUpperCase() === 'PICKEDUP' || e?.taget?.value.toUpperCase() === 'RECHED_DELIVERY_LOCATION') {
        this.selectedSegment = OrderStatus.DELIVERY;
        this.commonService.dismiss();
      } else {
        this.selectedSegment = e?.target?.value.toUpperCase();
        this.commonService.dismiss();
      }

    } else {
      this.selectedSegment = this.selectedSegment;
    }
    this.getOrdersAccordingToCurrentSegment(this.selectedSegment);

    /* this.getList(this.selectedSegment);
    if(this.selectedSegment == OrderStatus.ACCEPTED){
      this.activeDay('All')
    } else if(this.selectedSegment == OrderStatus.PROCESSING){
      this.activeDay('All')
    } */
  }

  changeTab(tab) {
    console.log(tab.value)
    // this.selectedSegment = tab.value
    // this.changeSegment({target:tab});
    this.changeSegment(this.selectedSegment);
  }
  
  getOrdersAccordingToCurrentSegment(currentSegment) {
    // this.orderList = [];
     // console.log(this.activeNav);
     this.orderService.getOrderStatusWise(currentSegment).subscribe((orders1: any) => {
      // this.commonService.dismiss();
       if (orders1.data?.length == 0) {
         this.commonService.danger("No data available, please try again later");
       }
       if (orders1.success == true && orders1.data != undefined && orders1.data?.length != 0) {
         //this.orderList = [];
         this.orders1 = orders1.data;
        this.allOrdersData = this.orders1;

         console.log("order2",this.orders1)
         //this.orderList = orders;
        // this.activeDay(this.activeNav);
       }
     }, (error) => {
       this.commonService.dismiss();
       // this.commonService.danger(error);
     });
     //return this.orderList;
     //return this.orders;
   }


   searchFunction() {
   
console.log("1");
    this.orders1 = this.allOrdersData.filter((lang) => {
      if (lang.orderID?.toLowerCase()?.includes(this.searchLang.toLowerCase())) {
console.log("2");
       
        return lang;        
      }
      if (lang.userDetails?.phone?.toLowerCase().includes(this.searchLang.toLowerCase())) {
        

        return lang;        
      }
    });
  }


}
