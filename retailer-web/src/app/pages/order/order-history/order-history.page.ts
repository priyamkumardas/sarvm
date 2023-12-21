import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/lib/services/storage.service';
import { OrderService } from 'src/app/lib/services/order.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { Router } from '@angular/router';

export enum OrderStatus {
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
  Rejected = 'REJECTED',
  NoShow = 'NO_SHOW',
  PendingPayment = 'PAYMENT_PENDING',
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  segment;
  curdate = "15 May 2022";

  tabs = Object.keys(OrderStatus);
  statusSegment = OrderStatus.Completed;

  ordersData: any = [];
  allOrdersData: any = [];
  searchLang;

  orderList: any = [];
  activeNav: any = 'All';
  defaultDate = moment().subtract(2, 'd').format('YYYY-MM-DD');
  format = 'YYYY-MM-DD';
  segmentTime: any;

  initiallyDefinedDate;

  constructor(private ngLocation: Location,
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private storageService: StorageService,
    private orderService: OrderService,
    private router: Router, ) { }

  custmer = [
    'Jogesh Wani',
    'Christopher Ben',
    'Jogesh Wani',
    'Christopher Ben',
    'Jogesh Wani',
    'Christopher Ben',
  ];
  ngOnInit() {
    this.segment = '0';
  }

  ionViewWillEnter() {
    this.segment = '0';
    this.orderStatusCheck("COMPLETED");
    this.initiallyDefinedDate = this.defaultDate;
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async pullToRefresh(event) {
      this.orderStatusCheck(this.statusSegment);

  }

  changeOrderSegment(status: any){
    if(this.segmentTime){
      clearTimeout(this.segmentTime)
    }
    this.segmentTime = setTimeout(()=>{
      this.orderStatusCheck(status);
    },500);
  }

  orderStatusCheck(status: any) {
    this.ordersData = [];
    this.orderList = [];
    this.statusSegment = status;
    console.log(this.statusSegment);

    this.commonService.present();
    this.orderService.getOrderStatusWise(this.statusSegment).subscribe((orders: any) => {
      console.log(orders);
      this.commonService.dismiss();
      if (orders.data?.length == 0) {
        return this.commonService.danger("No data available, please try again later");
      }
      if (orders.success == true && orders.data != undefined && orders.data?.length != 0) {
        this.ordersData = orders.data;
        this.orderList = orders;
        this.allOrdersData = this.ordersData;
        this.activeDay('All');

        // Check for searched oder in status tab
        if(this.searchLang != undefined){
          this.searchFunction();
        }
      }
    }, (error) => {
      console.log(error)
      this.commonService.dismiss();
      // this.commonService.danger(error);
    });
  }

  searchFunction() {
    this.ordersData = this.allOrdersData.filter((lang) => {
      if (lang.orderID?.toLowerCase()?.includes(this.searchLang.toLowerCase())) {
        return lang;        
      }
      if (lang.userDetails?.phone?.toLowerCase().includes(this.searchLang.toLowerCase())) {
        return lang;        
      }
    });
  }

  activeDay(day) {
    if(this.orderList){
    // if (this.orderList?.data?.length != 0 && this.orderList.success == true) {
      this.activeNav = day;
      this.ordersData = this.orderList.data.filter((order) => {
        if (day == 'All') {
          // return order;
          if(this.searchLang != undefined){
            // Check for searched order in day tab
            return order = this.checkForSerachedOrders(order);
          } else {
            return order;
            }
        }
        else if (day == 'Today') {
          let todaydate = moment.utc(order.delivery.deliveryDate);
          let todayLocalDate = todaydate.format('DD/MM/YYYY');
          let currentLocal = moment().format('DD/MM/YYYY');
          // var todayDate = moment.utc(order.delivery.deliveryDate, "YYYY-MM-DD");
          // var todayLocalDate = todayDate.local().format('DD/MM/YYYY');
          // var currentLocal = moment().format('DD/MM/YYYY');
          if (todayLocalDate == currentLocal) {
          // if (moment(todayLocalDate).isSame(currentLocal)) {
            console.log("today==> ", order.status);
            // return order;
            if(this.searchLang != undefined){
              // Check for searched order in day tab
              return order = this.checkForSerachedOrders(order);
            } else {
              return order;
            }
          }
        }
        else if (day == 'Yesterday') {
          const yesterdaydate = moment().subtract(1, 'd').format('DD/MM/YYYY');
          // const yesterdayDate = moment().subtract(1, 'd').format('DD/MM/YYYY')
          let orderDate = moment.utc(order.delivery.deliveryDate).format('DD/MM/YYYY');
          // var orderDate = moment.utc(order.delivery.deliveryDate, "YYYY-MM-DD");
          // var localDate = orderDate.local().format('DD/MM/YYYY');
           let localDate = orderDate;
          if (yesterdaydate == localDate) {
          // if (moment(yesterdayDate).isSame(localDate)) {
            // return order;
            if(this.searchLang != undefined){
              // Check for searched order in day tab
              return order = this.checkForSerachedOrders(order);
            } else {
              return order;
              }
          }
        }
        else if (day?.type == 'date') {
          const date = new Date(day?.value).toISOString().substring(0, 10);
          this.defaultDate = date;

          // var selectDate = moment.utc(day?.value, "YYYY-MM-DD");
          let selectDate = moment.utc(day?.value).format("YYYY-MM-DD");
          // var selectLocalDate = selectDate.local().format('YYYY-MM-DD');
           let selectLocalDate = selectDate;
          // var dateWise = moment.utc(order.delivery.deliveryDate, "YYYY-MM-DD");
          let dateWise = moment.utc(order.delivery.deliveryDate).format("YYYY-MM-DD");
          // var localDateWise = dateWise.local().format('YYYY-MM-DD');

          // Select All tab if user click on cancel button
          if (this.initiallyDefinedDate === day.value) {
            this.activeNav = 'All';
            this.changeOrderSegment(this.statusSegment);
          }

          let localDateWise = dateWise;
          if (selectLocalDate == localDateWise) {
          // if (moment(selectLocalDate).isSame(localDateWise)) {
            // return order;

            if(this.searchLang != undefined){
              // Check for searched order in day tab
              return order = this.checkForSerachedOrders(order);  
            } else {
              return order;
              }
          }
        }
      });
    }
  }

  checkForSerachedOrders(currentOrders){
    if (currentOrders.orderID.toLowerCase().includes(this.searchLang?.toLowerCase())) {
      return currentOrders;        
    }
    if (currentOrders.userDetails.phone.toLowerCase().includes(this.searchLang?.toLowerCase())) {
      return currentOrders;        
    }
  }
  gotoOrderDetails(order){
    this.router.navigate(['/order-details', order.orderID, order.status]);
  }

  onBack() {
      this.router.navigate(['/order']);
    }
}
