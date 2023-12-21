import { CommonApi } from 'src/app/lib/services/api/common.api';
import { Injectable } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { Constants } from 'src/app/config/constants';
import { StorageService } from './../../lib/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  helper: any;
  lat: number;
  lng: number;
  currentLatLong:any;
  locationGot = new BehaviorSubject<boolean>(false);
  updateAddress = this.locationGot.asObservable()
  currentAddress: any;
  locationSubscription:any;

  constructor(
    private geolocation: Geolocation,
    private commonApi: CommonApi,
    private storageService: StorageService,
    private locationAccuracy: LocationAccuracy,
  ){
    this.currentAddress=this.storageService.getItem(Constants.USER_LOCATION)
    this.currentLatLong = {
      lat: this.currentAddress.lat,
      lon: this.currentAddress.lon
    };
  }

  async getLocation() {
    return await this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });
  }

  getSearchLocation(e) {
    const url = 'https://nominatim.openstreetmap.org/search.php?q=' + e + '&polygon_geojson=1&format=jsonv2';
    return this.commonApi.getDataByUrl(url);
  }

  getAddressFormLatlong(lat, lng) {
    const url =
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + environment.gMaps.apiKey;
    return this.commonApi.getCDNLink(url);
  }

  getFormPostalCode(postalCode,country) {
    const url =
      'https://maps.googleapis.com/maps/api/geocode/json?address=' + postalCode + '&sensor=true&key=' + environment.gMaps.apiKey;
    return this.commonApi.getCDNLink(url);
  }

  async currentLocation(cb) {
    await navigator.geolocation.getCurrentPosition((position) => {
      {
        this.helper.current_lat = position.coords.latitude;
        this.helper.current_lon = position.coords.longitude;
        this.locationGot.next(<any>{ locationset: true });
        return cb(position);
      }
    });
  }
 
  getAcurateLocation(){
    // console.log('location called');
    return this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
  }
  get_lat_long(){
    this.geolocation.getCurrentPosition({enableHighAccuracy: true,}).then((resp) => {
      this.lat=resp.coords.latitude
      this.lng=resp.coords.longitude
      this.locationGot.next(<any>{ locationset: true });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}