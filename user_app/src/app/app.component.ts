import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/lib/services/catalouge.service';
import { FirebaseService } from "src/app/lib/services/firebase.service";
import { Platform } from '@ionic/angular';
import { ReferralService } from 'src/app/referal/referral.service';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private catalogueService: CatalogueService,
    private firebaseService: FirebaseService,
    private referalService:ReferralService,
    ) {}

 async ngOnInit() { 
    this.getSpashScreenData();
    this.platform.ready().then(async () => {
      if (this.platform.is('cordova')) {
        this.initFlyy();
        this.firebaseService.initPush();
        console.log('capacitor');
        // await SplashScreen.hide();
      }
    });
  }

  /**
   * @name getSpashScreenData
   * @type Function - Get all categories, microcategories, and products. And store into localStorage
   * **/
  getSpashScreenData() {
    this.catalogueService.getSplashApi();
  }

  initFlyy(){
    this.referalService.initFlyy();
    this.referalService.setAppPackage();
    this.referalService.setThemeColor();
  }

  
}
