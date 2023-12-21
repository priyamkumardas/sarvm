import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonApi } from './lib/services/api/common.api';
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ConsumerComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    IonicModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    QRCodeModule
  ],
  providers: [
    CommonApi,
    
  ],
  bootstrap: [AppComponent, ErrorPageComponent],
})
export class AppModule { }
