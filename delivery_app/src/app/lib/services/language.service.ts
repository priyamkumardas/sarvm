import { Injectable } from '@angular/core';
import { ApiUrls } from 'src/app/config/constants';
import { environment } from 'src/environments/environment';
import { CommonApi } from './api/common.api';
import { forkJoin, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  current_language: string;

  constructor(
    // private translate: TranslateService,  
    private commonService: CommonService,
    private commonApi: CommonApi,) { }

  getAllLanguagesSplashApi() {
    return this.commonApi.getDataByUrl(environment.baseUrl + ApiUrls.splash)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  selectLanguageCDN(Url) {
    return this.commonApi.getCDNLink(Url)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  private errorHandler(err) {
    this.commonService.toast(err.error.errorMessage);
    return throwError(err);
  }
}