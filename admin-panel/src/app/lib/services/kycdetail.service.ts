import { Injectable } from '@angular/core';
import { CommonApi } from './api/common.api';
import { environment } from 'src/environments/environment';
import { ApiUrls, Constants } from 'src/app/config/constants';
@Injectable({
  providedIn: 'root'
})
export class KycdetailService {

  constructor(  private commonApi: CommonApi) {
  
   }

   getKycDetails() {
    const url = environment.baseUrl + ApiUrls.KYC_DETAILS;
    return this.commonApi.getDataByUrl(url);
  }
  
}
