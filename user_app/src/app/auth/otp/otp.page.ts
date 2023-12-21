import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { AuthService } from 'src/app/lib/services/auth.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { LocationService } from 'src/app/lib/services/location.service';
import { ReferralService } from 'src/app/referal/referral.service';
import { FirebaseService } from "src/app/lib/services/firebase.service";
import { NavController } from '@ionic/angular';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
var SMSReceive: any;

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit, OnDestroy {
  phoneNumber: any;
  otp: any = {
    first: '',
    second: '',
    third: '',
    fourth: '',
  };
  timer = 30;
  interval;
  resendOtp = false;
  returnURL: any;
  data: any;
  shopId: any;
  showOTPInput: boolean = false;
  OTP: any;

  // isDisabled=true;
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private storageservice: StorageService,
    private referalService: ReferralService,
    public fcmService: FirebaseService,
    private navCtrl: NavController,
    private smsRetriever: SmsRetriever,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((res) => {
      console.log(res)
      this.phoneNumber = parseInt(JSON.parse(atob(res.phone)));
      console.log(this.phoneNumber)
    });
    this.route.queryParams.subscribe((res) => {
      this.returnURL = res.returnUrl;
      this.data = res.resultData;
    })
    this.startTimer();
      this.start()
  }

  ionViewWillEnter() {
    const token = this.storageservice.getItem(Constants.AUTH_TOKEN) ? true : false;
    if (token) {
      this.navCtrl.setDirection('root');
      this.router.navigate(['/tabs/home']);
    }
    this.getShopIdFromDymanicLink();
  }

  getShopIdFromDymanicLink(){
    this.shopId = this.data?.substring(this.data?.lastIndexOf("/") + 1, this.data?.length);
  }

  onOTPChange(event, otp2) {
    if (event.target.value.length == 4) {
      otp2.setFocus();
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

  start() {
    console.log("start")
    this.smsRetriever.startWatching()
    .then((res: any) => {console.log(res)
    this.otp.first = res.Message.substring(0,4)
  })
    .catch((error: any) => console.error(error));
  }

  verifyOtp() {
    if(this.otp.first.length == 4){
      this.commonService.presentLoading();
      const otpCode = Object.values(this.otp).join('');
      const params = {
        phone: this.phoneNumber.toString(),
        otp: otpCode,
        deviceId: this.commonService.deviceId.uuid,
        fcmToken: this.fcmService.fcmToken,
        referredBy: this.shopId,
        type: this.data
      };
      this.authService.verifyOtp(params).subscribe((res: any) => {

        if (res.success && res.data.accessToken) {
          this.commonService.dissmiss_loading()
          this.storageservice.set(Constants.AUTH_TOKEN, res.data.accessToken);
          this.storageservice.set(Constants.PROFILE_URL, res.data.body.profileUrl);
          this.commonService.setUserData();
          this.platform.ready().then(() => {
            if (this.platform.is('cordova')) {
              this.referalService.setUser(this.commonService.parseJwt(res.data.accessToken).flyyUserId, this.commonService.parseJwt(res.data.accessToken).segmentId);
              this.referalService.setUsername(this.commonService.parseJwt(res.data.accessToken).phone);
            }
          });
          if (this.returnURL) {
            this.storageservice.setItem(Constants.SELECT_PREFERENCE, 'veg'); 
            this.router.navigate([this.returnURL])

          } else {
            this.navCtrl.setDirection('root');
            this.router.navigate(['/selected-preference'])
          }
         
        } else if (res && res.error) {
          this.commonService.toast(res.error.message);
          this.commonService.dissmiss_loading()
        }
      }, err => {
        this.commonService.dissmiss_loading()
      });
    }
  }

  resendOtpFunc(type): void {
    this.commonService.present();
    const params = { phone: this.phoneNumber.toString() };
    this.authService.resendOtp(params, type).subscribe((res: any) => {
      this.commonService.dismiss();
      if (res.success) {
        this.resendOtp = false;
        this.timer = 30;
        this.startTimer()
        this.commonService.toast('OTP Resent Successfully');
      } else if (res && res.error) {
        this.commonService.toast(res.error.message);
      }
    }, err => {
      this.commonService.dismiss();
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  openUrl(url: string) {
    window.open(url, '_system', 'location=yes')
  }

}
