import { Component, OnInit } from '@angular/core';
import { ProductsService } from './lib/services/products.service';
import { StorageService } from './lib/services/storage.service';
import { ReferralService } from "src/app/referal/referral.service";
import { Constants } from 'src/app/config/constants';
import { FirebaseService } from "src/app/lib/services/firebase.service";
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private storageService: StorageService,
    private refferalService: ReferralService,
    private firebaseService: FirebaseService,
    private commonService: CommonService,
    private storage: Storage

  ) { }

  async ngOnInit() {
    this.firebaseService.initPush();
    this.getSpashScreenData();
    this.refferalService.setAppPackage()
    this.refferalService.initFlyy()
    this.refferalService.setThemeColor();

    await this.storage.create();
  }

  /**
   * @name getSpashScreenData
   * @type Function - Get all categories, microcategories, and products. And store into localStorage
   * **/
  getSpashScreenData() {
    this.productsService.getSplashApi().subscribe((res: any) => {
      //////////////// App version ////////////////////////////
      //debugger
      if (res && res.data && res.data.appVersions) {
        if (environment.app_name == 'householdApp') {
          this.commonService.remoteAppVersionName = res.data.appVersions.household;
          this.commonService.appCheckUpdate();
        } else if (environment.app_name == 'retailerApp') {
          this.commonService.remoteAppVersionName = res.data.appVersions.retailer;
          this.commonService.appCheckUpdate();
        }
      }
      //////////////// App version ////////////////////////////
      if (res && res.data && res.data.catalogue_meta) {
        // const urls = {
        //   productsData: res.data.catalogue_meta['products'].url,
        //   categoryData: res.data.catalogue_meta['categories'].url,
        //   microCategoryData: res.data.catalogue_meta['microCategpries'].url,
        // };

        const urls = {
          masterCatalogData: res.data.catalogue_meta['masterCatalog'][0].url
        }

        this.productsService.homegetProductsList(urls).subscribe((data) => {
          if (data) {
            //this.storageService.setItem(Constants.PRODUCT_DATA, data);
            // this.storageService.setItemNativeCatalog(Constants.PRODUCT_DATA, data);
            //console.log("Value 1: "+JSON.stringify(value));  
            //console.log("Value 2: "+value);  
            try {
              let stringifyData = JSON.stringify(data)
              this.storage?.set(Constants.PRODUCT_DATA, stringifyData).then(
                () => console.log('Stored item!'),
                error => console.error('Error storing item', error)
              ).catch((err)=>{
                console.log(err)
              });
            } catch (error) {
              console.log(error)
            }


          }
        });
      }
    });
  }
}
