import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPickupPageRoutingModule } from './order-pickup-routing.module';

import { OrderPickupPage } from './order-pickup.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from "src/app/components/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    SharedModule,
    OrderPickupPageRoutingModule
  ],
  declarations: [OrderPickupPage]
})
export class OrderPickupPageModule {}
