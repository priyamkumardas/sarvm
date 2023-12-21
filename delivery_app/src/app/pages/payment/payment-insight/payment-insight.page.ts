import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PaymentService } from 'src/app/lib/services/payment.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { DateTimePickerComponent } from 'src/app/components/date-time-picker/date-time-picker.component';
import { Router } from '@angular/router';
export enum OrderStatus {
  Today = 'TODAY',
  Thisweek = 'THIS_WEEK',
  Thismonth = 'THIS_MONTH',
}

@Component({
  selector: 'app-payment-insight',
  templateUrl: './payment-insight.page.html',
  styleUrls: ['./payment-insight.page.scss'],
})
export class PaymentInsightPage implements OnInit {

  statusSegment = OrderStatus.Today;
  segment = 'TODAY';
  allPaymentsInsights: any = [];
  defaultDate = moment().format('YYYY-MM-DD');
  format = 'YYYY-MM-DD';
  displayDateFormate: any;
  allGroupByPaymentFilter: any = [];
  paymentStatus
  allPaymentsInsight

  constructor(private ngLocation: Location,
    private paymentService: PaymentService,
    private commonService: CommonService,
    private modalCtrl: ModalController,
    private router: Router) { }

  ngOnInit() {
    this.getAllPaymentsInsights(this.segment);
    this.openDateSelectModalInit();
  }

  getAllPaymentsInsights(segmentType: any) {
    //this.commonService.present();
    this.paymentService.getPaymentsInsights(segmentType).subscribe((res: any) => {
      //this.commonService.dismiss();
      if ((res?.success) && (res?.data && res?.data?.length != 0)) {
        this.allPaymentsInsights = res.data;
        console.log(this.allPaymentsInsights);
      }
    }, (error) => {
      //this.commonService.dismiss();
      //this.commonService.danger(error.message);
    });
  }

  segmentChanged(e) {
    this.segment = e.detail.value;
    console.log(this.segment);
    if(this.segment != 'customdate'){
      this.getAllPaymentsInsights(this.segment);
    }
  }

  getSendPaymentReminderRetailer(tripId: any){
    if(tripId != undefined && tripId != null && tripId != ""){
      //this.commonService.present();
      this.paymentService.sendPaymentReminder(tripId).subscribe((res: any) => {
        this.commonService.toast("Reminder Sent");
      }, (error) => {
        //this.commonService.dismiss();
        //this.commonService.danger(error?.error?.error?.message);
      });
    }
  }

  /* async openDateSelectModal() {
    const modal = await this.modalCtrl.create({
      component: DateTimePickerComponent,
      cssClass: 'gst-modal-css',
      componentProps: { isModal: false, date_format: "YYYY-MM-DD" }
    });
    await modal.present();
    await modal.onDidDismiss().then((modelData: any) => {
      //console.log(modelData);
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        this.defaultDate = modelData.data.value;
        let fillDate = new Date(moment(this.defaultDate).format("YYYY-MM-DD")).toISOString();
        if(this.segment === 'customdate'){
          this.displayDateFormate = moment(fillDate).format('Do MMMM YYYY');
          this.getAllPaymentsInsights(fillDate);
        }
        console.log('Modal Data : ' + modelData);
      }
    });
  } */

  async openDateSelectModal(selectType) {
    if (selectType !== null && selectType !== undefined && selectType !== ""  && selectType.value != "" && selectType.value != undefined) {
      this.defaultDate = selectType.value;
      let fillDate = new Date(moment(this.defaultDate).format("YYYY-MM-DD")).toISOString();
      if(this.segment === 'customdate'){
        this.displayDateFormate = moment(fillDate).format('Do MMMM YYYY');
        this.getAllPaymentsInsights(fillDate);
      }
      console.log('Modal Data : ' + selectType);
    }
  }

  async openDateSelectModalInit() {
    const modal = await this.modalCtrl.create({
      component: DateTimePickerComponent,
      cssClass: 'gst-modal-css',
      //[formType]="'paymentinsight'" [value]="defaultDate" [date_format]="format"
      componentProps: { isModal: false, formType:"paymentinsight", date_format: "YYYY-MM-DD" }
    });
  }

  applyFilter(pmt_status) {
    this.paymentStatus = pmt_status;
    this.allPaymentsInsight = this.allPaymentsInsights;
    console.log("applying filter", pmt_status);
    let paymentHistory = this.allPaymentsInsights?.history.filter((pmt)=> { 
      return pmt.status == pmt_status;
    })
    console.log(paymentHistory);
    
    // this.allPaymentsInsights.history = paymentHistory;
  // console.log(this.allPaymentsInsights)
    
  }
 
}
