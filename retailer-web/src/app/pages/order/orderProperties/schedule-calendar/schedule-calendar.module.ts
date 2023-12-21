import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleCalendarPageRoutingModule } from './schedule-calendar-routing.module';

import { ScheduleCalendarPage } from './schedule-calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleCalendarPageRoutingModule
  ],
  declarations: [ScheduleCalendarPage]
})
export class ScheduleCalendarPageModule {}
