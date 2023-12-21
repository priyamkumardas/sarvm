import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullNotificationPageRoutingModule } from './full-notification-routing.module';

import { FullNotificationPage } from './full-notification.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullNotificationPageRoutingModule,
    SharedModule,
    PipeModule,
  ],
  declarations: [FullNotificationPage]
})
export class FullNotificationPageModule {}
