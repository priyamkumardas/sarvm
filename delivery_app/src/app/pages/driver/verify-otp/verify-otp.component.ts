import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { AuthService } from 'src/app/lib/services/auth.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { ReferralService } from 'src/app/referal/referral.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {

  invalidOtp = false;
  otp: any = {
    first: '',
    second: '',
    third: '',
    fourth: '',
  };
  timer = 30;
  invalidOTPInput: boolean = true;
  interval;
  resendOtp = false;

  constructor(private modalCtrl: ModalController,
    private authService: AuthService,
    private commonService: CommonService,
    private storageservice: StorageService,
    private referalService:ReferralService,
    private platform: Platform,
    private router: Router) { }

  ngOnInit() {
    this.startTimer();
  }

  closeVerifyOtpModal() {
    this.modalCtrl.dismiss();
  }

  onOTPChange(event) {
    if (event.target.value.length == 4) {
      this.invalidOTPInput = false;
    } else {
      this.invalidOTPInput = true;
    }
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.timer = 0;
        this.resendOtp = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }

  checkAndVerifyOtp() {
    if (this.otp.first === '') {
      this.invalidOtp = true;
      console.log('Invalid otp');
    } else {
      this.verifyOtp();
      this.invalidOtp = false;
    }
  }

  verifyOtp() {
    const otpCode = Object.values(this.otp).join('');
    // const params = {
    //   phone: this.phoneNumber.toString(),
    //   otp: otpCode,
    // };
    // this.authService.verifyOtp(params).subscribe((res: any) => {
    //   if (res.success && res.data.accessToken) {
    //     this.storageservice.set(Constants.AUTH_TOKEN, res.data.accessToken);
    //     this.commonService.setUserData();
    //     this.platform.ready().then(() => {
    //       console.log('paresed token',this.commonService.parseJwt(res.data.accessToken));
    //       if (this.platform.is('cordova')) {
    //         this.referalService.setUser(this.commonService.parseJwt(res.data.accessToken).flyyUserId,this.commonService.parseJwt(res.data.accessToken).segmentId);
    //         this.referalService.setUsername(this.commonService.parseJwt(res.data.accessToken).phone);
    //       }
    //     });
    //     if (res && res.data && this.commonService.parseJwt(res.data.accessToken).shopId != null) {
    //       this.router.navigate(['/home']);
    //     } else {
    //       if (this.storageservice.getItem(Constants.SHOP_ID)) {
    //         this.router.navigate(['/home']);
    //       } else {
    //         this.router.navigate(['/select-vehicle']);
    //       }
    //     }
    //   } else if (res && res.error) {
    //     this.invalidOtp = true;
    //     this.commonService.toast(res.error.message);
    //   }
    // });
  }

}
