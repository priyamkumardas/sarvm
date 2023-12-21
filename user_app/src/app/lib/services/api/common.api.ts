import { ApiUrls } from 'src/app/config/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { GenericApi } from './shared/generic.api';

@Injectable()
export class CommonApi extends GenericApi {
  constructor(http: HttpClient) {
    super(http);
  }

  private headers = new HttpHeaders({
    skip: 'true',
  });
  private skipHttpCall = { headers: this.headers };

  private invalidateHeaders = new HttpHeaders({
    casheInvalidate: 'true',
    skip: 'true',
  });
  private invalidateHttpCallCashe = { headers: this.invalidateHeaders };

  private currentLatLong = new HttpHeaders({
    currentLatLng: 'true',
  });
  private currentLatLongSend = { headers: this.currentLatLong };

  /**
   * @name getDataByUrl
   * @type Value-returning function - Call APi to get Data by URL
   **/
  getDataByUrl(url) {
    return this.get(url);
  }

  postWithCurrentLatLon(url, data) {
    console.log(url)
    return this.post(url, data, this.currentLatLongSend);
  }

  getAllLanguage() {
    return this.get(environment.baseUrl + ApiUrls.splash);
  }

  getCDNLink(selectUrl) {
    return this.get(`${selectUrl}`, this.skipHttpCall);
  }

  getCDNLinkNoCashe(selectUrl) {
    return this.get(`${selectUrl}`, this.invalidateHttpCallCashe);
  }

  getData(url) {
    return this.get(environment.baseUrl + url);
  }

  postData(url, number) {
    return this.post(environment.baseUrl + url, number);
  }

  getDataURl(url, number) {
    return this.get(environment.baseUrl + url, number);
  }

  putData(url, number) {
    return this.put(environment.baseUrl + url, number);
  }

  patchData(url, number?) {
    return this.patch(environment.baseUrl + url, number);
  }

  deleteData(url) {
    return this.delete(environment.baseUrl + url);
  }
}
