import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/lib/services/report.service';
import { CommonService } from '../../../lib/services/common.service';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController, LoadingController } from '@ionic/angular';
import { ReferralRatingComponent } from 'src/app/referal/referral-rating/referral-rating.component';
import { InviteModalComponent } from 'src/app/referal/invite-modal/invite-modal.component';
import { InviteCustomerModalComponent } from '../components/invite-customer-modal/invite-customer-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  segment: string;
  customers: string;
  newSegment: string;

  sDate = moment().subtract(3, 'd').format('YYYY-MM-DD');
  eDate = moment().format('YYYY-MM-DD');

  allCustomers: any;
  allNewCustomers: any;
  activeNav = '3';
  selectedIndx = 0;
  filters: any = [];

  selectedIndex: number = 0;
  allReferrals: any = [];
  myReferrals: any = [];
  rewardsEarned: any;
  subSegmentList = [];
  selectedSub = 1;

  selectedCustomers = [];
  selectedCustomerPhone = [];
  disabled = true;

  msgBody: any

  constructor(
    private reportService: ReportService,
    public commonService: CommonService,
    private router: Router,
    private inappBrowser: InAppBrowser,
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
  ) {
    this.segment = "1";
    this.customers = "new";
    this.newSegment = 'incomplete'
  }

  segmentChanged(ev: any) {
  }

  ngOnInit() {
    this.getExixtingCustomers(this.sDate, this.eDate);
  }

  ionViewWillEnter() {
    this.segment = '1';
    this.getMyReferrals();
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  // Send push notifiction to each number
  sendNotification(){
    this.selectedCustomerPhone.forEach((phone) => {
      this.pushNotification(phone);
    });
  }

  async pushNotification(phoneNumber) {
    //Modal START
    const modal = await this.modalCtrl.create({
      component: InviteCustomerModalComponent,
      cssClass: 'bottomModal',   
      componentProps: {
        userPhone: phoneNumber,
      },   
    });
    modal.present();
  }

  callCustomer(phoneNumber){
    window.location.href="tel:+91"+phoneNumber;
  }

  getExixtingCustomers(startDate, endDate) {

    this.reportService.getAllExistingCustomers(startDate, endDate).subscribe((resp: any) => {

      console.log(resp);

      if (resp.data) {
        console.log('Success');
        this.allCustomers = resp?.data?.topCustomer?.customers;
      }

    }, err => {
      console.log('error')
      this.commonService.danger('Failed: ' + err);
    });
  }

  activeDay(day) {
    this.activeNav = day;
    if (day == '3' || day == '5' || day == '7') {

      const startDate = moment().subtract(day, 'd').format('YYYY-MM-DD');
      const endDate = moment().format('YYYY-MM-DD');

      this.getExixtingCustomers(startDate, endDate);
    } else {
      const startDate = day.value;
      const endDate = moment().format('YYYY-MM-DD');
      this.getExixtingCustomers(startDate, endDate);
    }
  }

  chooseCustomer(customer, phone) {
    this.disabled = false;

    if (this.selectedCustomers.filter(res => res === customer).length) {
      let categoryExistsIndexID = this.selectedCustomers.filter(res => res != customer)
      this.selectedCustomers = categoryExistsIndexID
    } else {
        this.selectedCustomers.push(customer)
    }

    // Get all customer numbers
    if (this.selectedCustomerPhone.filter(res => res === phone).length) {
      let customerExistsPhone = this.selectedCustomerPhone.filter(res => res != phone)
      this.selectedCustomerPhone = customerExistsPhone
    } else {
        this.selectedCustomerPhone.push(phone)
    }

    // Disable push notification button if checkbox is unselected
    if(this.selectedCustomers.length == 0){
      this.disabled = true;
    }
  }

  customerDetails(customerId, userPhoneNumber, userStatus) {
    this.router.navigate(['/customer-detail', customerId, userPhoneNumber, userStatus]);
  }

  applyFilter(filter: any, index: any) {
    this.selectedIndex = index;
    let allReffrals = this.allReferrals;
    if (filter != "ratings") {
      //this.myReffreralFilterOut(filter);
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

  async referralRating(number: any, type: string) {
    const model = await this.modalCtrl.create({
      component: ReferralRatingComponent,
      cssClass: 'DeliveryDayPreference-component-css',
      componentProps: {
        //isModal: true,
        phoneNumber: number,
        referType: type,
      },
    });
    await model.present();
    model.onDidDismiss().then((data) => {
      this.getMyReferrals();
    });
    // this.referralService.openRferralRating(number,type);
    // this.reportService.openRferralRating(number,type);
  }

  async getMyReferrals() {
    const loading = await this.loadingController.create({
      mode: 'ios',
      spinner: 'circles',
      message: 'Please wait...',
    });
    this.presentLoading(loading);

    this.reportService.myReferralsList().subscribe(
      (res: any) => {
        if (res && res.data) {
          this.rewardsEarned = res['data']['total_reward_recieved'];
          this.subSegmentList = res.data.types ? res.data.types : [];
          if (this.subSegmentList.length) {

            console.log("subSegmentList", this.subSegmentList);
            // this.filters = this.subSegmentList[this.selectedSub].filter;

            this.filters = this.subSegmentList[this.selectedSub].filter.filter(obj => obj.key ===
              'all' || obj.key === 'order' || obj.key === 'signup' || obj.key === 'ratings');

            this.allReferrals = this.subSegmentList[this.selectedSub].details;
            this.applyFilter(this.subSegmentList[this.selectedSub].filter[0].key, 0);
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
      msgBody = this.reportService.Individual_Message_BODY
    }
    if (refData.type == 'RETAILER') {
      msgBody = this.reportService.Retailer_Message_BODY
    }
    const modal = await this.modalCtrl.create({
      component: InviteModalComponent,
      cssClass: 'DeliveryDayPreference-component-css',
      componentProps: {
        mobileNumber: refData.phone_number,
        inviteCategory: refData.type
      },
    });
    modal.present();
    modal.onDidDismiss().then((data) => {
      // this.number = data.data.number;
      if (data.data == '1')
        this.reportService.sendSms(refData.phone_number, msgBody);
      else if (data.data == '0') {
        console.log("whatsapp intent must be called here");
        console.log(refData.phone_number);
        console.log("inviting via whatsapp");
        let url = 'https://wa.me/'+'+91'+ refData.phone_number.toString() + '?text=' + msgBody;
	      const inappBrowser = this.inappBrowser.create(url, '_system', 'location=no');
      }
    });
  }
}
