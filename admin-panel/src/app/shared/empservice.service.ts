import { Injectable } from '@angular/core';
import{HttpClient, HttpParams} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { ApiUrls, Constants } from 'src/app/config/constants';
import { CommonApi } from '../lib/services/api/common.api';

@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {

  constructor(private http:HttpClient,
    private commonApi: CommonApi) { }

   url ="https://uat-api.sarvm.ai/ums/apis/v1/employee/?onlyManagers=true";
   empUrl = "{{gateway}}/ums/apis/v1/users/635f685be95a2f5a05481214"


   getEmpData() {
    let httpHeaders = {
      'Content-Type': 'application/x-www-urlencoded',
      'mimeType': 'multipart/form-data',
      //'Authorization': 'Bearer ' + localStorage.getItem(environment.BASE_CLAIMS.tokenStorage)
    };
    let params = new HttpParams();
    params = params.append('app_name', 'admin');
    params = params.append('version_code', 'version_code');

    return this.http.get(`${this.url}`, { headers: httpHeaders, params: params });
  }

  getKycDetails() {
    const url = environment.baseUrl + ApiUrls.KYC_DETAILS;
    return this.commonApi.getDataByUrl(url);
  }
  getEmployee(id: any){
   return this.commonApi.getDataByUrl(`${environment.baseUrl}${ApiUrls.employee}/${id}`);
  }
  getemployeeDetails(){
    return this.commonApi.getDataByUrl(`${environment.baseUrl}${ApiUrls.employee}`);
  }

}
 