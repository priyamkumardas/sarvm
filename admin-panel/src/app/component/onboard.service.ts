import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonApi } from '../lib/services/api/common.api';
import { CommonService } from '../lib/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardService {

  
  constructor(private commonService: CommonService,
    private commonApi: CommonApi,) { }

  /* Add New Catalog */
  // addNewCatalogDetails(body, shopid){
  //   return this.commonApi.postData(ApiUrls.catelog+shopid, body).pipe(catchError((err) => this.errorHandler(err)));

  //   // return forkJoin({isCatalog: this.commonApi.addNewCatalog(body, shopid)}).pipe(
  //   //   catchError((err) => this.errorHandler(err)),
  //   //   map(({ isCatalog }) => ({
  //   //     isCatalog,
  //   //   }))
  //   // );
  // }

  // addNewShopDetails(body, shopId){
  //   if(shopId === null){
  //     return this.commonApi.postData(ApiUrls.addshop, body).pipe(catchError((err) => this.errorHandler(err)));
  //   } else {
  //     return this.commonApi.putData(ApiUrls.updateShopDetails + '/'+ shopId, body).pipe(catchError((err) => this.errorHandler(err)));
  //   }
    
  //   // return forkJoin({isShop: this.commonApi.addNewShop(body)}).pipe(
  //   //   catchError((err) => this.errorHandler(err)),
  //   //   map(({ isShop }) => ({
  //   //     isShop,
  //   //   }))
  //   // );
  // }

  // addShopWorkingTime(shopid, body){
  //   return forkJoin({isShopTime: this.commonApi.addShopWorkingTime(shopid, body)}).pipe(
  //     catchError((err) => this.errorHandler(err)),
  //     map(({ isShopTime }) => ({
  //       isShopTime,
  //     }))
  //   );
  // }

  // /* ----- For KYC ---- */
  // /* get all document URL for KYC */
  // getUploadKYCURL(docType: any){
  //   return forkJoin({isKYCURLs: this.commonApi.getUploadKYCURL(docType)}).pipe(
  //     catchError((err) => this.errorHandler(err)),
  //     map(({ isKYCURLs }) => ({
  //       isKYCURLs,
  //     }))
  //   );
  // }

  // /* final form-data upload for KYC */
  // addKYCFormDetals(body){
  //   return forkJoin({isKYC: this.commonApi.addKYCDetails(body)}).pipe(
  //     catchError((err) => this.errorHandler(err)),
  //     map(({ isKYC }) => ({
  //       isKYC,
  //     }))
  //   );
  // }

  getKYCDetail(id:any){
    return this.commonApi.getKYCDetails(id).pipe(catchError((err:any) => this.errorHandler(err)));
  }
  

  // /* ----- For Bank ---- */
  // /* get all document URL for Bank */
  // getBankPassbookURL(){
  //   return forkJoin({isKYCURLs: this.commonApi.getBankPassbookLink()}).pipe(
  //     catchError((err) => this.errorHandler(err)),
  //     map(({ isKYCURLs }) => ({
  //       isKYCURLs,
  //     }))
  //   );
  // }

  // /* final form-data upload for KYC */
  // addBankFormDetals(body){
  //   return forkJoin({isBank: this.commonApi.addBankDetails(body)}).pipe(
  //     catchError((err) => this.errorHandler(err)),
  //     map(({ isBank }) => ({
  //       isBank,
  //     }))
  //   );
  // }

  // addGstNo(body, shopId){
  //   return this.commonApi.postData(`${ApiUrls.addshop}/${shopId}/gst`, body).pipe(catchError((err) => this.errorHandler(err)));
  // }

  // getShopDetails(shopId){
  //   return this.commonApi.getData(`${ ApiUrls.getShopDetails}/${shopId}`).pipe(catchError((err) => this.errorHandler(err)));
  // }

  // getGstDetails(shopId){
  //   return this.commonApi.getData(`${ ApiUrls.getGstDetails}/${shopId}/gst`).pipe(catchError((err) => this.errorHandler(err)));
  // }

  private errorHandler(err: any) {
    // if(err.error.length >= 1){
    //   this.commonService.toast(err.error[0].message);
    // } else {
    //   this.commonService.toast(err.error.error.message);
    // }
    return throwError(err);
  }
}
