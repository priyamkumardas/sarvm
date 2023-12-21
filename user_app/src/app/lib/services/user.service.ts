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
    return this.commonService.parseJwt(this.storageservice.getItem(Constants.AUTH_TOKEN)).userId
  }

  getAllAddress() {
    return this.commonApi.getDataByUrl(`${environment.baseUrl + ApiUrls.user}/${this.getUid()}/address`);
  }

  getAddress(aid) {
    return this.commonApi.getDataByUrl(`${environment.baseUrl + ApiUrls.user}/${this.getUid()}/address/${aid}`);
  }

  editAddress(aid, formData) {
    formData.location.latitude = formData.location.latitude.toString();
    formData.location.longitude = formData.location.longitude.toString();
    return this.commonApi.putData(`${ApiUrls.user}/${this.getUid()}/address/${aid}`, formData);
  }

  deleteAddress(aid) {
    return this.commonApi.deleteData(`${ApiUrls.user}/${this.getUid()}/address/${aid}`);
  }

  addAddress(formData) {
    formData.location.latitude = formData.location.latitude.toString();
    formData.location.longitude = formData.location.longitude.toString();
    return this.commonApi.postData(`${ApiUrls.user}/${this.getUid()}/address`, formData);
  }

  addFavourite(formData) {
    return this.commonApi.postData(`${ApiUrls.favourites}/${this.getUid()}`, formData);
  }

  getFavouriteShop() {
    return this.commonApi.getData(`${ApiUrls.favourites}/${this.getUid()}`);
  }

  getUserDetails() {
    return this.commonApi.getData(`${ApiUrls.user}/${this.getUid()}`);
  }

  addUserDetails(formData) {
    return this.commonApi.putData(`${ApiUrls.user}/${this.getUid()}`, formData);
  }
  getUserImageUploadUrl() {
    return this.commonApi.getDataByUrl(environment.baseUrl + ApiUrls.image);
  }
  getUserProfileImageUploadUrl() {
    return this.commonApi.getDataByUrl(environment.baseUrl + ApiUrls.profileUpload);
  }
  deleteAccount(id: any) {
    return this.commonApi.deleteData(`${ApiUrls.user}/${id}`);
  }

}

