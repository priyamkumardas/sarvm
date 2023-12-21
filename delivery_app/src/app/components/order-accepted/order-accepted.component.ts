import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { OrderService } from 'src/app/lib/services/order.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { DialogOrderStatusComponent } from '../dialog-order-status/dialog-order-status.component';
import { OrderInTransitComponent } from '../order-in-transit/order-in-transit.component';

export enum OrderStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  PICKUP = "PICKUP",
  REACHED_DL = "REACHED_DL",
  DELIVERED = "DELIVERED",
  NO_SHOW = "NO_SHOW"
}
@Component({
  selector: 'app-order-accepted',
  templateUrl: './order-accepted.component.html',
  styleUrls: ['./order-accepted.component.scss'],
})
export class OrderAcceptedComponent implements OnInit {

  value;
  orderStatus = OrderStatus;
  @Input() newOrderData: any;
  tripDetail: any = [];

  constructor(private router: Router,
    private modalCtrl: ModalController,
    public commonService: CommonService,
    private orderService: OrderService,
    private callNumber: CallNumber,
    private launchNavigator: LaunchNavigator,
    private platform: Platform
  ) {}

  ngOnInit() {
    if(this.newOrderData) {
      this.tripDetail = this.newOrderData;
    }
    console.log("ngOnInit calling" + this.tripDetail)
    //this.getTripDetailsByTripId();
  }

  getTripDetailsByTripId() {
    this.commonService.present();
    this.orderService.getTripDetailsByTripId(this.newOrderData.tripId).subscribe((res: any) => {
      console.log('bank res ', res);
      if (res?.isTrip.success && res?.isTrip?.data != undefined && res?.isTrip?.data != null && res?.isTrip?.data != '') {
        this.commonService.dismiss();
        this.tripDetail = res.isTrip.data;
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
        this.orderViewChange(statusType, tripDetail);
      }
    }, (error) => {
      this.commonService.danger(error?.message);
    });
  }

  orderViewChange(statusType: any, tripDetail: any) {
    if(statusType == "REACHED_PL") {
      this.closeOrderAcceptedModal();
      this.router.navigate(['/order-pickup'],  { state: { orderPickupData: tripDetail } });
    } else if(statusType == "REACHED_DL") {
      this.closeOrderAcceptedModal();
      this.openInTransitComponent(tripDetail);
    } else {
      this.closeOrderAcceptedModal();
      this.router.navigate(['/order-delivery'],  { state: { orderDeliverData: tripDetail } });
    }
  }

  async openInTransitComponent(tripDetail: any) {
    const modal = await this.modalCtrl.create({
      component: OrderInTransitComponent,
      componentProps: {orderTripData: tripDetail}
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "") {
        if(modelData.data.status == 'Yes') {
          //this.orderStatusChange(statusType, tripDetail);
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
          //this.orderViewChange(statusType, tripDetail)
          this.orderStatusChange(statusType, tripDetail);
        } 
      } 
      console.log(modelData);
    });
    await modal.present();
  }

  orderAcceptedDetail(statusType: any, tripDetail: any) {
    this.closeOrderAcceptedModal();
    this.router.navigate(['/order-pickup'],  { state: { orderPickupData: tripDetail } });
  }

  closeOrderAcceptedModal() {
    this.modalCtrl.dismiss();
  }

  callCustomer(phoneNumber){
    window.location.href="tel:+91"+phoneNumber;
  }

  openMap(lat: any, lon: any) {
    let destination = lat + ',' + lon;
    let options: LaunchNavigatorOptions = {
      app: this.launchNavigator.APP.GOOGLE_MAPS
    }
    this.launchNavigator.navigate(destination, options)
      .then(
        success => console.log('Launched navigator', success),
        error => console.log('Error launching navigator', error)
      );
  }
}
