import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { OrderItemStatusComponent } from 'src/app/components/order-item-status/order-item-status.component';
import { OrderDeliverySuccessComponent } from 'src/app/components/order-delivery-success/order-delivery-success.component';
import { DialogPaymentComponent } from 'src/app/components/dialog-payment/dialog-payment.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';
import { OrderService } from 'src/app/lib/services/order.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { DialogOrderStatusComponent } from 'src/app/components/dialog-order-status/dialog-order-status.component';
import { OrderInTransitComponent } from 'src/app/components/order-in-transit/order-in-transit.component';

@Component({
  selector: 'app-order-pickup',
  templateUrl: './order-pickup.page.html',
  styleUrls: ['./order-pickup.page.scss'],
})
export class OrderPickupPage implements OnInit {

  orderStateData: any;
  tripOrderDetail: any = [];

  constructor(private ngLocation: Location,
    private modalCtrl: ModalController,
    private router: Router,
    public commonService: CommonService,
    private orderService: OrderService,
    private callNumber: CallNumber) { 

      if(this.router.getCurrentNavigation().extras.state && 
          this.router.getCurrentNavigation().extras.state.orderPickupData) {
        this.orderStateData = this.router.getCurrentNavigation().extras.state.orderPickupData;
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

  orderStatusChange(statusType: any, tripDetail: any) {
    let tripData = {
      tripId: tripDetail.tripId,
      status: statusType,
    }
    this.orderService.updateTripDetailsByTripId(tripData).subscribe((res: any) => {
      console.log('order res ', res);
      if (res?.isTripUpdate.success && res?.isTripUpdate?.data != undefined && res?.isTripUpdate?.data != null && res?.isTripUpdate?.data != '') {
        this.orderViewChange(statusType, res?.isTripUpdate?.data);
      }
    }, (error) => {
      this.commonService.danger(error?.message);
    });
  }

  orderViewChange(statusType: any, tripDetail: any) {
    if(statusType == "PICKUP") {
      this.router.navigate(['/home']);
      //this.openInTransitComponent(tripDetail);
    }
  }

  async openInTransitComponent(tripDetail: any) {
    const modal = await this.modalCtrl.create({
      component: OrderInTransitComponent,
      componentProps: { orderTripData: tripDetail }
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "") {
        if(modelData.data.status == 'Yes') {
        } else {
        }
      } 
      console.log(modelData);
    });
    modal.present();
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

  getCharector(str: any){
    return str.charAt(0) + str.charAt(str.indexOf(' ') + 1)
  }
  
  async openOrderItemStatusModal() {
    const modal = await this.modalCtrl.create({
      component: OrderItemStatusComponent,
      cssClass: 'gst-modal-css',
      componentProps: {isModal : false,}
    });
    await modal.present();
  }

  async openDeliverySuccessModal() {
    // const modal = await this.modalCtrl.create({
    //   component: OrderDeliverySuccessComponent,
    //   cssClass: 'gst-modal-css',
    //   componentProps: {isModal : false,}
    // });
    // await modal.present();
  }
  
  async openDialogPaymentComponentModal() {
    const modal = await this.modalCtrl.create({
      component: DialogPaymentComponent,
   
      componentProps: {isModal : false,}
    });
    await modal.present();
  }

  callNumberOrder(number: any) {
    this.callNumber.callNumber(number,true);
  }
  
}
