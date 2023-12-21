import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { GenericApi } from './shared/generic.api';
import { ApiUrls } from 'src/app/config/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonApi extends GenericApi {
  updateShopDataApi(id: any, data: any) {
    return this.put(`${environment.baseUrl + ApiUrls.getShopDetails+'/'+id}`, data);
    // throw new Error('Method not implemented.');
  }
  callShopDataApi(id: any) {
    return this.get(`${environment.baseUrl + ApiUrls.getShopDetails2+'/'+id}`);
    // throw new Error('Method not implemented.');
  }
  callShopData(pincode:any, city:any, shop_id:any, mobileNumber:any): Observable<any> {
    return this.get(`${environment.baseUrl + ApiUrls.getShopDetails}`,
      {
        params: {
         pincode:pincode,
         city:city,
         shop_id:shop_id,
         mobileNumber:mobileNumber
        },
        
    });
    // return this.commonApi.callShopData(pincode, shop_id, mobileNumber);
  }
  patchData(arg0: string) {
    throw new Error('Method not implemented.');
  }
  apiUrl = {
    getAllSubscription: `${environment.baseUrl}/sub/apis/v1/subscription/`,
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
  getDataByUrl(url: string) {
    return this.get(url);
  }
  getKYCDetails(id:any) {
    return this.get(`${environment.baseUrl + ApiUrls.getKycDetailsByUserId+'/'+id}`);
  }

  getRetailerProfileDetails(id:any)
  {
    return this.get(`${environment.baseUrl + ApiUrls.retailerProfile + id}`);
  }
  getData(url: string) {
    return this.get(`${environment.baseUrl + url}`);
  }

  getProductDataById(url: string) {
    return this.get(environment.baseUrl + url);
  }
  updateProductDataById(url:string, data:any)
  {
    return this.put(environment.baseUrl+url, data);
  }
  deletProductById(url:string){
    return this.delete(environment.baseUrl + url)
  }

  getParentData(url:string)
  {
    return this.get(environment.baseUrl+url);
  }
  getCategoryDataById(url: string) {
    return this.get(environment.baseUrl + url);
  }
  getCatalogDataById(url: string) {
    return this.get(environment.baseUrl + url);
  }
 
  updateCategoryDataById(url:string, data:any)
  {
    return this.put(environment.baseUrl+url, data);
  }
  updateCatalogDataById(url:string, data:any)
  {
    return this.put(environment.baseUrl+url, data);
  }
  deleteCategoryById(url: string) {
    return this.delete(environment.baseUrl + url);
  }
  deleteCatalogById(url: string) {
    return this.delete(environment.baseUrl + url);
  }
  createSubscription(body: any){
    return this.post(`${environment.baseUrl + ApiUrls.createSubscription}`, body);
  }

  confirmSubscription(body: any){
    return this.post(`${environment.baseUrl + ApiUrls.confirmSubscription}`, body);
  }

  getAllLanguage() {
    return this.get(environment.baseUrl + ApiUrls.splash);
  }

  getCDNLink(selectUrl: string) {
    return this.get(`${selectUrl}`, this.skipHttpCall);
  }

  postData(url: string, data: any) {
    console.log(data);
    return this.post(environment.baseUrl + url, data);
  }
 

  putDataByUrl(url:string,data:any){
    return this.put(url,data, this.skipHttpCall);
  }
  getDataTree(url:string)
  {
    return this.get(`${environment.baseUrl + url}`);
  }

  getAllSubscription(subscripId: any){
    return this.get(`${environment.baseUrl + ApiUrls.getAllSubscription}${subscripId}`);
  }
  putData(url: string, data: any) {
    return this.put(environment.baseUrl + url, data);
  }

}
