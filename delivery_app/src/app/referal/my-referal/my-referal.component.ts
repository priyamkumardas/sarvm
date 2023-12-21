import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController, ToastController, LoadingController, Platform, IonRouterOutlet } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { ReferralService } from '../referral.service';
import * as _ from 'lodash';
import { ReferralRatingComponent } from '../referral-rating/referral-rating.component';
import { InviteReferModalComponent } from '../invite-refer-modal/invite-refer-modal.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Optional } from '@angular/core';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-my-referal',
  templateUrl: './my-referal.component.html',
  styleUrls: ['./my-referal.component.scss'],
})
export class MyReferalComponent implements OnInit {

  segment;
  userId: any = 1; // this will be changed when login is done & actual user id will be there
  myReferrals: any = [];
  allReferrals: any = [];
  rewardsEarned: any;
  selectedIndex: number = 0;
  subSegmentList = [];
  subSegment;
  selectedSubIndex: number = 2;
  selectedSub = 0;
  filters: any = [];
  phoneNumber: any;
  userCategoryrefferals: any;
  constructor(
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    public referralService: ReferralService,
    private commonService: CommonService,
    private inappBrowser: InAppBrowser,) {
  }

  ngOnInit() { }

  segmentChanged(ev: any) {
    this.subSegment = '2';
  }

  userCategorySegmentChange(e: any) {
    this.selectedSub = +e.detail.value;
    this.filters = this.subSegmentList[this.selectedSub].filter;
    this.selectedIndex = 0;
    //this.myReferrals = this.subSegmentList[this.selectedSub].details;
    this.allReferrals = this.subSegmentList[this.selectedSub].details;
    this.applyFilter(this.subSegmentList[this.selectedSub].filter[0].key, 0)
  }

  ionViewWillEnter() {
    this.segment = '1';
    this.getMyReferrals();
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
        if (res && res.data) {
          this.rewardsEarned = res['data']['total_reward_recieved'];
          this.subSegmentList = res.data.types ? res.data.types : [];
          if (this.subSegmentList.length) {
            this.filters = this.subSegmentList[this.selectedSub].filter;
            this.allReferrals = this.subSegmentList[this.selectedSub].details;
            this.applyFilter(this.subSegmentList[this.selectedSub].filter[this.selectedIndex ? this.selectedIndex : 0].key, this.selectedIndex ? this.selectedIndex : 0);
          }
          loading.dismiss();
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
        this.commonService.toast(err);
      }
    );
  }

  async sendReminder(refData: any) {
    let msgBody
    if (refData.type == 'INDIVIDUAL') {
      msgBody = this.referralService.Individual_Message_BODY
    }
    if (refData.type == 'RETAILER') {
      msgBody = this.referralService.Retailer_Message_BODY
    }
    if (refData.type == 'LOGISTICS_DELIVERY') {
      msgBody = this.referralService.Logistics_Message_BODY
    }
    const modal = await this.modalCtrl.create({
      component: InviteReferModalComponent,
      cssClass: 'DeliveryDayPreference-component-css',
      componentProps: {
        //isModal: true,
      },
    });
    modal.present();
    modal.onDidDismiss().then((data) => {
      // this.number = data.data.number;
      console.log(data);
      if (data.data == '1')
        this.referralService.sendSms(refData.phone_number, msgBody);
      else {
        console.log("whatsapp intent must be called here");
        console.log(refData.phone_number);
        console.log("inviting via whatsapp");
        let url = 'https://wa.me/' + '+91' + refData.phone_number.toString() + '?text=' + msgBody;
        console.log(url)
        const inappBrowser = this.inappBrowser.create(url, '_system', 'location=no');
      }
    });
  }

  applyFilter(filter: any, index: any) {
    this.selectedIndex = index;
    let allReffrals = this.allReferrals;
    if (filter != "ratings") {
      console.log(this.allReferrals)
      this.myReferrals = allReffrals.filter((v: any) => {

        if (
          v.stages.some(
            (stg) => stg.name.toLowerCase() === filter.toLowerCase() && stg.value
          )
        ) {
          return v;
        }
      });
    }
    else {
      allReffrals.sort(function (a, b) {
        return (a.ratings > b.ratings ? 1 : ((a.ratings < b.ratings) ? -1 : 0));
      });
      allReffrals.reverse();
      this.myReferrals = allReffrals;
    }
  }


  action(arg) {
    this.segment = '0';
    return this.modalCtrl.dismiss(arg);
  }

  async referralRating(number: any, type: string) {
    const model = await this.modalCtrl.create({
      component: ReferralRatingComponent,
      cssClass: 'DeliveryDayPreference-component-css',
      componentProps: {
        isModal: true,
        phoneNumber: number,
        referType: type,
      },
    });
    await model.present();

    model.onDidDismiss().then((data) => {
      this.getMyReferrals();
    });
  }

  searchNumber() {
    let tempdata = this.myReferrals;
    if (this.myReferrals) {
      if (this.phoneNumber !== '') {
        this.myReferrals = tempdata.filter(res => res.masked_phone_number.includes(this.phoneNumber.toLowerCase()))
      }
      else {
        this.applyFilter(this.subSegmentList[this.selectedSub].filter[0].key, 0)
      }
    } else {
      this.applyFilter(this.subSegmentList[this.selectedSub].filter[0].key, 0)
    }
  }

  // openMyRewardsModal() {
  //   this.referralService.openMyRewardsModal();
  // }

  refferalclose() {
    this.referralService.closeReferralModal();
  }
}
