import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { AuthService } from 'src/app/lib/services/auth.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { FirebaseService } from 'src/app/lib/services/firebase.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { ReferralService } from 'src/app/referal/referral.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit, OnDestroy {
  phoneNumber: any;
  invalidOtp = false;
  otp: any = {
    first: '',
    second: '',
    third: '',
    fourth: '',
  };
  timer = 30;
  interval;
  resendOtp = false;
  profileUrl: any

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private storageservice: StorageService,
    private referalService: ReferralService,
    private firebaseService: FirebaseService
  ) {
    this.route.params.subscribe((res) => {
      this.phoneNumber = parseInt(JSON.parse(atob(res.phone)));
    });
  }

  ngOnInit() {
    this.startTimer();
  }

  ionViewWillEnter() {
    const token = this.storageservice.getItem(Constants.AUTH_TOKEN) ? true : false;
    // debugger
    //console.log('public graurd this.storageservice.getItem(Constants.AUTH_TOKEN)',this.storageservice.getItem(Constants.AUTH_TOKEN))
    if (token) {
      this.router.navigate(['home']);
      //   return false;
      // } else {
      //    return true;
    }
  }

  onOTPChange(event, otp2) {
    if (event.target.value.length == 4) {
      otp2.setFocus();
    }
  }

  checkAndVerifyOtp(): void {
    if (
      this.otp.first === ''
    ) {
      this.invalidOtp = true;
      console.log('Invalid otp');
    } else {
      this.verifyOtp();
      this.invalidOtp = false;
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

  // pauseTimer() {
  //   clearInterval(this.interval);
  //   this.timer = 60;
  // }

  verifyOtp() {
    const otpCode = Object.values(this.otp).join('');
    const params = {
      phone: this.phoneNumber.toString(),
      otp: otpCode,
      deviceId: this.commonService.deviceId.uuid,
      fcmToken: this.firebaseService.fcmToken,
    };
    this.authService.verifyOtp(params).subscribe((res: any) => {
      if (res.success && res.data.accessToken) {
        this.storageservice.set(Constants.AUTH_TOKEN, res.data.accessToken);
        this.commonService.setUserData();
        this.platform.ready().then(() => {
          console.log('paresed token', this.commonService.parseJwt(res.data.accessToken));
          if (this.platform.is('cordova')) {
            this.referalService.setUser(this.commonService.parseJwt(res.data.accessToken).flyyUserId, this.commonService.parseJwt(res.data.accessToken).segmentId);
            this.referalService.setUsername(this.commonService.parseJwt(res.data.accessToken).phone);
          }
        });
        if (res && res.data && this.commonService.parseJwt(res.data.accessToken).shopId) {
          this.router.navigate(['/home']);
        } else {
          if (this.storageservice.getItem(Constants.SHOP_ID)) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/selling-mode']);
          }
        }
      } else if (res && res.error) {
        this.invalidOtp = true;
      }
    });
  }

  resendOtpFunc(type): void {
    this.commonService.presentLoading();
    const params = { phone: this.phoneNumber.toString() };
    this.authService.resendOtp(params, type).subscribe((res: any) => {
      this.commonService.dissmiss_loading();
      if (res.success) {
        this.resendOtp = false;
        this.timer = 30;
        this.startTimer()
        this.commonService.toast('OTP resent successful');
      } else if (res && res.error) {
        this.commonService.toast(res.error.message);
      }
    }, error => {
      this.commonService.dissmiss_loading();
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  openUrl(url: string) {
    window.open(url, '_system', 'location=yes')
  }
}
