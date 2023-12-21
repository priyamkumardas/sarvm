import { Injectable } from '@angular/core';
import { forkJoin, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonApi } from './api/common.api';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { ApiUrls } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private commonService: CommonService,
    private commonApi: CommonApi) { }

     /* --------- For Home Page---------- */
  getTripDetailsByTripId(tripId: any) {
    return forkJoin({ isTrip: this.commonApi.getAllTripDetailsByTripId(tripId) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isTrip }) => ({
        isTrip,
      }))
    );
  }

  updateTripDetailsByTripId(tripData) {
    return forkJoin({ isTripUpdate: this.commonApi.updateTripDetailsByTripId(tripData) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isTripUpdate }) => ({
        isTripUpdate,
      }))
    );
  }

  updatePaymentStatus(updatePayment: any, orderId: any){
    return forkJoin({ isTripUpdate: this.commonApi.updatePaymentStatus(updatePayment, orderId) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isTripUpdate }) => ({
        isTripUpdate,
      }))
    );
    //return this.commonApi.putData(this.url.updatePayment(orderId), body).pipe(catchError((err) => this.errorHandler(err)));
  }

  private errorHandler(err) {
    if (err.error.length >= 1) {
      this.commonService.danger(err.error[0].message);
    } else {
      this.commonService.danger(err.error.error.message);
    }
    return throwError(err);
  }
}
