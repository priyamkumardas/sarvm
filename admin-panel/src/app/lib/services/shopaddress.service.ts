import { Injectable } from '@angular/core';
import { ApiUrls } from 'src/app/config/constants';
import { environment } from 'src/environments/environment';
import { CommonApi } from './api/common.api';
@Injectable({
  providedIn: 'root'
})
export class ShopaddressService {

  constructor(private CommonApi:CommonApi) {

    this.getShopAddress();
   }

   getShopAddress(){
    const url = environment.baseUrl + ApiUrls.getShopDetails;
    return this.CommonApi.getDataByUrl(url);

  }
}
