import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/lib/services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StorageService } from 'src/app/component/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted = false;
  mobileNumber: any;
  showMenu = false;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loader: NgxUiLoaderService,
    private storage: StorageService,
  ) {

    // const token = this.storage.getItem(Constants.AUTH_TOKEN) ? true : false;

    // if(token){
    //   this.showMenu = true
    // }
    // else{
    //   this.showMenu = false
    // }

  }

  login = this.formBuilder.group({
    mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]]
  })


  validateForm(){
    this.isSubmitted = true;
    if (!this.login.valid) {
      return false;
    }

    else{
      this.onSubmit();
      return true;
    }
  }



 async onSubmit() {

  await this.loader.start();

      const request = { phone: this.mobileNumber }

      this.authService.sendOtp(request).subscribe((response: any) => {
        if (response.success) {
          this.loader.stop();
          this.router.navigate(['otp']);
          localStorage.setItem('phonenumber', this.mobileNumber)
        }
        else {
          this.loader.stop()
          // this.toaster.error(response.error.message);
        }

      },
      (error)=>{
        this.loader.stop()
          }
      );



  }



  ngOnInit(): void {
    this.showMenu = false;
  }

}
