import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/lib/services/auth.service';
import { Constants } from 'src/app/config/constants';
import { StorageService } from 'src/app/lib/services/storage.service';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {


  phoneNumber: any;
  invalidOtp = false;
  otp: any = {
    first: '',
    second: '',
    third: '',
    fourth: '',
  };
  timer = 30;
  interval: any;
  resendOtp = false;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router,
    private loader: NgxUiLoaderService,
    private storageservice: StorageService,

  ) {
    this.getPhoneNumber();
    console.log(this.getPhoneNumber());
   }


   getPhoneNumber(){
    const number =  localStorage.getItem('phonenumber')
  this.phoneNumber = JSON.stringify(number);
  }

  otpController(event:any, next:any, prev:any) {

    if (event.target.value.length < 1 && prev) {
      prev.focus();
    }
    else if (next && event.target.value.length > 0) {
      next.focus();
    }
    else {
    }
  }

  checkverifyOtp(){
    if(Object.values(this.otp).every(value => !!value)){
      return false;
    }
    else{
      return true;

    }
}


async verifyOtp() {

await this.loader.start();


  const otpCode = Object.values(this.otp).join('')
   const request = {
    phone: JSON.parse(this.phoneNumber),
    otp: otpCode,
  };

  this.authService.verifyOtp(request).subscribe((response: any) => {


    if (response.success && response.data.accessToken) {
      this.loader.stop();
      this.storageservice.set(Constants.AUTH_TOKEN, response.data.accessToken);
      this.authService.authState.next(true)
      this.router.navigate(['/home']);
      window.location.reload();
  }

    else {
      this.loader.stop()
    }


},

(error)=>{
  this.loader.stop()
    }
);




}






  ngOnInit(): void {
  }

}
