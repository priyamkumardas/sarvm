import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/lib/services/auth.service';
import { Constants } from 'src/app/config/constants';
import { StorageService } from 'src/app/lib/services/storage.service';
import { LocationService } from 'src/app/lib/services/location.service';
import { UserService } from 'src/app/lib/services/user.service';
import { HomePage } from '../../home/home.page';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.page.html',
  styleUrls: ['./address-list.page.scss'],
})
export class AddressListPage implements OnInit {

  ShowFrequentlyUsed:any;
  userData = this.commonService.userData;
  recenAddress = this.storageService.getItem(Constants.RECENT_LOCATION);
  address:any;
  currentAddress = this.storageService.getItem(Constants.USER_LOCATION);
  constructor(
    private authService: AuthService,
    private storageService:StorageService,
    private locationService:LocationService,
    private userService:UserService,
    public homepage:HomePage,
    private commonService:CommonService
  ) { }

  ngOnInit() {
    console.log(this.recenAddress, this.currentAddress);
    
  }

  ionViewWillEnter(){
    console.log(123, this.commonService.userData)
    this.userData = this.commonService.userData;
    this.recenAddress = this.storageService.getItem(Constants.RECENT_LOCATION);
    this.ShowFrequentlyUsed = this.authService.checkAuthStatus();
    this.recenAddress = this.storageService.getItem(Constants.RECENT_LOCATION);
    this.getAllAddress();
  }

  getAllAddress(){
    if(this.userData){
      this.commonService.presentLoading();
      this.userService.getAllAddress().subscribe(res=>{
        this.commonService.dissmiss_loading()
        console.log(res);
        this.address = res['data'];
      }, err =>{
        this.commonService.dissmiss_loading()
      })
    }
  }

  async setGlobalLatLong(address){
    this.storageService.setItem(
      Constants.USER_LOCATION,
      address
    );
    this.locationService.currentLatLong = {
      lat: address.lat,
      lon: address.lon
    };
    this.locationService.locationGot.next(true);
    history.back();
    console.log(this.storageService.getItem(Constants.USER_LOCATION))
  }
}
