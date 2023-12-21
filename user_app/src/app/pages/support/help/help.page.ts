import { Component, OnInit } from '@angular/core';
import { windowWhen } from 'rxjs/operators';
import { CommonService } from '../../../lib/services/common.service';
import { SupportPage } from 'src/app/pages/order/support/support.page';
import { ModalController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  order: any;
  addDisable: boolean = false;

  constructor(
    public commonservice: CommonService, private modalCtrl: ModalController, private inAppBrowser: InAppBrowser,
  ) { }

  ngOnInit() {
    console.log("help")

  }

  async support() {
    this.addDisable = true;
    const model = await this.modalCtrl.create({
      component: SupportPage,
      cssClass: 'OtpBox-AddMember'
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
  openUrl(url: string) {
    window.open(url, '_system', 'location=yes')
  }
  // openUrl1(url: string) {
  //   window.open(url, '_system', 'location=yes')
  // }
  openBrowser(url){
    this.inAppBrowser.create(url, '_system');
  }
}

