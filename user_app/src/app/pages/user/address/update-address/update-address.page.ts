import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LocationService } from 'src/app/lib/services/location.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { Constants } from 'src/app/config/constants';
import { StorageService } from 'src/app/lib/services/storage.service';
import { UserService } from 'src/app/lib/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { HomePage } from 'src/app/pages/home/home.page';
import { Capacitor } from '@capacitor/core';
import { ConnectivityService } from 'src/app/lib/services/connectivity.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.page.html',
  styleUrls: ['./update-address.page.scss'],
})
export class UpdateAddressPage implements OnInit, OnDestroy {

  @ViewChild('f') f:NgForm;
  location = {
    lat: null,
    lon: null,
  }
  address: any;
  changedLocation: any;
  form = {
    addressType: 'Other',
    primary: false,
    streetAddress: null,
    locality: null,
    landmark: null,
    region: null,
    city: null,
    state: null,
    country: 'India',
    pincode: null,
    location: {
      latitude: null,
      longitude: null,
    }
  };
  formatted_address:any;
  aid: null;
  canUpdateLocalAddress: boolean = false;
  connected : boolean;
  getcurrent = false;
  stateList = [
    {
      "key": "AN",
      "name": "Andaman and Nicobar Islands"
    },
    {
      "key": "AP",
      "name": "Andhra Pradesh"
    },
    {
      "key": "AR",
      "name": "Arunachal Pradesh"
    },
    {
      "key": "AS",
      "name": "Assam"
    },
    {
      "key": "BR",
      "name": "Bihar"
    },
    {
      "key": "CG",
      "name": "Chandigarh"
    },
    {
      "key": "CH",
      "name": "Chhattisgarh"
    },
    {
      "key": "DH",
      "name": "Dadra and Nagar Haveli"
    },
    {
      "key": "DD",
      "name": "Daman and Diu"
    },
    {
      "key": "DL",
      "name": "Delhi"
    },
    {
      "key": "GA",
      "name": "Goa"
    },
    {
      "key": "GJ",
      "name": "Gujarat"
    },
    {
      "key": "HR",
      "name": "Haryana"
    },
    {
      "key": "HP",
      "name": "Himachal Pradesh"
    },
    {
      "key": "JK",
      "name": "Jammu and Kashmir"
    },
    {
      "key": "JH",
      "name": "Jharkhand"
    },
    {
      "key": "KA",
      "name": "Karnataka"
    },
    {
      "key": "KL",
      "name": "Kerala"
    },
    {
      "key": "LD",
      "name": "Lakshadweep"
    },
    {
      "key": "MP",
      "name": "Madhya Pradesh"
    },
    {
      "key": "MH",
      "name": "Maharashtra"
    },
    {
      "key": "MN",
      "name": "Manipur"
    },
    {
      "key": "ML",
      "name": "Meghalaya"
    },
    {
      "key": "MZ",
      "name": "Mizoram"
    },
    {
      "key": "NL",
      "name": "Nagaland"
    },
    {
      "key": "OR",
      "name": "Odisha"
    },
    {
      "key": "PY",
      "name": "Puducherry"
    },
    {
      "key": "PB",
      "name": "Punjab"
    },
    {
      "key": "RJ",
      "name": "Rajasthan"
    },
    {
      "key": "SK",
      "name": "Sikkim"
    },
    {
      "key": "TN",
      "name": "Tamil Nadu"
    },
    {
      "key": "TS",
      "name": "Telangana"
    },
    {
      "key": "TR",
      "name": "Tripura"
    },
    {
      "key": "UK",
      "name": "Uttar Pradesh"
    },
    {
      "key": "UP",
      "name": "Uttarakhand"
    },
    {
      "key": "WB",
      "name": "West Bengal"
    }
  ];

  constructor(
    private aroute: ActivatedRoute,
    private userService: UserService,
    private locationService: LocationService,
    public commonService: CommonService,
    private storageService: StorageService,
    public homepage: HomePage,
    private connectivityservice: ConnectivityService,
  ) { }

  ngOnInit() {
    this.aroute.params.subscribe(res => {
      this.aid = res.aid;
      if (res.aid && res.aid != '0') {
        this.getSavedAddress();
      } else {
        this.getLocation();
      }
    })
    this.checkConnectivity()
  }

  ionViewWillEnter(){
    this.f.statusChanges.subscribe(res=>{
      console.log(res,this.f.dirty);
      if(this.f.dirty){
        this.commonService.addressUpdated = true;
      }
    })
  }

  ngOnDestroy(){
    this.locationService.locationGot.next(true);
  }

  checkConnectivity(){
    this.connectivityservice.connected$.subscribe(connected => {
      this.connected = connected;
    });
  }

  getSavedAddress() {
    this.userService.getAddress(this.aid).subscribe(res => {
      this.form = {
        addressType: res['data'].addressType,
        primary: res['data'].primary,
        streetAddress: res['data'].streetAddress,
        locality: res['data'].locality,
        landmark: res['data'].landmark,
        region: res['data'].locality,
        city: res['data'].city,
        state: res['data'].state,
        country: res['data'].country,
        pincode: res['data'].pincode,
        location: {
          latitude: res['data'].location.latitude,
          longitude: res['data'].location.longitude,
        }
      }
      if(this.form.location.latitude == this.storageService.getItem(Constants.USER_LOCATION)?.lat && this.form.location.longitude == this.storageService.getItem(Constants.USER_LOCATION)?.lon) {
        this.canUpdateLocalAddress = true;
      }else{
        this.canUpdateLocalAddress = false;
      }
      this.getLocation(this.form.location);
    })
  }

