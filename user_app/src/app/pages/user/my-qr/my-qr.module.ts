import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { IonicModule } from '@ionic/angular';
import { MyQrPageRoutingModule } from './my-qr-routing.module';
import { MyQrPage } from './my-qr.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    MyQrPageRoutingModule
  ],
  declarations: [MyQrPage]
})
export class MyQrPageModule {}
