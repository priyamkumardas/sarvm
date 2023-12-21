import { Injectable } from '@angular/core';
import { ApiUrls, Constants } from 'src/app/config/constants';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { CommonApi } from './common.api';

@Injectable({
  providedIn: 'root'
})
export class RetailerService {
  constructor(private commonApi: CommonApi,private commonService:CommonService,private storageservice:StorageService) { }

  getretailerDetails(_id:any){
    return this.commonApi.getDataByUrl(`${environment.baseUrl}${ApiUrls.retailer}`);
  }
  getretailerDetailsbyId(id:any){
    return this.commonApi.getDataByUrl(`${environment.baseUrl}${ApiUrls.shop_DETAILS}/${id}`);
  }
  getretailerpaymentDetails(id:any){
    return this.commonApi.getDataByUrl(`${environment.baseUrl}${ApiUrls.payment_status}/${id}`);
  }
}
