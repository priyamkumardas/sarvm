import { Component, Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { CommonApi } from 'src/app/lib/services/api/common.api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Constants,ApiUrls } from '../../config/constants';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { LocationService } from 'src/app/lib/services/location.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState = new BehaviorSubject(false);
  userData;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private commonApi: CommonApi,
    public platform: Platform,
    public storgeService: StorageService,
    private navCtrl: NavController,
    private locationService: LocationService
  ) {
    this.platform.ready().then(() => {
      //this.ifLoggedIn();
    });
  }

  checkAuthStatus() {
    return this.authState.value;
  }

  ifLoggedIn() {
    var auth = this.storgeService.get(Constants.AUTH_TOKEN);
    if (auth) {
      this.authState.next(true);
      this.userData = auth;
    } else {
      this.navCtrl.setDirection('root');
      this.router.navigate(['/login']);
    }
  }

  sendOtp(phone) {
    return this.commonApi
      .postData(ApiUrls.auth.sendOtp+'/sms', phone)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  verifyOtp(otp) {
    return this.commonApi
      .postData(ApiUrls.auth.verifyOtp, otp)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  resendOtp(phone, type) {
    const url = type == 'sms' ? '/sms' : '/call';
    return this.commonApi
      .postData(ApiUrls.auth.sendOtp+url, phone)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  logOutUser(){
    let selectLang = this.storgeService.getItem(Constants.SELECT_LANGUAGES);
    let selectPref = this.storgeService.getItem(Constants.SELECT_PREFERENCE);
    let allLang = this.storgeService.getItem(Constants.ALL_LANGUAGES);
  
    localStorage.clear()
    this.commonService.setUserData();
    this.storgeService.setItem(Constants.SELECT_PREFERENCE, selectPref);
    this.storgeService.setItem(Constants.SELECT_LANGUAGES, selectLang);
    this.storgeService.setItem(Constants.ALL_LANGUAGES, allLang);
  
    this.locationService?.locationSubscription?.unsubscribe();
    this.navCtrl.setDirection('root');
    this.router.navigate(['/login']);
  }

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(jsonPayload);
    this.storgeService.set(Constants.USER_Token_data,jsonPayload);
    return JSON.parse(jsonPayload);
  };

  private errorHandler(err) {
    console.log(err);
    this.commonService.toast(err.status?err.status == 200?err.error.error ? err.error.error.message : err.error.message:err.error.error.message:'Something went wrong !!');
    return throwError(err);
  }
  
}
