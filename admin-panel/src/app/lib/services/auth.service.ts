import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Constants, ApiUrls } from '../../config/constants';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { CommonApi } from './api/common.api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState = new BehaviorSubject(false);
  userData: any;

  constructor(
    private router: Router,
    private commonApi: CommonApi,
    public storgeService: StorageService
  ) {
    this.ifLoggedIn()
  }

  checkAuthStatus() {
    return this.authState.value;
  }

  ifLoggedIn() {
    var auth = this.storgeService.getItem(Constants.AUTH_TOKEN);
    console.log(auth)
    if (auth) {
      this.authState.next(true);
      this.userData = auth;
    } else {
      this.authState.next(false);
      this.router.navigate(['/login']);
    }
  }

  logout() {
    //this.storgeService.set(Constants.AUTH_TOKEN, '');
    localStorage.clear();
  }

  sendOtp(phone: any) {
    return this.commonApi.postData(ApiUrls.auth.sendOtp + '/sms', phone);
  }

  verifyOtp(otp: any) {
    return this.commonApi.postData(ApiUrls.auth.verifyOtp, otp);
  }

  resendOtp(otp: any, type: any) {
    const url = type === 'sms' ? '/sms' : '/call';
    return this.commonApi.postData(ApiUrls.auth.sendOtp + url, otp);
  }

  logOutUser(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
