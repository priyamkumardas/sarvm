import { Injectable } from '@angular/core';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { ClearWatchOptions, Geolocation } from '@capacitor/geolocation';
import { CommonApi } from './api/common.api';
import { environment } from 'src/environments/environment';
import { OnboardService } from './onboard.service';
import { CommonService } from './common.service';
import { StorageService } from './storage.service';
import { Constants } from 'src/app/config/constants';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  datalocation: any;
  locationRequestTime: any;
  watchId: any = "";

  constructor(private locationAccuracy: LocationAccuracy,
    public commonApi: CommonApi,
    public onboardService: OnboardService,
    public commonService: CommonService,
    private storageService: StorageService) {

    this.getLocationRequestTime()
  }

  async getLocation() {
    return await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });

  }

  getAcurateLocation() {
    // console.log('location called');
    return this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
  }

  getDistanceFromLatlong(origin, destination) {
    const url =
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${environment.gMaps.apiKey}`;
    return this.commonApi.getCDNLink(url);
  }

  getLocationRequestTime() {
    this.onboardService.getLocationRequestTime().subscribe((res: any) => {
      if (res?.isLocationTime?.success && res?.isLocationTime?.data != undefined) {
        this.locationRequestTime = res?.isLocationTime?.data;
        this.storageService.setItem(Constants.APP_LOCATION_TIMEOUT, this.locationRequestTime);
      }
    }, (error) => {
      this.commonService.danger(error?.message);
    });
  }

  async startWatchPosition() {
    const positionOptions = {
      enableHighAccuracy: true,
      timeout: this.locationRequestTime * 60000, // Timeout in milliseconds (adjust as needed)
      maximumAge: 0 // Maximum age of a cached position in milliseconds (adjust as needed)
    };
    this.watchId = Geolocation.watchPosition(positionOptions, (position, err) => {
      if (position) {
        this.datalocation = position;
        this.updateDeliveryPersonLocation(this.datalocation)
        console.log('Latitude: ', position.coords.latitude);
        console.log('Longitude: ', position.coords.longitude);
      } else if (err) {
        // Handle the position error
        console.error('Position error:', err);
      }
    });
  }

  async clearWatchPosition() {
    if (this.watchId) {
      console.log('this.wait=', this.watchId);
      const opt: ClearWatchOptions = { id: await this.watchId };
      Geolocation.clearWatch(opt).then(result => {
        console.log('result of clear is', result);
      });
    }
  }

  updateDeliveryPersonLocation(datalocation: any) {
    let locationData = {
      lat: datalocation.coords.latitude + "",
      long: datalocation.coords.longitude + ""
    }
    this.onboardService.updateDeliveryPersonLocation(locationData).subscribe((res: any) => {
      console.log('order res ', res);
      if (res?.isDeliveryLocation.success && res?.isDeliveryLocation?.data != undefined && res?.isDeliveryLocation?.data != null && res?.isDeliveryLocation?.data != '') {
        console.log("----->Location Watch update");
      }
    }, (error) => {
      this.commonService.danger(error?.message);
    });
  }

}
