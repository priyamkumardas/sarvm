import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { GenericApi } from './shared/generic.api';
import { ApiUrls } from 'src/app/config/constants';

@Injectable()
export class CommonApi extends GenericApi {
  apiUrl = {
    categories: `${environment.baseUrl}`,
    //allLanguages: `http://43.205.9.141:1205/apis/v1/households/splash`,
    saveShops: (retailerId) =>
      `http://43.205.9.141:1205/apis/v1/retailers/${retailerId}/shops`,

    addCatalog: (shopid) =>
      `${environment.baseUrl}/rms/apis/v1/catalog/:${shopid}`,

    addShop: `${environment.baseUrl}/rms/apis/v1/shop`,
    addShopTime: `${environment.baseUrl}/rms/apis/v1/time/`,

    userProfile: `${environment.baseUrl}/ums/apis/v1/users/upload`,
    addUserProfile: (retailerId) =>
      `${environment.baseUrl}/ums/apis/v1/users/${retailerId}/profile`,

  };

  constructor(http: HttpClient) {
    super(http);
  }

  private headers = new HttpHeaders({
    skip: 'true',
  });
  private skipHttpCall = { headers: this.headers };

  private invalidateHeaders = new HttpHeaders({
    casheInvalidate: 'true',
    skip: 'true',
  });
  private invalidateHttpCallCashe = { headers: this.invalidateHeaders };

  /**
   * @name getCategories
   * @type Value-returning function - Call APi to get All retialer products
   * @param categoriesData - contains limit, offset, and city
   **/

  /*
   --- For Example ---
  getCategories(categoriesData) {
    return this.get(
      `${this.apiUrl.categories}?limit=${categoriesData.limit}&offset=${categoriesData.offset}&city=${categoriesData.city}`
    );
  }
  */

  /**
   * @name getDataByUrl
   * @type Value-returning function - Call APi to get Data by URL
   **/
  getDataByUrl(url) {
    return this.get(url);
  }

  getAllLanguage() {
    return this.get(environment.baseUrl + ApiUrls.splash);
  }

  getCDNLink(selectUrl) {
    return this.get(`${selectUrl}`, this.skipHttpCall);
  }

  getCDNLinkNoCashe(selectUrl) {
    return this.get(`${selectUrl}`, this.invalidateHttpCallCashe);
  }

  getData(url) {
    return this.get(environment.baseUrl + url);
  }


  postData(url, data) {
    return this.post(environment.baseUrl + url, data);
  }

  putData(url, data) {
    return this.put(environment.baseUrl + url, data);
  }

  deleteData(url) {
    console.log(url);
    return this.delete(environment.baseUrl + url);
  }





  /* For user profile */
  getOnboardingSubscription() {
    return this.get(`${environment.baseUrl + ApiUrls.userProfile}`);
  }
  getUserProfileURL() {
    return this.get(`${this.apiUrl.userProfile}`);
  }
  addProfileDetails(retailerId, body) {
    return this.post(`${this.apiUrl.addUserProfile(retailerId)}`, body);
  }

  getUserDetails() {
    return this.get(`${environment.baseUrl + ApiUrls.user}`);
  }

  /* -------------- Home ------------- */
  //
  getTripDetailsByUserId() {
    return this.get(`${environment.baseUrl + ApiUrls.getTripDetailsByUser}`);
  }
  getNewTripRequest() {
    return this.get(`${environment.baseUrl + ApiUrls.newTripRequest}`);
  }
  patchStatusToggle(body: any) {
    return this.patch(`${environment.baseUrl + ApiUrls.patchToggleChangeStatus}`, body);
  }
  getDeliveryPersonInfo() {
    return this.get(`${environment.baseUrl + ApiUrls.getDeliveryPersonInfo}`);
  }

  updateDeliveryPersonInfo(body: any) {
    return this.put(`${environment.baseUrl + ApiUrls.getDeliveryPersonInfo}`, body);
  }

  updateDeliveryPersonLocation(body: any) {
    return this.put(`${environment.baseUrl + ApiUrls.getUpdateDeliveryPersonLocation}`, body);
  }

  getLocationRequestTime() {
    return this.get(`${environment.baseUrl + ApiUrls.getUpdateDeliveryPersonLocation}`);
  }


