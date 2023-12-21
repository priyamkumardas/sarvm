import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { InterceptorService } from './lib/services/interceptor.service';

import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { LanguageService } from './lib/services/language.service';
import { LocationService } from './lib/services/location.service';
import { OnboardService } from './lib/services/onboard.service';
import { CommonApi } from './lib/services/api/common.api';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';

import { SharedModule } from "src/app/components/shared.module";
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FormsModule } from '@angular/forms';

// Import storage module
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';



@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    IonicStorageModule.forRoot({
      name: '__userdb',
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage],
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CommonApi,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },

    FilePath,
    Camera,
    AndroidPermissions,
    Geolocation,
    FileTransfer,
    AppVersion,
    File,
    SMS,
    LanguageService,
    LocationService,
    OnboardService,
    InAppBrowser,
    Storage
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
