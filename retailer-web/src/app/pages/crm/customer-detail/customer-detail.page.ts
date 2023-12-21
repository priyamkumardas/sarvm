import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/lib/services/report.service';
import { CommonService } from '../../../lib/services/common.service';
import { ModalController } from '@ionic/angular';
import { InviteCustomerModalComponent } from '../components/invite-customer-modal/invite-customer-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {

  customerId: string;
  userPhoneNumber: string;
  status: string;
  sDate = moment().subtract(3,'d').format('YYYY-MM-DD');
  eDate = moment().format('YYYY-MM-DD');

  customerDetail: any;
  activeNav = '3';

  disabled = true;

  msgBody: any

  constructor(
    private route: ActivatedRoute, 
    private reportService: ReportService, 
    public commonService: CommonService,
    private modalCtrl: ModalController,
  ) { 
   
  }

  ngOnInit() {
    this.route.params.subscribe((res) => {
      this.customerId = res.customerId;
      this.userPhoneNumber = res.userPhoneNumber;
      this.status = res.userStatus;
      this.getCustomerDetail(this.sDate, this.eDate, this.customerId);
    });
  }

  getCustomerDetail(startDate, endDate, userId){

    this.reportService.getCustomerDetail(startDate, endDate, userId).subscribe((resp: any) => {

      this.customerDetail = resp.data;
      console.log(this.customerDetail);

    }, err => {
      console.log('error')
      this.commonService.danger('Failed: ' + err);
    });
  }

  activeDay(day) {
    this.activeNav = day;

    if (day == '3' || day == '5' || day == '7') {
     
      const startDate = moment().subtract(day,'d').format('YYYY-MM-DD');
      const endDate = moment().format('YYYY-MM-DD');

      console.log(startDate);
      console.log(endDate);
      this.getCustomerDetail(startDate, endDate, this.customerId);
    } else {

      const startDate = day.value;
      const endDate = moment().format('YYYY-MM-DD');
      this.getCustomerDetail(startDate, endDate, this.customerId);
    }
  }

  callCustomer(phoneNumber){
    window.location.href="tel:+91"+phoneNumber;
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

}
