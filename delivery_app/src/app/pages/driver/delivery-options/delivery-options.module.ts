import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryOptionsPageRoutingModule } from './delivery-options-routing.module';

import { DeliveryOptionsPage } from './delivery-options.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from "src/app/components/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    SharedModule,
    DeliveryOptionsPageRoutingModule
  ],
  declarations: [DeliveryOptionsPage]
})
export class DeliveryOptionsPageModule {}