  /* --------- delivery-preferences ---------- */
  getDeliveryPreferences() {
    return this.get(`${environment.baseUrl + ApiUrls.getDeliveryPreference}`);
  }
  updateDeliveryPreferences(body: any) {
    return this.put(`${environment.baseUrl + ApiUrls.updateDeliveryPreference}`, body);
  }


  /* -------------- KYC ------------- */
  /* For Add / Update KYC */
  addUpdateKYCDetails(body) {
    return this.post(`${environment.baseUrl + ApiUrls.getAddUpdateKyc}`, body);
  }
  /* For get KYC */
  getKYCDetails() {
    return this.get(`${environment.baseUrl + ApiUrls.getAddUpdateKyc}`);
  }
  /* For KYC presigned Url*/
  getUploadKYCURL(docType: any) {
    return this.get(`${environment.baseUrl + ApiUrls.getpresignedUrlKyc}`, { params: docType });
  }




  /* For Bank */
  getBankDetails() {
    return this.get(`${environment.baseUrl + ApiUrls.addGetBank}`);
  }

  getBankPassbookURL() {
    return this.get(`${environment.baseUrl + ApiUrls.getpresignedUrlBank}`);
  }

  addUpdateBankDetails(body) {
    return this.post(`${environment.baseUrl + ApiUrls.addGetBank}`, body);
  }

  deleteBankDetails() {
    return this.delete(`${environment.baseUrl + ApiUrls.addGetBank}`);
  }


  /* Subscription - Razorpay*/
  createSubscription(body: any) {
    return this.post(`${environment.baseUrl + ApiUrls.createSubscription}`, body);
  }

  confirmSubscription(body: any) {
    return this.post(`${environment.baseUrl + ApiUrls.confirmSubscription}`, body);
  }

  getAllSubscription(subscripId: any) {
    return this.get(`${environment.baseUrl + ApiUrls.getAllSubscription}${subscripId}`);
  }

  checkStatusSubscription(subscripId: any) {
    return this.get(`${environment.baseUrl + ApiUrls.checkStatus}${subscripId}`);
  }

  /* ------------------------------ LA App -------------------------------- */
  /* get presigned url */
  getUrlForVehicleDocument(body: any) {
    return this.get(`${environment.baseUrl + ApiUrls.getPresignedUrlForVehicleDoc}`, { params: body });
  }

  /* post vehicle document */
  postAllVehicleDocument(body: any) {
    return this.post(`${environment.baseUrl + ApiUrls.postVehicleDocument}`, body);
  }

  /* get vehicle document */
  getAllVehicleDocument() {
    return this.get(`${environment.baseUrl + ApiUrls.postVehicleDocument}`);
  }

  /* Payments Insights */
  getAllPaymentsInsights(type: any) {
    return this.get(`${environment.baseUrl + ApiUrls.getPaymentsInsights}${type}`);
  }

  /* Trip History */
  getAllTripHistory() {
    return this.get(`${environment.baseUrl + ApiUrls.getTripHistory}`);
  }

  getSubscriptionsPackageList() {
    return this.get(`${environment.baseUrl + ApiUrls.SubscriptionsPackageList}`);
  }

  /* -------------- order Accepted ------------- */
  //
  getAllTripDetailsByTripId(tripId: any) {
    return this.get(`${environment.baseUrl + ApiUrls.getTripDetailsByTripId}${tripId}`);
  }

  updateTripDetailsByTripId(body: any) {
    return this.put(`${environment.baseUrl + ApiUrls.updateTripDetailsByTripId}`, body);
  }

  updatePaymentStatus(body: any, orderId: any) {
    return this.put(`${environment.baseUrl + ApiUrls.updatePaymentStatus + orderId + ApiUrls.updatePaymentStatusTrip}`, body);
  }


  /* delivery-options */
  getDeliveryOptionsCharges() {
    return this.get(`${environment.baseUrl + ApiUrls.getDeliveryCharges}`);
  }
  postDeliveryOptionsCharges(body: any) {
    return this.post(`${environment.baseUrl + ApiUrls.addDeliveryCharges}`, body);
  }

  /* home page notification */
  getAlNotifications(deliveryBoyId: any) {
    return this.get(`${environment.baseUrl + ApiUrls.getNotification}${deliveryBoyId}`);
  }

  /* Send Payment Reminder To Retailer */
  getSendPaymentReminder(tripId: any) {
    return this.get(`${environment.baseUrl + ApiUrls.getSendPaymentReminder}${tripId}`);
  }
}