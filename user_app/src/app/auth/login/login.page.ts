import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { PhoneCheck } from 'src/app/config/constants';
import { AuthService } from 'src/app/lib/services/auth.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { LocationService } from 'src/app/lib/services/location.service';
import { ReferralService } from 'src/app/referal/referral.service';
import { NavController } from '@ionic/angular';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phoneNumber: any = null;
  invalidPhone: boolean = true;
  enableSendOtp: boolean = false;
  returnURL: any;
  getAppHash: any;

  constructor(
    private platform: Platform,
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService,
    private locationService: LocationService,
    public storageservice: StorageService,
    private referalService: ReferralService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private smsRetriever: SmsRetriever,
  ) { }

  ngOnInit() {
    if (this.storageservice.getItem(Constants.AUTH_TOKEN)) {
      //const data = this.storage
      //this.router.navigate(['/tabs/home']);
    }
    // this.platform.ready().then(() => {
    //   if (this.platform.is('cordova')) {
    //     this.initFlyy();
    //     console.log('capacitor');
    //   }
    // });
    this.route.queryParams.subscribe((res) => {
      this.returnURL = res.returnUrl;
    })
    
  }

  ionViewWillEnter() {
    const token = this.storageservice.getItem(Constants.AUTH_TOKEN) ? true : false;
    // debugger
    //console.log('public graurd this.storageservice.getItem(Constants.AUTH_TOKEN)',this.storageservice.getItem(Constants.AUTH_TOKEN))
    if (token) {
      this.navCtrl.setDirection('root');
      this.router.navigate(['/tabs/home']);
      //   return false;
      // } else {
      //    return true;
    }
  }

  initFlyy() {
    this.referalService.initFlyy();
    this.referalService.setAppPackage();
    this.referalService.setThemeColor();
  }

  sendNumberForOtp(inputinfo) {
    //debugger
    this.smsRetriever.getAppHash()
    .then((res: any) => {console.log(res)
    this.getAppHash = res})
    .catch((error: any) => console.error(error));
    
    if (!inputinfo.value) return;
    const params = { phone: inputinfo.value,gethash : this.getAppHash};
    console.log(params)
    if (!this.invalidPhone) {
      this.commonService.presentLoading();
      this.authService.sendOtp(params).toPromise().then((res: any) => {
        // this.commonService.dismiss();
        if (res.success) {
          this.commonService.dissmiss_loading()
          if (res.data?.isNewUser) {
            console.log('new user ==>', res.data.isNewUser)
            this.commonService.customeAlert('Do you have', 'refferal code?',
              () => {
                this.router.navigate(['referal-qr-scan' ], {
                  queryParams: {
                    phone: params.phone,
                    returnUrl : this.returnURL 
                  }
                })
              },
              ()=>{
                this.router.navigate(['otp', btoa(JSON.stringify(inputinfo.value))], {
                  queryParams: { returnUrl: this.returnURL }
                });
              }
            );

          }
          if (!res.data?.isNewUser){
            this.router.navigate(['otp', btoa(JSON.stringify(inputinfo.value))], {
              queryParams: { returnUrl: this.returnURL }
            });
          }
        } else if (res && res.error) {
          this.commonService.dissmiss_loading()
          this.commonService.toast(res.error.message);
        }
      }, err => {
        this.commonService.dissmiss_loading()
        console.log(err);
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
  openUrl(url: string) {
    window.open(url, '_system', 'location=yes')
  }
  

}
