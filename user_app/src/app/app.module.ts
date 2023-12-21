import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { InterceptorService } from './lib/services/interceptor.service';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';

import { LanguageService } from './lib/services/language.service';
import { LocationService } from './lib/services/location.service';
// import { OfflineService } from './lib/services/offline.service';
import { StorageService } from './lib/services/storage.service';
import { PhotoService } from './lib/services/photo.service';
import { CommonService } from './lib/services/common.service';
import { SpeechrecognitionService } from './lib/services/speechrecognition.service';
import { CommonApi } from './lib/services/api/common.api';
import { ReferralService } from './referal/referral.service';
import { EmployeeService } from 'src/app/lib/services/employee.service';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { InviteModalComponent } from './referal/invite-modal/invite-modal.component';
import { EmployeeRoleFilterComponent } from './pages/employees/employee-role-filter/employee-role-filter.component';
import { EmployeeOrgFilterComponent } from './pages/employees/employee-org-filter/employee-org-filter.component';
import { DatePickerComponent } from './pages/employees/date-picker/date-picker.component';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SharedModule } from 'src/app/components/shared.module'
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { ReferralRatingComponent } from "src/app/referal/referral-rating/referral-rating.component";
import { ReferalQrScannerComponent } from 'src/app/referal/referal-qr-scanner/referal-qr-scanner.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SellerProfileComponent } from 'src/app/components/seller-profile/seller-profile.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [AppComponent,EmployeeRoleFilterComponent, DatePickerComponent,EmployeeOrgFilterComponent, ReferalQrScannerComponent, SellerProfileComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    SharedModule,
    QRCodeModule,
    IonicStorageModule.forRoot({
      name: '__userdb',
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage],
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    DatePipe,
    File,
    FileTransfer,
    Geolocation,
    SpeechRecognition,
    AppVersion,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    LanguageService,
    LocationAccuracy,
    CommonService,
    StorageService,
    // OfflineService,
    LocationService,
    EmployeeService,
    PhotoService,
    SpeechrecognitionService,
    ReferralService,
    CommonApi,
    FilePath,
    Camera,
    AndroidPermissions,
    SMS,
    InAppBrowser,
    SocialSharing,
    SmsRetriever,
    //FirebaseCrashlytics,
    //{ provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
