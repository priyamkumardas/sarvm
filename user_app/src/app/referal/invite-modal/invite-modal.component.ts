import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReferralService } from '../referral.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StorageService } from 'src/app/lib/services/storage.service';
import { Constants } from 'src/app/config/constants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invite-modal',
  templateUrl: './invite-modal.component.html',
  styleUrls: ['./invite-modal.component.scss'],
})
export class InviteModalComponent implements OnInit {
  profileUrl: any
  queryParams: any;
  @Input() isModal: boolean;

  constructor(
    private modalCtrl: ModalController,
    public referralService: ReferralService,
    private inappBrowser: InAppBrowser,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.isModal) {
      this.queryParams = this.router.getCurrentNavigation().extras.state;
      console.log(this.queryParams)
      console.log(this.queryParams.referals)
    }
  }

  ionViewWillEnter() {
    this.profileUrl = this.storageService.getItem(Constants.PROFILE_URL) ? this.storageService.getItem(Constants.PROFILE_URL) : 'sarvm.ai'
  }

  action(arg) {
    return this.modalCtrl.dismiss(arg);
  }

  openMyRewardsModal() {
    console.log("invited via any one ")
    if (this.isModal) {
      this.modalCtrl.dismiss();
    }
    this.router.navigate(['/referal/my-referal'])
  }

  reminder(via) {
    //message body according to refferal type
    let msgBody
    if (this.queryParams.referals.type == 'INDIVIDUAL') {
      msgBody = this.referralService.Individual_Message_BODY
    } else if (this.queryParams.referals.type == 'RETAILER') {
      msgBody = this.referralService.Retailer_Message_BODY
    } else if (this.queryParams.referals.type == 'LOGISTICS_DELIVERY') {
      msgBody = this.referralService.Logistic_Message_BODY
    }
    //send sms via sms or whatsapp
    if (via == '1') {
      this.referralService.sendSms(this.queryParams.referals.phone_number, msgBody);
    } else if (via == '0') {
      let url = 'https://wa.me/' + '+91' + this.queryParams.referals.phone_number.toString() + '?text=' + msgBody;
      const inappBrowser = this.inappBrowser.create(url, '_system', 'location=no');
    }
    this.router.navigate(['/referal/my-referal'])
  }

  inviteVia(via) {
    console.log("invited via any one ")
    this.modalCtrl.dismiss(via);
  }
}
