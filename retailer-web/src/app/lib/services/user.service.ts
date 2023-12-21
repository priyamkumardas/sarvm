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
  getUserProfileImageUploadUrl() {
    return this.commonApi.getDataByUrl(environment.baseUrl + ApiUrls.profileUpload);
  }
  getUserDetails() {
    return this.commonApi.getData(`${ApiUrls.user}/${this.getUid()}`);
  }

  addUserDetails(formData) {
    return this.commonApi.putData(`${ApiUrls.user}/${this.getUid()}`, formData);
  }
}
