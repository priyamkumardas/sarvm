import { Component, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/lib/services/common.service';
import { ProductsService } from './lib/services/products.service';
import { environment } from 'src/environments/environment';
import { ReferralService } from './referal/referral.service';
import { FirebaseService } from './lib/services/firebase.service';
import { IonRouterOutlet, Platform, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
import { StorageService } from './lib/services/storage.service';
import { LocationService } from './lib/services/location.service';
import { Constants } from './config/constants';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isToggle: boolean;
  @ViewChild(IonRouterOutlet, {static: true}) routerOutlet: IonRouterOutlet;

  constructor(private productsService: ProductsService,
    private firebaseService: FirebaseService,
    private commonService: CommonService,
    private platform: Platform,
    private location: Location,
    public alertController: AlertController,
    private refferalService: ReferralService,
    public storgeService: StorageService,
    private locationService: LocationService,) {
      this.backButtonEvent();
    }

  ngOnInit(): void {
    this.firebaseService.initPush();
    this.getSpashScreenData();
    this.refferalService.setAppPackage()
    this.refferalService.initFlyy()
    this.refferalService.setThemeColor();
    this.isToggle = this.storgeService.getItem(Constants.APP_ONLINE_OFFLINE);
      if(this.isToggle) {
        this.locationService.startWatchPosition();
      }
  }

  /**
   * @name getSpashScreenData
   * @type Function - Get all store into localStorage
   * **/
  getSpashScreenData() {
    this.productsService.getSplashApi().subscribe((res: any) => {
      //////////////// App version ////////////////////////////
      if (res && res.data && res.data.appVersions) {
        if (environment.app_name == 'logisticsDelivery') {
          this.commonService.remoteAppVersionName = res.data.appVersions.logistics;
          this.commonService.appCheckUpdate();
        }
      }
    });
  }

  backButtonEvent(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      if(!this.routerOutlet.canGoBack()){
        const checkPropmt = this.alertController.getTop();
        if(checkPropmt){
          this.confirmback();
        }        
      } else {
        this.location.back();
      }
    });
  }

  async confirmback() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
        },
        {
          text: 'YES',
          role: 'confirm',
          handler: () => {
            this.alertController.dismiss();
            App.exitApp();
          },
        },
      ],
    });
    await alert.present();
  }
}
