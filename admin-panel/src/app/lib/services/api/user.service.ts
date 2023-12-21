import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants, ApiUrls } from 'src/app/config/constants';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common.service';
import { StorageService } from '../storage.service';
import { CommonApi } from './common.api';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  user:string = '/ums/apis/v1';
  constructor(private commonApi: CommonApi, private storageservice:StorageService, private commonService:CommonService,private http:HttpClient) { }

  // getUser(){
  //   return this.commonApi.getData(`${ApiUrls.user}/${id}`);
  // }
  getUsers(_id:any){
    // return this.commonApi.getData(`${ApiUrls.user}/${}`);
    // return this.http.get(`${this.user}/users?q=${_id}`);
    // return this.http.get(`${this.user}/users/${_id}`);
    return this.commonApi.getData(`${ApiUrls.retailer}${_id}`);
  }

  

}
