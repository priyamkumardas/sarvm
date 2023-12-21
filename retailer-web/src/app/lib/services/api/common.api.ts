// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import { Injectable } from '@angular/core';
// import { GenericApi } from './shared/generic.api';
// import { ApiUrls } from 'src/app/config/constants';

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

    getUploadAadhar: `${environment.baseUrl}/onbs/apis/v1/onboarding/retailer/kyc/aadhar`,
    getUploadPan: `${environment.baseUrl}/onbs/apis/v1/onboarding/retailer/kyc/pan`,
    addKYC: `${environment.baseUrl}/onbs/apis/v1/onboarding/retailer/kyc`,

    //getBankURLDOC: `${environment.baseUrl}/onbs/apis/v1/onboarding/retailer/bank/uploadfile`,
    //addBank: `${environment.baseUrl}/onbs/apis/v1/onboarding/retailer/bank`,

    /* Subscription - Razorpay */
    //createSubscription: `${environment.baseUrl}/sub/apis/v1/subscription/initiate`,
    //confirmSubscription: `${environment.baseUrl}/sub/apis/v1/subscription/activate`,

    //getAllSubscription: `${environment.baseUrl}/sub/apis/v1/subscription/`,
  };

  private headers = new HttpHeaders({
    skip: 'true',
  });
  private skipHttpCall = { headers: this.headers };

  constructor(http: HttpClient) {
    super(http);
  }

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
  getStoreDetails(id:any){
    return this.get(`${ApiUrls.sellerProfile+id}`, this.skipHttpCall)
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
  /* Add Catalog */
  // addNewCatalog(body, shopid) {
  //   let reqOpts = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmZmNjcxYjc2MTJkYjFhNGIxZjI2ZjkiLCJzY29wZSI6WyJVc2VycyIsbnVsbF0sImlhdCI6MTY2MTE5NDU5OSwibmJmIjoxNjYxMTk0NTk5LCJleHAiOjE2OTI3MzA1OTksImlzcyI6InNhcnZtOnVtcyIsInN1YiI6ImFjY2Vzc1Rva2VuIn0.fu-fsaA7YcE7G_BHmlJ41OnFAHn99ouyFrpYfWXxx2E'
  //     }
  //   };
  //   return this.post(`${this.apiUrl.addCatalog(shopid)}`, body, reqOpts);
  // }

  /* Shops Details */
  // addNewShop(body: any) {
  //   let reqOpts = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmZmNjcxYjc2MTJkYjFhNGIxZjI2ZjkiLCJzY29wZSI6WyJVc2VycyIsImhvdXNlaG9sZEFwcCJdLCJpYXQiOjE2NjEyNjQ5NDYsIm5iZiI6MTY2MTI2NDk0NiwiZXhwIjoxNjkyODAwOTQ2LCJpc3MiOiJzYXJ2bTp1bXMiLCJzdWIiOiJhY2Nlc3NUb2tlbiJ9.Ebu9Hp4hsJw2LokZZwFXiyOnd80p2IwzP_xD3zysBmQ'
  //     }
  //   };
  //   return this.post(`${this.apiUrl.addShop}`, body, reqOpts);
  // }
  addShopWorkingTime(shopid, body) {
    return this.post(`${this.apiUrl.addShopTime}/${shopid}`, body);
  }

  /* For KYC */
  getUploadKYCURL(docType: any) {
    if(docType == 'aadhar'){
      return this.get(`${this.apiUrl.getUploadAadhar}`);
    } else {
      return this.get(`${this.apiUrl.getUploadPan}`);
    }
  }

  addKYCDetails(body) {
    return this.post(`${this.apiUrl.addKYC}`, body);
  }

  getKYCDetails() {
    return this.get(`${environment.baseUrl + ApiUrls.getKycDetails}`);
  }

  /* For Bank */
  getBankPassbookLink() {
    return this.get(`${environment.baseUrl + ApiUrls.getBankURLDOC}`);
  }

  addBankDetails(body) {
    return this.post(`${environment.baseUrl + ApiUrls.addBank}`, body);
  }

  /* saveShopsDetails(retailerId, body) {
    return this.post(this.apiUrl.saveShops(retailerId), body);
  } */


  /* Subscription - Razorpay*/
  createSubscription(body: any){
    return this.post(`${environment.baseUrl + ApiUrls.createSubscription}`, body);
  }

  confirmSubscription(body: any){
    return this.post(`${environment.baseUrl + ApiUrls.confirmSubscription}`, body);
  }

  getAllSubscription(subscripId: any){
    return this.get(`${environment.baseUrl + ApiUrls.getAllSubscription}${subscripId}`);
  }

  checkStatusSubscription(subscripId: any){
    return this.get(`${environment.baseUrl + ApiUrls.checkStatus}${subscripId}`);
  }
}
