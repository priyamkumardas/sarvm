import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleTimePageRoutingModule } from './schedule-time-routing.module';

import { ScheduleTimePage } from './schedule-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleTimePageRoutingModule
  ],
  declarations: [ScheduleTimePage]
})
export class ScheduleTimePageModule {}
