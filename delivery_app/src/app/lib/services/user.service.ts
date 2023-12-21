import { Injectable } from '@angular/core';
import { CommonApi } from 'src/app/lib/services/api/common.api';
import { environment } from 'src/environments/environment';
import { ApiUrls, Constants } from 'src/app/config/constants';
import { StorageService } from './storage.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private commonApi: CommonApi, private storageservice: StorageService, private commonService: CommonService) { }
  getUid() {
    console.log(this.commonService.parseJwt(this.storageservice.getItem(Constants.AUTH_TOKEN)).userId)
    return this.commonService.parseJwt(this.storageservice.getItem(Constants.AUTH_TOKEN)).userId
  }
  getUserImageUploadUrl() {
    return this.commonApi.getDataByUrl(environment.baseUrl + ApiUrls.image);
  }
  getUserDetails() {
    return this.commonApi.getData(`${ApiUrls.user}/${this.getUid()}`);
  }
  getUserProfileImageUploadUrl() {
    return this.commonApi.getDataByUrl(environment.baseUrl + ApiUrls.profileUpload);
  }

  addUserDetails(formData) {
    return this.commonApi.putData(`${ApiUrls.user}/${this.getUid()}`, formData);
  }

  deleteAccount(id: any) {
    return this.commonApi.deleteData(`${ApiUrls.user}/${id}`);
  }
  
  getQrCodeImageUploadUrl() {
    return this.commonApi.getDataByUrl(environment.baseUrl + ApiUrls.qrCodeUpload);
  }

  // User UPI Data

  getUPI(userId) {
    return this.commonApi.getData(`${ApiUrls.getDeleteDeliveryUpi}/${userId}`);
  }

  createUPI(userId, form) {
    return this.commonApi.postData(`${ApiUrls.deliveryUpi}`, form);
  }

  updateUPI(paymentInfoId, form) {
    return this.commonApi.putData(`${ApiUrls.deliveryUpi}/${paymentInfoId}`, form);
  }

  deleteUPI(paymentInfoId) {
    return this.commonApi.deleteData(`${ApiUrls.getDeleteDeliveryUpi}/${paymentInfoId}`);
  }

  getRetailerUPI(retailerInfoId) {
    return this.commonApi.getData(`${ApiUrls.retailerUpi}/${retailerInfoId}/paymentInfo`);
  }

}
