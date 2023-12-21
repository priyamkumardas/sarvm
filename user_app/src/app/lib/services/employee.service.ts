import { Injectable } from '@angular/core';
import { CommonApi } from 'src/app/lib/services/api/common.api';
import { environment } from 'src/environments/environment';
import { ApiUrls, Constants } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private commonApi: CommonApi) { }

  getAllEmployee(mangerflag){
    return this.commonApi.getDataByUrl(environment.baseUrl+ApiUrls.employee+'/?onlyManagers='+mangerflag);
  }

  getEmployee(id){
    return this.commonApi.getDataByUrl(`${environment.baseUrl}${ApiUrls.employee}/${id}`);
  }

  editEmployee(id,formData){
    return this.commonApi.putData(`${ApiUrls.employee}/${id}`,formData);
  }
  getOrganization(){
    return this.commonApi.getData(`${ApiUrls.organization}`);
  }
  deleteEmployee(id){
    return this.commonApi.deleteData(`${ApiUrls.employee}/${id}`);
  }

  addEmployee(formData){
    return this.commonApi.postData(ApiUrls.employee,formData);
  }

  editEmployeeStatus(id,formData){
    return this.commonApi.putData(`${ApiUrls.employee}/status/${id}`,formData);
  }

  getImageUploadUrl(){
    return this.commonApi.getDataByUrl(environment.baseUrl+ApiUrls.image);
  }

}
