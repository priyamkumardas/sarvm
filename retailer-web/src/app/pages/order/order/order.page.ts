import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/lib/services/storage.service';
import { OrderService } from 'src/app/lib/services/order.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { DateTimePickerComponent } from 'src/app/components/date-time-picker/date-time-picker.component';

export enum OrderStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  PROCESSING = 'PROCESSING',
  READY = 'READY',
  DELIVERY = 'DELIVERY',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
}

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  public isUpdateOrderItem: BehaviorSubject<any> = new BehaviorSubject<any>("");

  // tabs = Object.keys(OrderStatus);
  tabs = Object.values(OrderStatus);

  selectedSegment = OrderStatus.NEW;
  readonly OrderStatus = OrderStatus;
  activeNav = 'All';
  searchLang;
  // defaultDate = moment().format('YYYY-MM-DD');
  // defaultDate = moment().subtract(2, 'd').format('DD MMM YYYY');
  defaultDate = moment().format('DD-MM-YYYY');
  format = 'DD-MM-YYYY';
  initiallyDefinedDate;
  orders: any = [];
  orderList: any = [];
  segmentTime: any;
  ordersData: any = [];
  allOrdersData: any = [];
  selectedDay: any;

  constructor(private ngLocation: Location,
    private modalCtrl: ModalController,
    public commonService: CommonService,
    private storageService: StorageService,
    public alertController: AlertController,
    private orderService: OrderService,) {
    this.selectedDay = 'All';
    this.isUpdateOrderItem.subscribe((value) => {
      console.log(value);
      console.log(this.orders);

      /* if(this.orderList?.data != undefined){
        this.orderList?.data.filter((orderItem) => {
          if(orderItem.orderID == value.orderID){
            orderItem == value;
            //return this.getList(this.selectedSegment);
          }
        })
      } */
    });
  }

  ngOnInit() {
    console.log(this.OrderStatus);
    console.log(this.segmentTime);
    console.log(this.selectedSegment);
    //this.segemntChanged(this.selectedSegment);
    /* const storeId =
      this.commonService.getUserData() &&
      this.commonService.getUserData().shopId
        ? this.commonService.getUserData().shopId
        : this.storageService.getItem(Constants.SHOP_ID)
        ? this.storageService.getItem(Constants.SHOP_ID)
        : this.commonService.getUserData().userId; */
    /* const storeId = 12;
    this.commonService.present();
    this.orderService.getAllOrderDetials(storeId).subscribe((orders: any) => {
      if(orders.data != 0 && orders.success == true){
        this.orderList = orders;
        this.getList(OrderStatus.NEW);
        this.commonService.dismiss();
      } else {
        this.commonService.dismiss();
      }   
    },(error) => {
      this.commonService.dismiss();
      this.commonService.danger(error);
    }); */

    /* const value = this.event.target.value = ""
    this.segemntChanged() */
  }

  ionViewWillEnter() {
    this.segemntChanged(this.selectedSegment);
    this.initiallyDefinedDate = this.defaultDate;
  }

  async pullToRefresh(event) {
    this.segemntChanged(this.selectedSegment);
  }

  changeSegment(e) {
    if (this.segmentTime) {
      clearTimeout(this.segmentTime)
    }
    this.segmentTime = setTimeout(() => {
      this.segemntChanged(e);
    }, 1000);
  }

  segemntChanged(e) {
    console.log(this.selectedSegment);
    console.log(e);
    this.commonService.present()
    this.orders = [];
    if (e.target != undefined && e.target != null) {
      console.log(e?.target?.value.toUpperCase());
      if (e?.target?.value.toUpperCase() === "DISPATCHED" || e?.taget?.value.toUpperCase() === 'IN_TRANSIT' || e?.taget?.value.toUpperCase() === 'PICKEDUP' || e?.taget?.value.toUpperCase() === 'RECHED_DELIVERY_LOCATION') {
        this.selectedSegment = OrderStatus.DELIVERY;
      } else {
        this.selectedSegment = e?.target?.value.toUpperCase();
      }

    } else {
      this.selectedSegment = this.selectedSegment;
    }
    this.getOrdersAccordingToCurrentSegment(this.selectedSegment);

    /* this.getList(this.selectedSegment);
    if(this.selectedSegment == OrderStatus.ACCEPTED){
      this.activeDay('All')
    } else if(this.selectedSegment == OrderStatus.PROCESSING){
      this.activeDay('All')
    } */
  }

  /* getList(status: OrderStatus) {
    if(this.orderList.data.length != 0 && this.orderList.success == true){
      if (status == OrderStatus.NEW) {
        //this.orderService.getAcceptedOrder().subscribe((orders: any) => { this.orderList = orders.filter(order=> order.status == OrderStatus.NEW ); });
        this.orders = this.orderList.data.filter(order => order.status == OrderStatus.NEW );
      } else if (status == OrderStatus.ACCEPTED) {
        //this.orderService.getAcceptedOrder().subscribe((orders: any) => { this.orderList = orders.filter(order=> order.status == OrderStatus.ACCEPTED ); });
        this.orders = this.orderList.data.filter(order=> order.status == OrderStatus.ACCEPTED );
      } else if (status == OrderStatus.PROCESSING) {
        //this.orderService.getProcessingOrder().subscribe((orders: any) => { this.orderList = orders.filter(order=> order.status == OrderStatus.PROCESSING ); });;
        this.orders = this.orderList.data.filter(order=> order.status == OrderStatus.PROCESSING );
      } else if (status == OrderStatus.READY) {
        //this.orderService.getReadyOrder().subscribe((orders: any) => { this.orderList = orders.filter(order=> order.status == OrderStatus.READY ); });;
        this.orders = this.orderList.data.filter(order=> order.status == OrderStatus.READY );
      } else if (status == OrderStatus.DISPATCH) {
        //this.orderService.getDispatchOrder().subscribe((orders: any) => { this.orderList = orders.filter(order=> order.status == OrderStatus.DISPATCH ); });;
        this.orders = this.orderList.data.filter(order=> order.status == OrderStatus.DISPATCH );
      }
    }
  } */

  changeTab(tab) {
    console.log(tab.value)
    // this.selectedSegment = tab.value
    // this.changeSegment({target:tab});
    this.changeSegment(this.selectedSegment);
  }

  getOrdersAccordingToCurrentSegment(currentSegment) {
    this.orderList = [];
    // console.log(this.activeNav);
    this.orderService.getOrderStatusWise(currentSegment).subscribe((orders: any) => {
      this.commonService.dismiss();
      if (orders.data?.length == 0) {
        this.commonService.danger("No data available, please try again later");
      }
      if (orders.success == true && orders.data != undefined && orders.data?.length != 0) {
        this.orderList = [];
        this.orders = orders.data;
        this.orderList = orders;
        this.allOrdersData = this.orders;
        this.activeDay(this.activeNav);
      }
    }, (error) => {
      this.commonService.dismiss();
      // this.commonService.danger(error);
    });
    return this.orderList;
  }

  activeDay(day) {
    console.log(day);
    if (this.orderList) {
      this.activeNav = day;
      this.orders = this.orderList?.data?.filter((order) => {
        if (day == 'All') {
          this.selectedDay = day;
          return order;
        }
        else if (day == 'Today') {
          this.selectedDay = day;
          let todaydate = moment.utc(order.delivery.deliveryDate);
          let todayLocalDate = todaydate.format('DD/MM/YYYY');
          let currentLocal = moment().format('DD/MM/YYYY');
          if (todayLocalDate == currentLocal) {
            console.log("today==> ", order.status);
            return order;
          }
        }
        else if (day == 'Tomorrow') {
          this.selectedDay = day;
          const tomorrowDate = moment().add(1, 'd').format('DD/MM/YYYY');
          // const yesterdayDate = moment().subtract(1, 'd').format('DD/MM/YYYY');
          let orderDate = moment.utc(order.delivery.deliveryDate).format('DD/MM/YYYY');
          let localDate = orderDate;
          if (tomorrowDate == localDate) {
            // if (yesterdayDate == localDate) {
            return order;
          }
        }
        else if (day?.type == 'date') {
          this.selectedDay = day?.value;
          const date = new Date(day?.value).toISOString().substring(0, 10);
          this.defaultDate = date;

          let selectDate = moment.utc(day?.value).format("YYYY-MM-DD");
          let selectLocalDate = selectDate;
          let dateWise = moment.utc(order.delivery.deliveryDate).format("YYYY-MM-DD");
          let localDateWise = dateWise;
          // Select All tab if user click on cancel button
          if (this.initiallyDefinedDate === day.value) {
            this.activeNav = 'All';
            this.changeSegment(this.selectedSegment);
          }
          if (selectLocalDate == localDateWise) {
            return order;
          }
        }
      });
    }
  }

  searchFunction() {
   

    this.orders = this.allOrdersData.filter((lang) => {
      if (lang.orderID?.toLowerCase()?.includes(this.searchLang.toLowerCase())) {
       
        return lang;        
      }
      if (lang.userDetails?.phone?.toLowerCase().includes(this.searchLang.toLowerCase())) {
        

        return lang;        
      }
    });
  }

  onBack() {
    this.ngLocation.back();
  }
}
