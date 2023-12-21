import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ReferralService } from '../referral.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StorageService } from 'src/app/lib/services/storage.service';
import { Constants } from 'src/app/config/constants';
import { CommonService } from 'src/app/lib/services/common.service';
import { OnboardService } from 'src/app/lib/services/onboard.service';
@Component({
  selector: 'app-invite-modal',
  templateUrl: './invite-modal.component.html',
  styleUrls: ['./invite-modal.component.scss'],
})
export class InviteModalComponent implements OnInit {
  @Input() inviteCategory
  @Input() mobileNumber
  profileUrl: any;
  msgBody: any;
  shopId: any;

  constructor(
    private modalCtrl: ModalController,
    public referralService: ReferralService,
    private alertController: AlertController,
    private inappBrowser: InAppBrowser,
    private storageService: StorageService,
    public commonservice: CommonService,
    private onboardService: OnboardService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.inviteType()
    this.getShopOwnerDetails()
  }

  getShopOwnerDetails() {
    this.shopId = this.commonservice.getUserData() && this.commonservice.getUserData().shopId
      ? this.commonservice.getUserData().shopId : this.storageService.getItem(Constants.SHOP_ID);
    /**
     * @function Profile function is being called
     */
    this.commonservice.presentProgressBarLoading()
    this.onboardService.getShopOwnerDetails(this.shopId ? this.shopId : null).subscribe((shopDetails: any) => {
      this.commonservice.closeProgressBarLoading()
      this.profileUrl = shopDetails.data.shop.profileUrl;
      this.storageService.setItem(Constants.PROFILE_URL, this.profileUrl);
      console.log("profil",this.profileUrl);
      
    }, error => {
      this.commonservice.closeProgressBarLoading()
      console.log(error)
      this.commonservice.danger(error.error?.error?.message)
    });
  }

  inviteType() {
    console.log(this.inviteCategory, this.mobileNumber , 'inviteCategory');
    if (this.inviteCategory == 'INDIVIDUAL') {
      this.msgBody = this.referralService.Individual_Message_BODY
    }
    if (this.inviteCategory == 'RETAILER') {
      this.msgBody = this.referralService.Retailer_Message_BODY
    }
    if (this.inviteCategory == 'LOGISTICS_DELIVERY') {
      this.msgBody = this.referralService.Logistic_Message_BODY
    }
    console.log(this.msgBody)
  }

  inviteVia(data) {
    console.log(data)
    if (data == '1') {
      this.inviteType()
      this.showConfirm();
    }
    if (data == '0') {
      this.inviteType()
      let url = 'https://wa.me/' + '+91'+this.mobileNumber.toString() + '?text=' + this.msgBody;
      const inappBrowser = this.inappBrowser.create(url, '_system', 'location=no');
      this.openMyRewardsModal();
    }
  }

  action(arg) {
    return this.modalCtrl.dismiss(arg);
  }

  showConfirm() {
    this.alertController.create({
      header: 'Send Referral Invite',
      subHeader: 'Carrier SMS charges may apply',
      message: 'Are you sure? You want to send referral invite to this number?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('I care about humanity');
          },
        },
        {
          text: 'Yes!',
          handler: () => {
            // this.sms.send(this.mobileNumber, 'Hello world!');
            this.referralService.sendSms(this.mobileNumber, this.msgBody)
            this.openMyRewardsModal();
          },
        },
      ],
    }).then((res) => {
      res.present();
    });
  }
  openMyRewardsModal() {
    console.log("invited via any one ")
    this.modalCtrl.dismiss();
    // this.referralService.closeReferralModal();
    this.referralService.openMyRewardsModal();
  }
}