  getLocation(location?) {
    //Native Platform check
    if (Capacitor.isNativePlatform()) {
      this.locationService.getAcurateLocation().then(res => {
        this.locationService.getLocation().then(res => {
          this.commonService.hasCurrentLocation = false;
          this.location = {
            lat: location?location.latitude:res.coords.latitude,
            lon: location?location.longitude:res.coords.longitude
          }
          this.getAddress(this.location)
        }).catch(err => {
          this.commonService.alert('Location permission', 'Location is needed for the app to work properly, kindly go to settings and provide location permission to app.', 'Ok', 'Cancel', () => this.getLocation(), () => { });
        })
      }).catch(err => {
        this.commonService.alert('Location permission', 'Location is needed for the app to work properly, kindly go to settings and provide location permission to app.', 'Ok', 'Cancel', () => this.getLocation(), () => { });
      });
    } else {
      //map load for the local (browser)
      this.locationService.getLocation().then(res => {
        this.commonService.hasCurrentLocation = false;
        this.location = {
          lat: location?location.latitude:res.coords.latitude,
          lon: location?location.longitude:res.coords.longitude
        }
        this.getAddress(this.location)
      }).catch(err => {
        this.commonService.alert('Location permission', 'Location is needed for the app to work properly, kindly go to settings and provide location permission to app.', 'Ok', 'Cancel', () => this.getLocation(), () => { });
      })
    }
  }

  getAddress(e) {
    this.changedLocation = {
      lat: e.lat,
      lon: e.lon
    }
    this.locationService.getAddressFormLatlong(e.lat, e.lon).subscribe(
      (data) => {
        this.commonService.hasCurrentLocation = true;
        this.address = {
          address: {
            city: data['results'][0].address_components[data['results'][0].address_components.length-4].long_name,
            state: data['results'][0].address_components[data['results'][0].address_components.length-3].long_name,
            postcode: data['results'][0].address_components[data['results'][0].address_components.length-1].long_name,
            landmark: data['results'][0].address_components[data['results'][0].address_components.length-7]?.long_name,
            locality: data['results'][0].address_components[1].long_name,
          },
          display_name: data['results'][0].formatted_address,
          lat: e.lat,
          lon: e.lon
        }
        this.formatted_address = data['results'][0].formatted_address;
        // if(this.aid == '0' || this.getcurrent){
          this.form = {
            addressType:this.form.addressType,
            primary:false,
            streetAddress:this.form.streetAddress,
            locality:this.form.locality,
            landmark:this.form.landmark,
            region:this.form.locality,
            city:this.address.address.city,
            state:this.address.address.state,
            country:'India',
            pincode:this.address.address.postcode,
            location:{
              latitude:this.address.lat.toString(),
              longitude:this.address.lon.toString(),
            }
          }
        // }
        //auto clicking on input when address get's update to force update the address in inputs
        // document.getElementById('clickButton').click();
        this.autoClickfunction()
      },
      (error) => {
      }
    );
  }
  autoClickfunction() {
    document.getElementById('clickButton').click();
  }
  getFormPostalCode(event) {
    if (event.target.value.length == 6) {
      this.locationService.getFormPostalCode(event.target.value, 'India').subscribe(res => {
        if (res['results'].length) {
          this.location = {
            lat: (res['results'][0].geometry.location.lat),
            lon: (res['results'][0].geometry.location.lng),
          }
          this.getAddress(this.location)
          this.form.location={
            latitude:res['results'][0].geometry.location.lat,
            longitude:res['results'][0].geometry.location.lng,
          }
          this.getAddress(this.location)
        }else{
          this.commonService.danger('Unable to find pincode details !!')
        }
      })
    }
  }

  addAddress() {
    this.commonService.addressUpdated = false;
    this.form.region = this.form.locality;
    this.userService.addAddress(this.form).subscribe(res => {
      this.commonService.success('Address Added !!')
      let savedAddress = this.storageService.getItem(Constants.USER_SAVED_LOCATION);
      if (!savedAddress) {
        this.setGlobalLatLong();
      } else {
        history.back();
      }
    }, err => {
      this.setGlobalLatLong()
    })
  }

  editAddress() {
    this.commonService.addressUpdated = false;
    this.commonService.presentLoading();
    this.form.region = this.form.locality;
    this.userService.editAddress(this.aid, this.form).subscribe(res => {
      this.commonService.dissmiss_loading()  
      this.address = res['data'];
      this.commonService.success('Address Updated !!')
      if (this.canUpdateLocalAddress) {
        let address = {
          display_name: this.address.streetAddress + ' ' + this.address.locality + ' near ' + this.address.landmark + ' ' + this.address.region + ' ' + this.address.city + ' ' + this.address.state + ' ' + this.address.country + ' ' + this.address.pincode,
          lat: this.address.location.latitude,
          lon: this.address.location.longitude,
          addressType: this.address.addressType
        }
        this.locationService.currentLatLong = {
          lat: this.address.location.latitude,
          lon: this.address.location.longitude
        };
        this.storageService.setItem(Constants.USER_LOCATION, address)
      }
      history.back();
    })
    // setTimeout(()=>{
    // },200)
  }

  searchAddress(e) {
    console.log(e)
    this.setLatLng(e);
  }

  async setGlobalLatLong() {
    let currentAddress = {
      'display_name': this.form.streetAddress + ' ' + this.form.locality + ' near ' + this.form.landmark + ', ' + this.form.region + ', ' + this.form.city + ' ' + this.form.state + ', ' + this.form.country,
      lat: this.form.location.latitude,
      lon: this.form.location.longitude
    }
    await this.storageService.setItem(
      Constants.USER_LOCATION,
      currentAddress
    );
    this.locationService.currentLatLong = this.location
    history.back();
  }

  setLatLng(place) {
    this.location = {
      lat: place.lat,
      lon: place.lon
    };
    this.getAddress(this.location)
  }

}
