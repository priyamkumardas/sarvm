import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { AuthService } from 'src/app/lib/services/auth.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { OnlyNumber } from 'src/app/shared/onlynumber.directive';

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
  interval:any;
  resendOtp = false;
  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private storageservice: StorageService
  ) {
    this.route.params.subscribe((res: any) => {
      this.phoneNumber = parseInt(JSON.parse(atob(res.phone)));
    });
  }

  ngOnInit() {
    this.startTimer();
 
  }
  // forFocus()
  // {
  //   document.getElementById("txt1").focus();
  // }
  ionViewWillEnter() {
    const token = this.storageservice.getItem(Constants.AUTH_TOKEN)
      ? true
      : false;
    // debugger
    //console.log('public graurd this.storageservice.getItem(Constants.AUTH_TOKEN)',this.storageservice.getItem(Constants.AUTH_TOKEN))
    if (token) {
      this.router.navigate(['home']);
      //   return false;
      // } else {
      //    return true;
    }
  }
  move(event:any, prev:any, curr:any, next:any)
  {
   var len=curr.value.length;
   var maxlen=curr.getAttribute('maxlength');
   if(len==maxlen)
   {
     if(next!="")
     next.focus();
   }
   if(event.key=="Backspace")
   {
     prev.focus();
   }
  }
  onOtpChange(event:any)
  {
    
  }
  onOTPChange(event: any, otp2: any) {
    if (event.target.value.length == 4) {
      otp2.setFocus();
    }
  }

  checkAndVerifyOtp(): void {
    if (this.otp.first === '' || this.otp.second === '' || this.otp.third==='' || this.otp.fourth==='') {
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
    };
    this.authService.verifyOtp(params).subscribe((res: any) => {
      if (res.success && res.data.accessToken) {
        this.storageservice.set(Constants.AUTH_TOKEN, res.data.accessToken);
        this.authService.authState.next(true)
        this.router.navigate(['/home']);
        
      } else if (res && res.error) {
        this.invalidOtp = true;
      }
    });
  }

  resendOtpFunc(type: any): void {
    
    this.resendOtp = false;
    this.timer = 30;
    const params = { phone: this.phoneNumber.toString() };
    this.authService.resendOtp(params, type).subscribe((res: any) => {
      if (res.success) {
        // this.startTimer();
      } else if (res && res.error) {
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);

  }
}
