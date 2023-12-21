import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { OrderAddressComponent } from 'src/app/components/order-address/order-address.component';
import { DateTimePickerComponent } from 'src/app/components/date-time-picker/date-time-picker.component';
import { PaymentService } from 'src/app/lib/services/payment.service';
import { CommonService } from 'src/app/lib/services/common.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.page.html',
  styleUrls: ['./trip-history.page.scss'],
})
export class TripHistoryPage implements OnInit {

  orderStatus = "all";
  filterSegment = '';
  searchLang: any = '';

  ordersDataTripHistory: any = [];
  allTripHistory: any = [];
  defaultDate = moment().format('YYYY-MM-DD');
  format = 'YYYY-MM-DD';
  initiallyDefinedDate;
  isOrderAddressDialog: boolean = false;

  constructor(private ngLocation: Location,
    private paymentService: PaymentService,
    private commonService: CommonService,
    private modalCtrl: ModalController,
    private router: Router) {
      this.filterSegment = '';
    }

  ngOnInit() {
    /* this.filterSegment = '';
    this.getAllTripHistory(); */
  }

  ionViewWillEnter(){
    this.filterSegment = '';
    this.getAllTripHistory();
    //this.initiallyDefinedDate = this.defaultDate;
  }

  getAllTripHistory() {
    this.ordersDataTripHistory = [];
    this.allTripHistory = [];
    this.commonService.present();
    this.paymentService.getTripHistory().subscribe((res: any) => {
      this.commonService.dismiss();
      if ((res?.success) && (res?.data && res?.data?.length != 0)) {

        this.ordersDataTripHistory = res.data;
        this.allTripHistory = res.data;
        console.log(this.allTripHistory);
      }
    }, (error) => {
      this.commonService.dismiss();
      this.commonService.danger(error);
    });
  }


  searchFunction() {
    if(this.searchLang != "" && this.searchLang != undefined && this.searchLang != null){
      this.ordersDataTripHistory = this.allTripHistory.filter((lang) => {
        if(this.orderStatus != 'all') {
          if(this.orderStatus == lang.status) {
            if (lang.orderId.toLowerCase().includes(this.searchLang.toLowerCase())) {
              return lang;
            }
            if (lang.dropOff.phoneNumber != undefined && lang.dropOff.phoneNumber.includes(this.searchLang)) {
              return lang;
            }
          } 
        } else {
          if (lang.orderId.toLowerCase().includes(this.searchLang.toLowerCase())) {
            return lang;
          }
          if (lang.dropOff.phoneNumber != undefined && lang.dropOff.phoneNumber.includes(this.searchLang)) {
            return lang;
          }
        }
      });
    } else {
      this.orderStatus = "all";
      this.filterSegment = '';
      this.orderStatusFilter(this.orderStatus);
    }
  }

  orderSegmentChanged(e) {
    this.orderStatus = e.detail.value;
    this.filterSegment = '';
    console.log(this.orderStatus);
    this.orderStatusFilter(this.orderStatus);
    //this.getAllTripHistory(this.orderStatus);
  }

  filterSegmentChanged(e) {
    if(e.detail.value != "" && e.detail.value != undefined && e.detail.value != null){
      this.filterSegment = e.detail.value;
      console.log(this.filterSegment);
      this.orderTimeSectionFilter(this.filterSegment,this.orderStatus);
    }
  }

  orderStatusFilter(orderStatus) {
    if (orderStatus != 'all') {
      return this.ordersDataTripHistory = this.allTripHistory.filter(item => {
        return item.status == orderStatus;
      });
    } else {
      this.ordersDataTripHistory = this.allTripHistory;
      return this.ordersDataTripHistory;
    }
  }

  orderTimeSectionFilter(timeFilter, orderStatus) {
    return this.ordersDataTripHistory = this.allTripHistory.filter(item => {

      if (timeFilter == 'Today' && (item.status == orderStatus || orderStatus == 'all')) {
        let todayLocalDate = moment(item.createdAt).format('DD/MM/YYYY');;
        let currentLocal = moment().format('DD/MM/YYYY');
        if (todayLocalDate == currentLocal) {
          return item;
        }
        
      } else if (timeFilter == 'Yesterday' && (item.status == orderStatus || orderStatus == 'all')) {
        const yesterdayDate = moment().subtract(1, 'd').format('DD/MM/YYYY');
        let orderDate = moment(item.createdAt).format('DD/MM/YYYY');
        let localDate = orderDate;
        if (yesterdayDate == localDate) {
          return item;
        }
      } else if (timeFilter == 'customdate' && (item.status == orderStatus || orderStatus == 'all')) {
        let selectDate = moment(this.defaultDate).format("YYYY-MM-DD");
        let selectLocalDate = selectDate;
        let dateWise = moment(item.createdAt).format("YYYY-MM-DD");
        let localDateWise = dateWise;
        if (selectLocalDate == localDateWise) {
          return item;
        }
      }
    });
  }

  async openOrderAddressModal(item) {
    this.isOrderAddressDialog = false;
    const modal = await this.modalCtrl.create({
      component: OrderAddressComponent,
      cssClass: 'gst-modal-css',
      componentProps: {
        'orderDropPick': item,
      }
    });
    //this.router.navigate(['/order-address']);
    setTimeout(async function(){
      //this.isOrderAddressDialog = false;
      if(!this.isOrderAddressDialog){
        this.isOrderAddressDialog = true;
        await modal.present();
      }
    }, 1);
    modal.onWillDismiss().then(() => {
      setTimeout(async function(){
        this.isOrderAddressDialog = false;
      }, 0);
    });
  }

  async openDateSelectModal(selectType) {
    // const modal = await this.modalCtrl.create({
    //   component: DateTimePickerComponent,
    //   cssClass: 'gst-modal-css',
    //   componentProps: { isModal: false, date_format: "YYYY-MM-DD" }
    // });
    // await modal.present();
    // await modal.onDidDismiss().then((modelData: any) => {
    //   console.log(modelData);
    //   if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
    //     this.defaultDate = modelData.data.value;
    //     this.filterSegment = "customdate";
    //     console.log('Modal Data : ' + modelData);
    //   }
    // });
    if (selectType !== null && selectType !== undefined && selectType !== "" && selectType.value !== "") {
      console.log('Modal Data : ' + selectType);
      this.defaultDate = selectType.value;
      this.filterSegment = "customdate";
      this.orderTimeSectionFilter(this.filterSegment, this.orderStatus);
      // if(this.initiallyDefinedDate === selectType.value) {
      //   this.orderStatus = "all";
      //   this.filterSegment = '';
      //   this.orderStatusFilter(this.orderStatus);
      // }
      // this.drivingLicenseDocForm.get('dlValidUpto').setValue(moment(selectType.value).format('DD/MM/YYYY'), {
      //   onlyself: true,
      // });
    } else {
      this.filterSegment = '';
      this.orderStatusFilter(this.orderStatus);
    }
  }
}
