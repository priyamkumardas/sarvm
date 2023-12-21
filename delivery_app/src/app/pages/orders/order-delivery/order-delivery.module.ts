import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDeliveryPageRoutingModule } from './order-delivery-routing.module';

import { OrderDeliveryPage } from './order-delivery.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from "src/app/components/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    SharedModule,
    OrderDeliveryPageRoutingModule
  ],
  declarations: [OrderDeliveryPage]
})
export class OrderDeliveryPageModule {}
