import { Injectable } from '@angular/core';
import { CommonApi } from 'src/app/lib/services/api/common.api';
import { environment } from 'src/environments/environment';
import { ApiUrls, Constants } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private commonApi: CommonApi) { }

  placeOrder(formData: any){
    return this.commonApi.postData(ApiUrls.order,formData);
  }

  getOrders(){
    return this.commonApi.getData(ApiUrls.order);
  }
  getOrder(id: any){
    return this.commonApi.getData(`${ApiUrls.order}/${id}`);
  }


  updatePayment(id: any,data: any){
    return this.commonApi.putData(`${ApiUrls.order}/${id}/payment`,data);
  }

  cancelOrder(id: any){
    return this.commonApi.patchData(`${ApiUrls.order}/cancelorder/${id}`);
  }
  getAllShopOrder(id:any)
  {
     return this.commonApi.getData(`${ApiUrls.retailOrder}admin/${id}?status=ALL`);
  }
  getOrderDetails(id:any)
  {
     return this.commonApi.getData(`${ApiUrls.retailOrder}${id}`);
  }
  addInstruction(id: any,instructions: any){
    let data = {
      "instruction":instructions
    }
    return this.commonApi.putData(`${ApiUrls.order}/instruction/${id}`,data);
  }
}
