import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonApi } from '../lib/services/api/common.api';
import { CommonService } from '../lib/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private commonService: CommonService,
    private commonApi: CommonApi,) { }

  /* Subscription - Razorpay*/
  createSubscriptions(body: any) {
    return this.commonApi.createSubscription(body).pipe(catchError((err) => this.errorHandler(err)));
  }

  confirmSubscriptions(body: any) {
    return this.commonApi.confirmSubscription(body).pipe(catchError((err) => this.errorHandler(err)));
  }

  getAllSubscriptions(subscripId: any){
    return this.commonApi.getAllSubscription(subscripId).pipe(catchError((err) => this.errorHandler(err)));
  }
  
  // checkStatusSubscriptions(subscripId: any){
  //   return this.commonApi.checkStatusSubscription(subscripId).pipe(catchError((err) => this.errorHandler(err)));
  // }  

  private errorHandler(err: { error: { error: { message: any; }; }; }) {
    // this.commonService.dismiss();
    // this.commonService.toast(err.error.error.message);
    return throwError(err);
  }
}
