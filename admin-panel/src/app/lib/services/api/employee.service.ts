import { Injectable } from '@angular/core';
import { ApiUrls } from 'src/app/config/constants';
import { environment } from 'src/environments/environment';
import { CommonApi } from './common.api';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private commonApi: CommonApi) { }


  getEmployee(id:any){
     return this.commonApi.getDataByUrl(`${environment.baseUrl}${ApiUrls.employee}/${id}`);
  
  }

 
}

