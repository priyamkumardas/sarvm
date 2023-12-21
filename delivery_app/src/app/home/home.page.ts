import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController, AlertController, Platform, IonRouterOutlet } from '@ionic/angular';
import { ReferralService } from 'src/app/referal/referral.service';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { OrderNewComponent } from '../components/order-new/order-new.component';
import { OrderAcceptedComponent } from '../components/order-accepted/order-accepted.component';
import { Router } from '@angular/router';
import { OrderInTransitComponent } from '../components/order-in-transit/order-in-transit.component';
import { Capacitor } from '@capacitor/core';
import { Constants } from '../config/constants';
import { StorageService } from '../lib/services/storage.service';
import { LocationService } from '../lib/services/location.service';
import { OrderService } from '../lib/services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tripData: any = [];
  isToggle: boolean;
  tripStatus: boolean = true;

  newItem: any = [];
  ongoingItem: any = [];

  expectedEarning: any = '';
  location={
    lat: null,
    lon: null,
  }
  address:any;
  changedLocation:any;
  isOpenModel: Boolean = false;
  tripDetail: any = [];

  constructor(private ngLocation: Location,
    private modalCtrl: ModalController,
    public commonService: CommonService,
    private onboardService: OnboardService,
    public refferalservice: ReferralService,
    private router: Router,
    private alertCtrl: AlertController,
    public storgeService: StorageService,
    private locationService: LocationService,
    private orderService: OrderService) {
      
      this.isToggle = this.storgeService.getItem(Constants.APP_ONLINE_OFFLINE);
    }

  ngOnInit() {
    this.newItem = this.newItem?.length ? 0 : 0;
    this.ongoingItem = this.ongoingItem?.length ? 0 : 0;
    this.getNewTripData();
    this.getLocation();
  }

  ionViewDidEnter(){
    this.getTripDetailsByUser();
    this.getDeliveryPersonInfo();
  }

  getLocation(location?){
    //Native Platform check
    if (Capacitor.isNativePlatform()) {
      this.locationService.getAcurateLocation().then(res=>{
        this.locationService.getLocation().then(res=> {
          this.commonService.hasCurrentLocation = false;
          this.location = {
            lat: res.coords.latitude,
            lon: res.coords.longitude
          }
          //this.getAddress(this.location)
        }).catch(err=>{
          this.commonService.alert('Location permission','Location is needed for the app to work properly, kindly go to settings and provide location permission to app.','Ok','Cancel',()=>this.getLocation(),()=>history.back());
        })
      }).catch(err=>{
        this.commonService.alert('Location permission','Location is needed for the app to work properly, kindly go to settings and provide location permission to app.','Ok','Cancel',()=>this.getLocation(),()=>history.back());
      });
    } else {
      //map load for the local (browser)
      this.locationService.getLocation().then(res=> {
        this.commonService.hasCurrentLocation = false;
        this.location = {
          lat: res.coords.latitude,
          lon: res.coords.longitude
        }
        console.log(this.location)
        //this.getAddress(this.location)
      }).catch(err=>{
        this.commonService.alert('Location permission','Location is needed for the app to work properly, kindly go to settings and provide location permission to app.','Ok','Cancel',()=>this.getLocation(),()=>history.back());
      })
    }
  }

  getDeliveryPersonInfo() {
    this.onboardService.getDeliveryPersonInfo().subscribe((res: any) => {
      if (res?.isTrip.success && res?.isTrip?.data != undefined && res?.isTrip?.data != null && res?.isTrip?.data != '') {
        this.isToggle = res.isTrip.data.isOnline;
        // this.isToggle = res.isTrip.data.active;
        this.storgeService.setItem(Constants.APP_ONLINE_OFFLINE, this.isToggle);
        this.isToggle = this.storgeService.getItem(Constants.APP_ONLINE_OFFLINE);
      }
    }, (error) => {
      this.commonService.danger(error?.message);
    });
  }

  newOrOngoingTripsToggle(){
    if (this.tripStatus) {
      this.tripStatus = false;
      this.getNewTripData();
    } else {
      this.tripStatus = true;
      this.getTripDetailsByUser();
    }
  }

  getTripDetailsByUser() {
    this.tripData = [];
    //this.commonService.present();
    this.onboardService.getTripDetailsByUserId().subscribe((res: any) => {
      //this.commonService.dismiss();
      console.log('bank res ', res);
      if (res?.isTrip.success && res?.isTrip?.data != undefined && res?.isTrip?.data != null && res?.isTrip?.data != '') {
        this.tripData = res.isTrip.data.trips;
        this.ongoingItem = res?.isTrip?.data?.activeTrips;
        this.expectedEarning = res?.isTrip?.data?.expectedEarning;
      }
    }, (error) => {
      //this.commonService.dismiss();
      this.commonService.danger(error?.message);
    });
  }


  getNewTripData() {
    this.tripData = [];
    //this.commonService.present();
    this.onboardService.getAllNewTripRequest().subscribe((res: any) => {
      console.log('bank res ', res);
      //this.commonService.dismiss();
      if (res?.isTrip.success && res?.isTrip?.data != undefined && res?.isTrip?.data != null && res?.isTrip?.data != '') {
        this.tripData = res.isTrip.data.newTrips;
        this.newItem = res?.isTrip?.data?.activeTrips;
        this.expectedEarning = res?.isTrip?.data?.expectedEarning;
      } else {
        this.newItem = this.newItem?.length ? 0 : 0;
      }

    }, (error) => {
      //this.commonService.dismiss();
      this.commonService.danger(error?.message);
    });
  }

  changeStatus($event){
    this.isToggle = $event.detail.checked;
    let isToggleValue = Object.assign({ "active": this.isToggle})
    this.storgeService.setItem(Constants.APP_ONLINE_OFFLINE, this.isToggle);
    this.isToggle = this.storgeService.getItem(Constants.APP_ONLINE_OFFLINE);
    // this.commonService.present();
    this.onboardService.patchChangeStatusToggle(isToggleValue).subscribe((res: any) => {
      // this.commonService.dismiss();
      if (res?.isTrip.success) {
        console.log('toggle res ', res);
      }
    }, (error) => {
      // this.commonService.dismiss();
      this.commonService.danger(error?.message);
    });
    if(!this.isToggle) {
      this.locationService.clearWatchPosition();
    } else {
      this.locationService.startWatchPosition();
    }
  }

  async openOrderNewModal() {
    const modal = await this.modalCtrl.create({
      component: OrderNewComponent,
      componentProps: { isModal: false, newOrderData: this.tripDetail, currentLocation: this.location}
    });
    modal.onDidDismiss().then((modelData: any) => {
      this.isOpenModel = false;
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined 
          && modelData.data.status == true) {
            this.tripStatus = true;
            this.getTripDetailsByUser();
      }
    });
    this.isOpenModel = true;
    return await modal.present();
  }

  getTripDetailsforOrder(item: any) {
      //this.commonService.present();
      this.orderService.getTripDetailsByTripId(item.tripId).subscribe((res: any) => {
        //this.commonService.dismiss();
        console.log('bank res ', res);
        if (res?.isTrip.success && res?.isTrip?.data != undefined && res?.isTrip?.data != null && res?.isTrip?.data != '') {
          this.tripDetail = res.isTrip.data;
          this.openOrderNewModal();
          //this.getPickupLocation();  // call for get distance
        }
      }, (error) => {
        //this.commonService.dismiss();
        this.commonService.danger(error?.message);
      });
    }

  refferalModule() {
    // this.isOpenModel = true;
    // this.refferalservice.openReferralDashboardModal().then((res)=>{
    //   this.isOpenModel = false;
    // });
    this.router.navigate(['referal'])
  }

  async openAcceptedComponent(orderTripData: any) {
    const modal = await this.modalCtrl.create({
      component: OrderAcceptedComponent,
      componentProps: { isModal: false, newOrderData: orderTripData}
    });
    modal.onDidDismiss().then((modelData: any) => {
      this.isOpenModel = false;
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined ) {
          this.getTripDetailsByUser();
      }
    });
    this.isOpenModel = true;
    return await modal.present();
  }

  openPickUpOrder(item: any) {
    this.router.navigate(['/order-pickup'],  { state: { orderPickupData: item } });
  }

  async openInTransitComponent(orderTripData: any) {
    const modal = await this.modalCtrl.create({
      component: OrderInTransitComponent,
      componentProps: { isModal: false, orderTripData: orderTripData}
    });
    modal.onDidDismiss().then((modelData: any) => {
      this.isOpenModel = false;
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined 
          && modelData.data.status == true) {
          this.getTripDetailsByUser();
      }
    });
    this.isOpenModel = true;
    return await modal.present();
  }

  openDeliveryOrder(item: any) {
    this.router.navigate(['/order-delivery'],  { state: { orderDeliverData: item } });
  }
}
