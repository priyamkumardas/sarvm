import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleDatePageRoutingModule } from './schedule-date-routing.module';

import { ScheduleDatePage } from './schedule-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleDatePageRoutingModule
  ],
  declarations: [ScheduleDatePage]
})
export class ScheduleDatePageModule {}
