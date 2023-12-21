import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { ReferralService } from '../referral.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userId: any = 1; // this will be changed when login is done & actual user id will be there
  referred: any;
  acknowledged: any;
  signedUp: any;
  order: any;
  profileComplete: any;
  maxReward: any;
  base64Url: any
  refCode: any;
  profileUrl: any;
  addDisable: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    private referralService: ReferralService,
    public commonservice: CommonService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.commonservice.userData.phone)
    this.getMyReferrals();
  }

  ionViewWillEnter() {
    this.profileUrl = this.storageService.getItem(Constants.PROFILE_URL) ? this.storageService.getItem(Constants.PROFILE_URL) : 'sarvm.ai'
    console.log(this.profileUrl)
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  async getMyReferrals() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    this.presentLoading(loading);
    this.referralService.myReferralsList().subscribe(
      (res: any) => {
        this.refCode = res.data.ref_code
        this.referred = parseInt(res['data']['users_invited']) / 100;
        this.acknowledged = parseInt(res['data']['acknowledged']) / 100;
        this.signedUp = parseInt(res['data']['signedup']) / 100;
        this.order = parseInt(res['data']['first_order_completed']) / 100;
        this.profileComplete = parseInt(res['data']['profile_completed']) / 100;
        this.maxReward = res['data']['max_reward'];
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async shareQr() {
    this.addDisable = true;
    let appLink = environment.sarvmAllApps.publicPage
    let Userapplink = 'https://play.google.com/store/apps/details?id=com.sarvm.hh&hl=en-US&ah=uI6maScqUW8bclH7s_fV8-tJw58';
    // const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    // this.base64Url = canvas.toDataURL('image/jpeg')
    let message = `Hey! Check out SarvM.AI, an app digitizing the food supply chain. Download the app now  ${appLink}. Use my QR code for referral. 'My Contact number : ${this.commonservice.userData.phone}`
    let link = this.profileUrl;
    this.commonservice.shareQr(message, link, true).then(res => {
      this.addDisable = false;
    })
    console.log(message)
    console.log(link)
  }

  downloadQr() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg')
    this.commonservice.savePicture(imageData, this.refCode)
  }

  openInviteModal() {
    this.router.navigate['/referal/invite-referal']
  }

  openMyRewardsModal() {
    this.router.navigate['/referal']
  }

  action() {
    return this.modalCtrl.dismiss();
  }
}
