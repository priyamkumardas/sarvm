import { Injectable } from '@angular/core';
import { CommonApi } from 'src/app/lib/services/api/common.api';
import { ApiUrls } from 'src/app/config/constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  updateCartValue = new Subject();
  updateCart = this.updateCartValue.asObservable();

  constructor(private commonApi: CommonApi) { }

  placeOrder(formData){
    return this.commonApi.postData(ApiUrls.order,formData);
  }

  getOrders(order_type, limit, offset, deliveryDate, orderQuery?) {
    orderQuery == undefined ? orderQuery = '' : orderQuery
    return this.commonApi.getData(`${ApiUrls.order}?limit=${limit}&offset=${offset}&status=${order_type}&deliveryDate=${deliveryDate}&orderQuery=${orderQuery}`);
  }

  getOrder(id){
    return this.commonApi.getData(`${ApiUrls.order}/${id}`);
  }

  updatePayment(id,data){
    return this.commonApi.putData(`${ApiUrls.order}/${id}/payment`,data);
  }

  cancelOrder(id){
    return this.commonApi.patchData(`${ApiUrls.order}/cancelorder/${id}`);
  }

  addInstruction(id,instructions){
    let data = {
      "instruction":instructions
    }
    return this.commonApi.putData(`${ApiUrls.order}/instruction/${id}`,data);
  }
}
