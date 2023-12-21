import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { CommonService } from 'src/app/lib/services/common.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { ModalController } from '@ionic/angular';
import { SupportUsPage } from '../support-us/support-us.page';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  addDisable: boolean = false;

  constructor(private ngLocation: Location,
    private router: Router,
    private iab: InAppBrowser,
    private callNumber: CallNumber,
    private modalCtrl: ModalController,
    public commonservice: CommonService) { }

  ngOnInit() {
  }

  goToFAQs() {
    this.router.navigate(['/faq']);
  }

  openBrowser(url){
    this.iab.create(url, '_system');
  }

  goToTermsCondition() {
    const browser = this.iab.create('https://sarvm.ai/terms&conditions.html');
  }

  goToPrivacyPolicies() {
    const browser = this.iab.create('https://sarvm.ai/sarvm-privacy-policy.html');
  }

  async supportUs() {
    //this.callNumber.callNumber(number,true);
    this.addDisable = true;
    const model = await this.modalCtrl.create({
      component: SupportUsPage,
      cssClass: 'delete-qr'
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.addDisable = false;
    if (data == 'Call') {
      let a = document.createElement("a");
      a.innerText = "call ";
      a.href = "tel:80958 33999";
      a.click();
    }
  }
}
