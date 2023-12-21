import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripHistoryPageRoutingModule } from './trip-history-routing.module';

import { TripHistoryPage } from './trip-history.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from "src/app/components/shared.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    SharedModule,
    TripHistoryPageRoutingModule
  ],
  declarations: [TripHistoryPage]
})
export class TripHistoryPageModule {}
