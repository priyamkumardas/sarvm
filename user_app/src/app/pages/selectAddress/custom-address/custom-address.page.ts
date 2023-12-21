import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from 'src/app/lib/services/location.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { Constants } from 'src/app/config/constants';
import { StorageService } from 'src/app/lib/services/storage.service';
import { HomePage } from 'src/app/pages/home/home.page';
import { Console } from 'console';
import { Capacitor } from '@capacitor/core';
import { ConnectivityService } from 'src/app/lib/services/connectivity.service';


@Component({
  selector: 'app-custom-address',
  templateUrl: './custom-address.page.html',
  styleUrls: ['./custom-address.page.scss'],
})
export class CustomAddressPage implements OnInit {

  location={
    lat: null,
    lon: null,
  }
  address:any;
  changedLocation:any;
  recenAddress:any;
  connected: any;

  constructor(
    private locationService:LocationService,
    public commonService:CommonService,
    private storageService:StorageService,
    public homepage: HomePage,
    private connectivityservice: ConnectivityService,
    ) { }

  ngOnInit() {
    this.getLocation();
    this.recenAddress = this.storageService.getItem(Constants.RECENT_LOCATION);
    this.checkConnectivity();
  }
  checkConnectivity(){
    this.connectivityservice.connected$.subscribe(connected => {
      this.connected = connected;
      console.log(this.connected)
    });
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
          this.getAddress(this.location)
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
        this.getAddress(this.location)
      }).catch(err=>{
        this.commonService.alert('Location permission','Location is needed for the app to work properly, kindly go to settings and provide location permission to app.','Ok','Cancel',()=>this.getLocation(),()=>history.back());
      })
    }
  }


  getAddress(e){
    this.address = null;
    this.changedLocation = {
      lat: e.lat,
      lon: e.lon
    }
    this.commonService.presentLoading();
    this.locationService.getAddressFormLatlong(e.lat, e.lon).subscribe(
      (data) => {
        this.commonService.dissmiss_loading()
        this.commonService.hasCurrentLocation = true;
        this.address = {
          display_name:data['results'][0].formatted_address,
          lat: e.lat,
          lon: e.lon
        }
        //auto clicking on input when address get's update to force update the address in inputs
        this.autoClickfunction()
      },
      (error) => {
        this.commonService.dissmiss_loading()
      }
    );
  }
  autoClickfunction(){
    //auto clicking on input when address get's update to force update the address in inputs
    document.getElementById('clickButton').click();
  }
  searchAddress(e){
    this.setLatLng(e);
  }

  setGlobalLatLong(){
    this.storageService.setItem(
      Constants.USER_LOCATION,
      this.address
    );
    this.recenAddress?this.recenAddress.filter(res=>res.display_name == this.address.display_name).length?'':this.recenAddress.push(this.address):this.recenAddress = [this.address];
    this.storageService.setItem(
      Constants.RECENT_LOCATION,
      this.recenAddress
    );
    this.locationService.currentLatLong = {
      lat: this.changedLocation.lat,
      lon: this.changedLocation.lon
    };
    this.locationService.locationGot.next(true);
    history.back();
  }

  setLatLng(place){
    this.location = {
      lat: place.lat,
      lon: place.lon
    };
    this.getAddress(this.location)
  }

}