import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { GenericApi } from './shared/generic.api';
import { ApiUrls } from 'src/app/config/constants';

@Injectable()
export class CommonApi extends GenericApi {
  

  private headers = new HttpHeaders({
    skip: 'true',
  });
  private skipHttpCall = { headers: this.headers };

  constructor(http: HttpClient) {
    super(http);
  }

 
  getStoreDetails(id:any){
    return this.get(`${ApiUrls.sellerProfile}${environment.s3_bucket_name}/shops/${id}/profile.json`, this.skipHttpCall)
  }
  
}
