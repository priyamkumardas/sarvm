import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonApi } from './common.api';
@Injectable({
  providedIn: 'root'
})

export class ShopDataService {
  url1 = `${environment.baseUrl}/rms/apis/v1/shop/`;
  url2 = `${environment.baseUrl}/rms/apis/v2/shop/`;
  constructor(private http:HttpClient, private commonApi:CommonApi) { }
  callShopDataApi(id:any): Observable<any> {
    // return this.http.get(this.url2+id);
    return this.commonApi.callShopDataApi(id);
  }
  callShopData(pincode:any, city:any, shop_id:any, mobileNumber:any): Observable<any> {
    // return this.http.get(this.url1,
    //   {
    //     params: {
    //      pincode:pincode,
    //      city:city,
    //      shop_id:shop_id,
    //      mobileNumber:mobileNumber
    //     },
        
    // });
    return this.commonApi.callShopData(pincode, city,shop_id, mobileNumber);
  }
  updateShopDataApi(id:any, data:any){
    //  return this.http.put(this.url1+id, data);
     return this.commonApi.updateShopDataApi(id, data);
  }
  getAddressFormLatlong(lat:any, lng:any) {
    const url =
      'https://nominatim.openstreetmap.org/reverse.php?lat=' + lat + '&lon=' + lng + '&zoom=18&format=jsonv2';
    return this.commonApi.getDataByUrl(url);
  }
}
