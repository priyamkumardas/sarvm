import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { OrderService } from 'src/app/lib/services/order.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { DialogOrderStatusComponent } from '../dialog-order-status/dialog-order-status.component';


export enum OrderStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  PICKUP = "PICKUP",
  REACHED_DL = "REACHED_DL",
  DELIVERED = "DELIVERED",
  NO_SHOW = "NO_SHOW"
}
@Component({
  selector: 'app-order-in-transit',
  templateUrl: './order-in-transit.component.html',
  styleUrls: ['./order-in-transit.component.scss'],
})
export class OrderInTransitComponent implements OnInit {

  value;
  modelData;
  orderStatus = OrderStatus;
  @Input() orderTripData: any;
  tripDetail: any = [];

  constructor(private router: Router,
    private modalCtrl: ModalController,
    public commonService: CommonService,
    private orderService: OrderService,
    private callNumber: CallNumber,
    private launchNavigator: LaunchNavigator,
    private platform: Platform) { }

  ngOnInit() {
    this.getTripDetailsByTripId();
  }

  getTripDetailsByTripId() {
    this.commonService.present();
    this.orderService.getTripDetailsByTripId(this.orderTripData.tripId).subscribe((res: any) => {
      this.commonService.dismiss();
      console.log('bank res ', res);
      if (res?.isTrip.success && res?.isTrip?.data != undefined && res?.isTrip?.data != null && res?.isTrip?.data != '') {
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
        this.orderViewChange(statusType, res?.isTripUpdate?.data);
      }
    }, (error) => {
      this.commonService.danger(error?.message);
    });
  }

  orderViewChange(statusType: any, tripDetail: any) {
    if(statusType == "REACHED_DL") {
      this.closeOrderInTransitModal();
      this.router.navigate(['/order-delivery'],  { state: { orderDeliverData: tripDetail } });
    } 
  }

  orderReachedDelivery(statusType: any, tripDetail: any) {
    this.router.navigate(['/order-delivery'],  { state: { orderDeliverData: tripDetail } });
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

  closeOrderInTransitModal() {
    this.modalCtrl.dismiss({"status":"No"});
    this.router.navigate(['/home']);
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
