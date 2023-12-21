import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { DialogPaymentComponent } from 'src/app/components/dialog-payment/dialog-payment.component';
import { DialogPaymentFailedComponent } from 'src/app/components/dialog-payment-failed/dialog-payment-failed.component';
import { DialogPaymentSuccessComponent } from 'src/app/components/dialog-payment-success/dialog-payment-success.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';
import { OrderService } from 'src/app/lib/services/order.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { DialogOrderStatusComponent } from 'src/app/components/dialog-order-status/dialog-order-status.component';
import { OrderDeliverySuccessComponent } from 'src/app/components/order-delivery-success/order-delivery-success.component';

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.page.html',
  styleUrls: ['./order-delivery.page.scss'],
})
export class OrderDeliveryPage implements OnInit {

  orderStateData: any;
  tripOrderDetail: any = [];

  constructor(private ngLocation: Location,
    private modalCtrl: ModalController,
    private router: Router,
    public commonService: CommonService,
    private orderService: OrderService,
    private callNumber: CallNumber) {

      if(this.router.getCurrentNavigation().extras.state && 
          this.router.getCurrentNavigation().extras.state.orderDeliverData) {
        this.orderStateData = this.router.getCurrentNavigation().extras.state.orderDeliverData;
        console.log(this.orderStateData);
      }

     }

  ngOnInit() {
    if(this.orderStateData) {
      this.getTripDetailsByTripId();
    }
  }

  getTripDetailsByTripId() {
    this.commonService.present();
    this.orderService.getTripDetailsByTripId(this.orderStateData.tripId).subscribe((res: any) => {
      console.log('bank res ', res);
      this.commonService.dismiss();
      if (res?.isTrip.success && res?.isTrip?.data != undefined && res?.isTrip?.data != null && res?.isTrip?.data != '') {
        this.tripOrderDetail = res.isTrip.data;
      }
    }, (error) => {
      this.commonService.dismiss();
      this.commonService.danger(error?.message);
    });
  }

  orderTripDeliveredStatus(status,tripId) {
    let tripData = {
      tripId: tripId,
      status: status,
    }
    this.orderService.updateTripDetailsByTripId(tripData).subscribe((res: any) => {
      console.log('order res ', res);
      if (res?.isTripUpdate.success && res?.isTripUpdate?.data != undefined && res?.isTripUpdate?.data != null 
          && res?.isTripUpdate?.data != '') {
          this.commonService.success("Has picked up your trip");
          this.router.navigate(['/home']);
      }
    }, (error) => {
      this.commonService.danger(error?.message);
    });
  }

  getCharector(str: any){
    return str.charAt(0) + str.charAt(str.indexOf(' ') + 1)
  }

  orderStatusChange(statusType: any, tripDetail: any) {
    let tripData = {
      tripId: tripDetail.tripId,
      status: statusType,
    }
    this.orderService.updateTripDetailsByTripId(tripData).subscribe((res: any) => {
      console.log('order res ', res);
      if (res?.isTripUpdate.success && res?.isTripUpdate?.data != undefined && res?.isTripUpdate?.data != null && res?.isTripUpdate?.data != '') {
        this.orderViewChange(statusType, res?.isTripUpdate?.data);
        //this.tripOrderDetail = res?.isTripUpdate?.data;
      }
    }, (error) => {
      this.commonService.danger(error?.message);
    });
  }

  orderViewChange(statusType: any, tripDetail: any) {
    if(statusType == "DELIVERED") {
      this.getTripDetailsByTripId();
      //this.confirmPayment('Payment Received', tripDetail)
    } else if(statusType == "NO_SHOW") {
      this.callNumberOrder(tripDetail?.pickUp?.phoneNumber)
      this.router.navigate(['/home']);
    }
      //this.router.navigate(['/trip-history'],  { state: { orderDeliverData: tripDetail } });
  }

  async dialogOrderStatusComponentModal(statusType: any, tripDetail: any) {
    const modal = await this.modalCtrl.create({
      component: DialogOrderStatusComponent,
      cssClass: 'cancel-modal-css',
      backdropDismiss: false,
      componentProps: {statusType: statusType}
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "") {
        if(modelData.data.status == 'Yes') {
          this.orderStatusChange(statusType, tripDetail);
        }
      } 
      console.log(modelData);
    });
    await modal.present();
  }

  async confirmPayment(statusType: any, tripDetail: any) {
    const modal = await this.modalCtrl.create({
      component: DialogOrderStatusComponent,
      cssClass: 'cancel-modal-css',
      backdropDismiss: false,
      componentProps: {
        statusType: statusType, tripOrder: tripDetail,
        isOrder: true
      }
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "") {
        if(modelData.data.status == 'Yes') {
          // this.dialogPaymentSuccessComponentModal();
          this.checkPaymentAcknowledgement(tripDetail);
        } else {
          this.dialogPaymentFailedComponentModal();
        }
      } 
      console.log(modelData);
    });
    await modal.present();
  }

  checkPaymentAcknowledgement(orderItem: any){
    if(orderItem.orderId != null && orderItem.orderId != undefined && orderItem.orderId != ""){
      let paymentTripOrder = {
        "laPayment": true,
      }
      this.orderService.updatePaymentStatus(paymentTripOrder, orderItem.tripId).subscribe((order: any) => { 
        if(order.isTripUpdate.success){
          this.dialogPaymentSuccessComponentModal();
        } else {
          this.dialogPaymentFailedComponentModal();
        }
      }, (error) => {
        this.commonService.danger(error);
      });
    }
  }

  async dialogPaymentComponentModal() {
    // const modal = await this.modalCtrl.create({
    //   component: DialogPaymentComponent,
    //   cssClass: 'cancel-modal-component-css',
    //   componentProps: {
    //   }
    // });
    // modal.onDidDismiss().then((modelData: any) => {
    //   /* if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
    //     console.log('Modal Data : ' + modelData);
    //   } */
    // });
    // await modal.present();
  }

  async dialogPaymentFailedComponentModal() {
    const modal = await this.modalCtrl.create({
      component: DialogPaymentFailedComponent,
      cssClass: 'cancel-modal-css',
      backdropDismiss: false,
      componentProps: {
      }
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "") {
      }
    });
    await modal.present();
  }

  async dialogPaymentSuccessComponentModal() {
    const modal = await this.modalCtrl.create({
      component: DialogPaymentSuccessComponent,
      cssClass: 'cancel-modal-css',
      backdropDismiss: false,
      componentProps: {
      }
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "") {
        if(modelData.data.status == 'Yes') {
          this.router.navigate(['/home']);
          // this.orderDeliverySuccessComponentModal();
        }
      }
    });
    await modal.present();
  }

  async orderDeliverySuccessComponentModal() {
    const modal = await this.modalCtrl.create({
      component: OrderDeliverySuccessComponent,
      cssClass: 'cancel-modal-css',
      backdropDismiss: false,
      componentProps: {
      }
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "") {
        if(modelData.data.status == 'Yes') {
          //this.orderDeliverySuccessComponentModal();
        }
      }
    });
    await modal.present();
  }

  callNumberOrder(number: any) {
    this.callNumber.callNumber(number,true);
  }
  
}
