import { Injectable } from '@angular/core';
import { forkJoin, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonApi } from './api/common.api';
import { CommonService } from './common.service';
import { ApiUrls } from 'src/app/config/constants';
import { environment } from 'src/environments/environment';
import { CancelOrderModalComponent } from 'src/app/pages/order/cancel-order-modal/cancel-order-modal.component';
import { ModalController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  updateOrderItem: any;

  private url={
    /* accepted:"assets/json/orders/order-list.json",
    new:"assets/json/orders/order-list.json",
    processing:"assets/json/orders/order-list.json",
    ready:"assets/json/orders/order-list.json",
    dispatch:"assets/json/orders/order-list.json", */
    //getOrderById:"assets/json/orders/order.json",

    getOrder: "/rms/apis/v1/orders?status=",
    getOrderById: "/rms/apis/v1/orders/",
    //updateOrderStatus(orderId: any) => ""+orderId+"/status"
    updateOrderStatus: (orderId: any) =>
    `/rms/apis/v1/orders/${orderId}/status`,
    updatePayment: (orderId: any) => `/rms/apis/v1/orders/${orderId}/payment`,
  }

 

  constructor(private commonApi: CommonApi,
    private commonService: CommonService,
    private modalCtrl: ModalController,

    ) { }

    getDelBoyList() {
      return this.commonApi.getData(`${ApiUrls.getDboyList}`).pipe(catchError((err) => this.errorHandler(err)));
    }
    selectDeliveryBoy(orderId: any, body: any) {
      console.log(orderId);
      return this.commonApi.postData(ApiUrls.assignOrder(orderId), body).pipe(catchError((err) => this.errorHandler(err)));
    }
    selectReDeliveryBoy(orderId: any, body: any) {
      return this.commonApi.postData(ApiUrls.reAssignOrder(orderId), body).pipe(catchError((err) => this.errorHandler(err)));
    }

  /* getAllOrderDetials(shopId: any){
    return this.commonApi.getDataByUrl(environment.baseUrl + ApiUrls.getAllOrders + shopId).pipe(catchError((err) => this.errorHandler(err)));
  }

  updateOrderStatus(shopId: any, orderId: any, body: any){
    return this.commonApi.putData(ApiUrls.updateOrders + shopId + '/' + orderId, body).pipe(catchError((err) => this.errorHandler(err)));
  } */


  getOrderStatusWise(status: string){
    return this.commonApi.getDataByUrl(environment.baseUrl + this.url.getOrder + status).pipe(catchError((err) => this.errorHandler(err)));
  }
  
  getOrderByIdDetails(orderId:string){
    //return this.http.get(this.url.getOrderById)
    return this.commonApi.getDataByUrl(environment.baseUrl + this.url.getOrderById + orderId).pipe(catchError((err) => this.errorHandler(err)));
  }

  updateOrderStatus(orderId: any, body: any){
    return this.commonApi.putData(this.url.updateOrderStatus(orderId), body).pipe(catchError((err) => this.errorHandler(err)));
  }

  updatePaymentStatus(orderId: any, body: any){
    return this.commonApi.putData(this.url.updatePayment(orderId), body).pipe(catchError((err) => this.errorHandler(err)));
  }

  //getNewOrder(){
    /* return this.http.getDataByUrl(this.url.new).pipe(
      map((orders:Order[])=> {
            return orders.filter(order=> order.status == OrderStatus.NEW )   
        })
    ); */
    /* return this.commonApi.getDataByUrl(this.url.new).pipe(catchError((err) => this.errorHandler(err)));
  } */

  //getAcceptedOrder(){
    /* return this.http.get(this.url.accepted).pipe(
      map((orders:Order[])=> {
            return orders.filter(order=> order.status == OrderStatus.ACCEPTED )   
        })
    ); */
    /* return this.commonApi.getDataByUrl(this.url.accepted).pipe(catchError((err) => this.errorHandler(err)));
  } */

  //getProcessingOrder(){
    /* return this.http.get(this.url.processing).pipe(
      map((orders:Order[])=> {
            return orders.filter(order=> order.status == OrderStatus.PROCESSING )   
        })
    ); */
    /* return this.commonApi.getDataByUrl(this.url.processing).pipe(catchError((err) => this.errorHandler(err)));
  } */

  //getReadyOrder(){
    /* return this.http.get(this.url.ready).pipe(
      map((orders:Order[])=> {
            return orders.filter(order=> order.status == OrderStatus.READY )   
        })
    ); */
   /*  return this.commonApi.getDataByUrl(this.url.ready).pipe(catchError((err) => this.errorHandler(err)));
  } */

  //getDispatchOrder(){
    /* return this.http.get(this.url.dispatch).pipe(
      map((orders:Order[])=> {
            return orders.filter(order=> order.status == OrderStatus.DISPATCH )   
        })
    ); */
   /*  return this.commonApi.getDataByUrl(this.url.dispatch).pipe(catchError((err) => this.errorHandler(err)));
  } */

  getOrderDetails(orderId:string){
    //return this.http.get(this.url.getOrderById)
    return this.commonApi.getDataByUrl(this.url.getOrderById).pipe(catchError((err) => this.errorHandler(err)));
  }

  

  

  private errorHandler(err) {
    if(err.error.length >= 1){
      this.commonService.toast(err.error[0].message);
    } else {
      this.commonService.toast(err.error.error.message);
    }
    return throwError(err);
  }
}
