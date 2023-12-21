import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Constants } from 'src/app/config/constants';
import { PhoneCheck } from 'src/app/config/constants';
import { AuthService } from 'src/app/lib/services/auth.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phoneNumber: any = null;
  invalidPhone: boolean = true;
  enableSendOtp: boolean = false;

  constructor(
    private router: Router,
    private ngLocation: Location,
    private commonService: CommonService,
    private authService: AuthService,
    private iab: InAppBrowser
  ) {}

  ngOnInit() {
    // if (localStorage.getItem(Constants.AUTH_TOKEN)) {
    //   //const data = this.storage
    // }
  }

  sendNumberForOtp(inputinfo) {
    if (!inputinfo.value) return;
    const params = { phone: inputinfo.value };
    if (!this.invalidPhone) {
      this.commonService.presentLoading()
      this.authService.sendOtp(params).subscribe((res: any) => {
        if (res.success) {
          this.commonService.dissmiss_loading()
          this.router.navigate(['otp', btoa(JSON.stringify(inputinfo.value))]);
        } else if (res && res.error) {
          this.commonService.dissmiss_loading()

          this.commonService.toast(res.error.message);
        }
      });
    }
  }

  validatePhone(e) {
    this.invalidPhone = !PhoneCheck(this.phoneNumber);
  }

  agree(e) {
    this.enableSendOtp = e.currentTarget.checked;
  }

  isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
    } else {
      return true;
    }
  }

  onBack() {
    this.ngLocation.back();
  }

  goToHelp(){
    this.router.navigate(['/help']);
  }

  openUrl(url: string) {
    const browser = this.iab.create(url);
  }
}
