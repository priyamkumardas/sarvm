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
export class OnboardService {

  constructor(private commonService: CommonService,
    private commonApi: CommonApi,) { }


  /* --------- For Home Page---------- */
  getTripDetailsByUserId() {
    return forkJoin({ isTrip: this.commonApi.getTripDetailsByUserId() }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isTrip }) => ({
        isTrip,
      }))
    );
  }

  getAllNewTripRequest() {
    return forkJoin({ isTrip: this.commonApi.getNewTripRequest() }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isTrip }) => ({
        isTrip,
      }))
    );
  }  

  patchChangeStatusToggle(body: any){
    return forkJoin({ isTrip: this.commonApi.patchStatusToggle(body) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isTrip }) => ({
        isTrip,
      }))
    );
  }

  getDeliveryPersonInfo() {
    return forkJoin({ isTrip: this.commonApi.getDeliveryPersonInfo() }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isTrip }) => ({
        isTrip,
      }))
    );
  }

  updateDeliveryPersonInfo(body: any) {
    return forkJoin({ isTrip: this.commonApi.updateDeliveryPersonInfo(body) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isTrip }) => ({
        isTrip,
      }))
    );
  }

  updateDeliveryPersonLocation(body: any) {
    return forkJoin({ isDeliveryLocation: this.commonApi.updateDeliveryPersonLocation(body) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isDeliveryLocation }) => ({
        isDeliveryLocation,
      }))
    );
  }

  getLocationRequestTime(){
    return forkJoin({ isLocationTime: this.commonApi.getLocationRequestTime() }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isLocationTime }) => ({
        isLocationTime,
      }))
    );
  }


  /* --------- delivery-preferences ---------- */
  getDeliveryPreference(){
    return forkJoin({ isDOption: this.commonApi.getDeliveryPreferences() }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isDOption }) => ({
        isDOption,
      }))
    );
  }
  addUpdateDeliveryPreferences(body: any){
    return forkJoin({ isDOption: this.commonApi.updateDeliveryPreferences(body) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isDOption }) => ({
        isDOption,
      }))
    );
  }


  /* ----- For KYC ---- */
  /* get all document URL for KYC */
  getUploadKYCURL(docType: any) {
    return forkJoin({ isKYCURLs: this.commonApi.getUploadKYCURL(docType) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isKYCURLs }) => ({
        isKYCURLs,
      }))
    );
  }

  /* ----- For Add / Update KYC ---- */
  addUpdateKYCFormDetals(body) {
    return forkJoin({ isKYC: this.commonApi.addUpdateKYCDetails(body) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isKYC }) => ({
        isKYC,
      }))
    );
  }

  /* ----- For KYC ---- */
  getKYCDetail() {
    return this.commonApi.getKYCDetails().pipe(catchError((err) => this.errorHandler(err)));
  }




  /* ----- For Bank ---- */
  /* get document URL for Bank */
  getBankDetails() {
    return this.commonApi.getBankDetails().pipe(catchError((err) => this.errorHandler(err)));
  }

  getBankPassbookURL() {
    return forkJoin({ isKYCURLs: this.commonApi.getBankPassbookURL() }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isKYCURLs }) => ({
        isKYCURLs,
      }))
    );
  }

  /* final form-data upload for KYC */
  addUpdateBankFormDetals(body) {
    return forkJoin({ isBank: this.commonApi.addUpdateBankDetails(body) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isBank }) => ({
        isBank,
      }))
    );
  }

  deleteBankDetails() {
    return this.commonApi.deleteBankDetails().pipe(catchError((err) => this.errorHandler(err)));
  }





  addGstNo(body, shopId) {
    return this.commonApi.postData(`${ApiUrls.addshop}/${shopId}/gst`, body).pipe(catchError((err) => this.errorHandler(err)));
  }

  getShopDetails(shopId) {
    return this.commonApi.getData(`${ApiUrls.getShopDetails}/${shopId}`).pipe(catchError((err) => this.errorHandler(err)));
  }

  getGstDetails(shopId) {
    return this.commonApi.getData(`${ApiUrls.getGstDetails}/${shopId}/gst`).pipe(catchError((err) => this.errorHandler(err)));
  }

  getUserDetails(userId) {
    return this.commonApi.getData(`${ApiUrls.getUserDetails}/${userId}`).pipe(catchError((err) => this.errorHandler(err)));
  }




  /* ----- For User Profile ---- */
  /* get document URL for User Profile */
  getOnboardingAndSubscription(){
    return forkJoin({ isProfile: this.commonApi.getOnboardingSubscription() }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isProfile }) => ({
        isProfile,
      }))
    );
  }

  getUserProfileUploadURL() {
    return forkJoin({ isProfile: this.commonApi.getUserProfileURL() }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isProfile }) => ({
        isProfile,
      }))
    );
  }

  addUserProfileDetals(retailerId, body) {
    return forkJoin({ addProfile: this.commonApi.addProfileDetails(retailerId, body) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ addProfile }) => ({
        addProfile,
      }))
    );
  }

  /* ------------------------------ LA App -------------------------------- */

  /* For La App */
  getPresignedUrlForVehicleDocument(docType: any) {
    return forkJoin({ isVehicleDoc: this.commonApi.getUrlForVehicleDocument(docType) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isVehicleDoc }) => ({ isVehicleDoc }))
    );
  }

  /* For La App */
  postAllVehicleDocuments(body: any) {
    return forkJoin({ isVehicleDoc: this.commonApi.postAllVehicleDocument(body) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isVehicleDoc }) => ({ isVehicleDoc }))
    );
  }


  /* For La App */
  getAllVehicleDocuments() {
    return forkJoin({ isVehicleDoc: this.commonApi.getAllVehicleDocument() }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isVehicleDoc }) => ({ isVehicleDoc }))
    );
  }


  /* For Add delivery-options App */
  getDeliveryCharges() {
    return forkJoin({ isVehicleDoc: this.commonApi.getDeliveryOptionsCharges() }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isVehicleDoc }) => ({ isVehicleDoc }))
    );
  }

  /* For get delivery-options App */
  postDeliveryCharges(body: any) {
    return forkJoin({ isVehicleDoc: this.commonApi.postDeliveryOptionsCharges(body) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isVehicleDoc }) => ({ isVehicleDoc }))
    );
  }

  /* For get home page notification App */
  getAllNotification(deliveryBoyId: any) {
    return forkJoin({ isNotifi: this.commonApi.getAlNotifications(deliveryBoyId) }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ isNotifi }) => ({ isNotifi }))
    );
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
