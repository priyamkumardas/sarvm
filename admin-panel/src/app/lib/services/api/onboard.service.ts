import { Injectable } from '@angular/core';
import { ApiUrls } from 'src/app/config/constants';
import { CommonService } from '../common.service';
import { CommonApi } from './common.api';
import { Observable, observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardService {

  
  constructor(private commonService: CommonService,
    private commonApi: CommonApi) { }
  
    onCreateProduct(data:any):Observable<any>{
    console.log(data);
    return this.commonApi.postData(`${ApiUrls.productdetails.products}`,data);
  }

   // Returns an observable
   upload(file:any,preSignedUrl:any):Observable<any> {
  
   
    const formData = new FormData(); 
      
   
    formData.append("file", file, file.name);
      
  
    return this.commonApi.putDataByUrl(preSignedUrl,formData);
  }

 getPresignedUrl(){
     return this.commonApi.getData(`${ApiUrls.productdetails.productImage}`)
  }

 onUpload(event:any):Observable<any>{
    return this.commonApi.putData(`${ApiUrls.productdetails.products}`,event)
  }
}

  
  
