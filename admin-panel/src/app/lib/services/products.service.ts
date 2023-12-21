// import { StorageService } from './storage.service';
// import { Injectable } from '@angular/core';
// import { forkJoin, throwError } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { CommonApi } from './api/common.api';
// import { CommonService } from './common.service';
// import { environment } from 'src/environments/environment';
// import { ApiUrls, Constants } from 'src/app/config/constants';

// @Injectable({
//   providedIn: 'root',
// })
// export class ProductsService {
//   constructor(
//     private commonApi: CommonApi,
//     private commonService: CommonService,
//     private storageService: StorageService
//   ) {}

//   homegetProductsList(url) {
//     return forkJoin({
//       productsData: this.commonApi.getCDNLink(url.productsData),
//       categoryData: this.commonApi.getCDNLink(url.categoryData),
//       microCategoryData: this.commonApi.getCDNLink(url.microCategoryData),
//     }).pipe(
//       catchError((err) => this.errorHandler(err)),
//       map(({ productsData, categoryData, microCategoryData }) => ({
//         productsData,
//         categoryData,
//         microCategoryData,
//       }))
//     );
//   }

//   getmerchantListArray(category: any) {
//     //const url = `http://43.205.9.141:1205/apis/v1/households/stores?limit=10&offset=10&category=${category}`;
//     const url = `${
//       environment.baseUrl + ApiUrls.stores
//     }?limit=10&offset=2&category=${category}`;
//     return this.commonApi.getDataByUrl(url);
//   }

//   getSplashApi() {
//     const url = environment.baseUrl + ApiUrls.splash;
//     return this.commonApi.getDataByUrl(url);
//   }

//   getcatogoriesList() {
//     //const url = 'http://43.205.9.141:1205/apis/v1/households/splash';
//     const url = `${environment.baseUrl + ApiUrls.splash}`;
//     return this.commonApi.getDataByUrl(url);
//   }

//   getCatalogList() {
//     console.log(this.commonService.getUserData());
//     const storeId =
//       this.commonService.getUserData() &&
//       this.commonService.getUserData().shopId
//         ? this.commonService.getUserData().shopId
//         : this.storageService.getItem(Constants.SHOP_ID)
//         ? this.storageService.getItem(Constants.SHOP_ID)
//         : this.commonService.getUserData().userId;
//     const url = `${environment.baseUrl + ApiUrls.retailerCatalog + storeId}`;
//     return this.commonApi.getDataByUrl(url);
//   }

//   updateCatalogData(data) {
//     //const url = 'http://43.205.9.141:1205/apis/v1/households/splash';
//     const storeId =
//       this.commonService.getUserData() &&
//       this.commonService.getUserData().shopId
//         ? this.commonService.getUserData().shopId
//         : this.storageService.getItem(Constants.SHOP_ID)
//         ? this.storageService.getItem(Constants.SHOP_ID)
//         : this.commonService.getUserData().userId;
//     const url = `${ApiUrls.retailerCatalog}${storeId}`;
//     return this.commonApi.putData(url, data);
//   }

//   addCatalogData(data) {
//     //const url = 'http://43.205.9.141:1205/apis/v1/households/splash';
//     const storeId =
//       this.commonService.getUserData() &&
//       this.commonService.getUserData().shopId
//         ? this.commonService.getUserData().shopId
//         : this.storageService.getItem(Constants.SHOP_ID)
//         ? this.storageService.getItem(Constants.SHOP_ID)
//         : this.commonService.getUserData().userId;
//     const url = `${ApiUrls.retailerCatalog}${storeId}`;
//     const productData = {
//       products: data,
//     };
//     return this.commonApi.postData(url, productData);
//   }
//   private errorHandler(err) {
//     this.commonService.toast(err.error.errorMessage);
//     return throwError(err);
//   }
// }
