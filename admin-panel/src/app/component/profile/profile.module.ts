import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { RetailerProfileComponent } from './retailer-profile/retailer-profile.component';
import { IonicModule } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';
import { ShopDetailsComponent } from '../shop-details/shop-details.component';

@NgModule({
  declarations: [
    // RetailerProfileComponent,
    // ShopDetailsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    IonicModule ,
    MatIconModule,
    // RetailerProfileComponent,
    // ShopDetailsComponent

  ]
})
export class ProfileModule { }
