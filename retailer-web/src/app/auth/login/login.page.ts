import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from 'src/app/config/constants';
import { PhoneCheck } from 'src/app/config/constants';
import { AuthService } from 'src/app/lib/services/auth.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { SelectedLanguagePage } from 'src/app/pages/selected-language/selected-language.page';
import { ModalController } from '@ionic/angular';
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
    private commonService: CommonService,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) {}  

  ngOnInit() {
    if (localStorage.getItem(Constants.AUTH_TOKEN)) {
      //const data = this.storage
    }
    this.languageModal();
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
  openUrl(url: string) {
    window.open(url, '_system', 'location=yes')
  }

  //Modal
  async languageModal() {
    const modal = await this.modalCtrl.create({
      component: SelectedLanguagePage,
      mode: 'ios',
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
}
