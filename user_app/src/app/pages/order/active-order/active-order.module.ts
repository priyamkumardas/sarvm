import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveOrderPageRoutingModule } from './active-order-routing.module';

import { ActiveOrderPage } from './active-order.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from "src/app/components/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveOrderPageRoutingModule,
    PipeModule,
    SharedModule
  ],
  declarations: [ActiveOrderPage]
})
export class ActiveOrderPageModule {}
