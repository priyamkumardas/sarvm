import { Injectable } from '@angular/core';
import { ApiUrls } from 'src/app/config/constants';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { CommonApi } from './common.api';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private commonApi: CommonApi,private commonService:CommonService,private storageservice:StorageService) { }
  
  // getorderHistorydetails(id:any){
  //   return this.commonApi.getDataByUrl(`${environment.baseUrl}${ApiUrls.order}/${id}`)
  //  }
  getOrders(){
    return this.commonApi.getData(ApiUrls.order);
  }
  getOrderHistory(){
    return this.commonApi.getData(ApiUrls.orderHistory);
  }
}
