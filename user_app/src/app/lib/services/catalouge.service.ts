import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { forkJoin, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonApi } from './api/common.api';
import { CommonService } from './common.service';
import { ApiUrls, Constants } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  constructor(
    private commonApi: CommonApi,
    private commonService: CommonService,
    private storageService: StorageService
  ) {}

  homegetProductsList(url) {
    return forkJoin({
      categoryData: this.commonApi.getCDNLink(url.categoryData),
    }).pipe(
      catchError((err) => this.errorHandler(err)),
      map(({ categoryData }) => ({
        // productsData,
        categoryData,
        // microCategoryData,
      }))
    );
  }

  getmerchantListArray(category) {
    const url = `${environment.baseUrl + ApiUrls.stores}?limit=10&offset=2&category=${category}`;
    return this.commonApi.getDataByUrl(url);
  }

  getmerchant(url) {
    return this.commonApi.getCDNLinkNoCashe(url);
  }

  getSplashApi() {
    const url = environment.baseUrl + ApiUrls.splash;
    this.commonApi.getDataByUrl(url).subscribe((res: any) => {
      //////////////// App version ////////////////////////////
      if (res && res.data && res.data.appVersions){
        if(environment.app_name=='householdApp'){
          this.commonService.remoteAppVersionName=res.data.appVersions.household;
          this.commonService.appCheckUpdate();
        }else if (environment.app_name=='retailerApp') {
          this.commonService.remoteAppVersionName=res.data.appVersions.retailer;
          this.commonService.appCheckUpdate();
        }
      }
      //////////////// App version ////////////////////////////
      if (res && res.data && res.data.catalogue_meta) {
        const urls = {
          categoryData: res.data.catalogue_meta['categories'].url,
        };
        const catVersion = +res.data.catalogue_meta.categories.version;
        const productVersion = +res.data.catalogue_meta.products.version;
        const microVersion = +res.data.catalogue_meta.microCategpries.version;
        const previousVersion = this.storageService.getItem(Constants.VERSION_CONTROL);

        if (catVersion + productVersion + microVersion > previousVersion) {
          this.homegetProductsList(urls).subscribe((data) => {
            if (data) {
              this.storageService.setCat(Constants.PRODUCT_DATA, data);
              this.storageService.setItem(Constants.VERSION_CONTROL,catVersion + productVersion + microVersion);
            }
          });
        }
      }
    });
  }

  getCategories(categoriesData) {
    const url = `${environment.baseUrl + ApiUrls.category}?limit=${categoriesData.limit}&offset=${categoriesData.offset}&city=${categoriesData.city}`;
    return this.commonApi.getDataByUrl(url);
  }

  private errorHandler(err) {
    this.commonService.toast(err.error.errorMessage);
    return throwError(err);
  }
}
