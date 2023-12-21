import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { ReferralService } from '../referral.service';
import * as _ from 'lodash';
import { ReferralRatingComponent } from '../referral-rating/referral-rating.component';

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
    private commonService: CommonService
  ) { }

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
    this.segment = '0';
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
            this.filters = this.subSegmentList[0].filter;
            this.allReferrals = this.subSegmentList[0].details;
            this.applyFilter(this.subSegmentList[0].filter[0].key, 0);
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



  sendReminder(refData: any) {
    let msgBody
    if (refData.type == 'INDIVIDUAL') {
      msgBody = this.referralService.Individual_Message_BODY
    }
    if (refData.type == 'RETAILER') {
      msgBody = this.referralService.Retailer_Message_BODY
    }
    this.referralService.sendSms(refData.phone_number, msgBody);
    // this.referralService
    //   .sendReferralReminder(refData.phone_number, refData.type)
    //   .subscribe(
    //     (res: any) => {
    //       if (res['success']) {
    //         // this.referralService.sendSms(refData.phone_number,this.referralService.Message_BODY);
    //         let msgBody
    //         if(refData.type=='INDIVIDUAL'){
    //           msgBody=this.referralService.Individual_Message_BODY
    //         }
    //         if(refData.type=='RETAILER'){
    //           msgBody=this.referralService.Retailer_Message_BODY
    //         }
    //          this.referralService.sendSms(refData.phone_number,msgBody)

    //         this.commonService.success('Reminder sent successfully!');
    //       } else {
    //         this.commonService.danger(res['error']);
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //       this.commonService.danger('You have exceeded the limit.');
    //     }
    //   );
  }

  applyFilter(filter: any, index: any) {
    //debugger
    this.selectedIndex = index;
    //this.myReffreralFilterOut(filter);
    let allReffrals = this.allReferrals;
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

  // myReffreralFilterOut(filter){

  // }

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
        referType:type,
      },
    });
    await model.present();
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
  refferalclose() {
    this.referralService.closeReferralModal();
  }
}
