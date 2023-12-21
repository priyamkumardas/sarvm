import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController, Platform } from '@ionic/angular';
import { OrderDetailsComponent } from 'src/app/components/order-details/order-details.component';
import { OrderAcceptedComponent } from 'src/app/components/order-accepted/order-accepted.component';
import { DialogOrderStatusComponent } from 'src/app/components/dialog-order-status/dialog-order-status.component';
import { OrderService } from 'src/app/lib/services/order.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { environment } from 'src/environments/environment';
import { LocationService } from 'src/app/lib/services/location.service';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.scss'],
})
export class OrderNewComponent implements OnInit {

  @Input() newOrderData: any = [];
  @Input() currentLocation: any;
  locationToRetailer: any;

  constructor(private ngLocation: Location,
    private modalCtrl: ModalController,
    private orderService: OrderService,
    public commonService: CommonService,
    private launchNavigator: LaunchNavigator,
    private platform: Platform,
    private locationService: LocationService) { }

    ngOnInit() {
      //this.getTripDetailsByTripId();
      if(this.newOrderData) {
        this.getPickupLocation();
      }
    }
  
    // getTripDetailsByTripId() {
    //   this.commonService.present();
    //   this.orderService.getTripDetailsByTripId(this.newOrderData.tripId).subscribe((res: any) => {
    //     this.commonService.dismiss();
    //     console.log('bank res ', res);
    //     if (res?.isTrip.success && res?.isTrip?.data != undefined && res?.isTrip?.data != null && res?.isTrip?.data != '') {
    //       this.tripDetail = res.isTrip.data;
    //       this.getPickupLocation();  // call for get distance
    //     }
    //   }, (error) => {
    //     this.commonService.dismiss();
    //     this.commonService.danger(error?.message);
    //   });
    // }

    async getPickupLocation() {
      var radlat1 = Math.PI * this.newOrderData.pickUp.location.lat/180;
      var radlat2 = Math.PI * this.currentLocation.lat/180;
      var theta = this.newOrderData.pickUp.location.lon - this.currentLocation.lon;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      // if (unit=="K") { dist = dist * 1.609344 }
      // if (unit=="N") { dist = dist * 0.8684 }
      this.locationToRetailer = dist * 1.609344
      //return dist;

      // let origin = `${this.currentLocation.lat},${this.currentLocation.lon}`;
      // let destination = `${this.tripDetail.pickUp.location.lat},${this.tripDetail.pickUp.location.lon}`;

      // this.locationService.getDistanceFromLatlong(origin, destination).subscribe(
      //   (data) => {
      //     console.log('distance api data ', data);
      //     this.locationToRetailer = data['routes'][0].legs[0].distance.text;
      //   },
      //   (error) => {
      //     console.log('distance api error ', error);
      //   }
      // );
    }

  async openOrderDetailsModal(tripOrderDetail:any) {
    const modal = await this.modalCtrl.create({
      component: OrderDetailsComponent,
      cssClass: 'gst-modal-css',
      componentProps: {isModal : false, orderData: tripOrderDetail}
    });
    await modal.present();
  }

  orderStatusChange(statusType: any, tripDetail: any) {
    this.commonService.present();
    let tripData = {
      tripId: tripDetail.tripId,
      status: statusType,
    }
    this.orderService.updateTripDetailsByTripId(tripData).subscribe((res: any) => {
      console.log('order res ', res);
      if (res?.isTripUpdate.success && res?.isTripUpdate?.data != undefined && res?.isTripUpdate?.data != null && res?.isTripUpdate?.data != '') {
        this.commonService.dismiss();
        this.orderViewChange(statusType, res?.isTripUpdate?.data);
      }
    }, (error) => {
      this.commonService.dismiss();
      this.commonService.danger(error?.message);
    });
  }

  orderViewChange(statusType: any, tripOrderDetail: any) {
    if(statusType == "ACCEPTED") {
      this.openOrderAcceptedModal(tripOrderDetail);
    } 
    this.closeOrderNewModal();
  }

  async openOrderAcceptedModal(newOrderData) {
    const modal = await this.modalCtrl.create({
      component: OrderAcceptedComponent,
      componentProps: {newOrderData: newOrderData}
    });
    modal.present();
  }

  async dialogOrderStatusComponentModal(statusType: any, tripDetail: any) {
    const modal = await this.modalCtrl.create({
      component: DialogOrderStatusComponent,
      cssClass: 'cancel-modal-css',
      backdropDismiss: false,
      componentProps: {tripOrder: tripDetail, statusType: statusType}
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

  closeOrderNewModal(){
    this.modalCtrl.dismiss({"status": true});
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
