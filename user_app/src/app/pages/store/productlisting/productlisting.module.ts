import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductlistingPageRoutingModule } from './productlisting-routing.module'
import { ProductlistingPage } from './productlisting.page';
import { DeliveryDayPreferenceComponent } from 'src/app/components/delivery-day-preference/delivery-day-preference.component';
import { DeliveryQuantityComponent } from 'src/app/components/delivery-quantity/delivery-quantity.component';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from "src/app/components/shared.module";
import { OptionsMenuComponent } from 'src/app/components/options-menu/options-menu.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductlistingPageRoutingModule,
    PipeModule,
    SharedModule
  ],
 
  declarations: [ ProductlistingPage ,DeliveryDayPreferenceComponent , DeliveryQuantityComponent, OptionsMenuComponent]
})
export class ProductlistingPageModule {}
