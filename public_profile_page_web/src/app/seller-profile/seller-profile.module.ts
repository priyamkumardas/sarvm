import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { SellerProfileRoutingModule } from './seller-profile-routing.module';
import { SellerProfileComponent } from './seller-profile.component';


@NgModule({
  declarations: [
    SellerProfileComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SellerProfileRoutingModule,
    QRCodeModule,
    
  ]
  
})
export class SellerProfileModule { }
