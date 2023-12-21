import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackOrderPageRoutingModule } from './track-order-routing.module';

import { TrackOrderPage } from './track-order.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackOrderPageRoutingModule,
    PipeModule
  ],
  declarations: [TrackOrderPage]
})
export class TrackOrderPageModule {}
