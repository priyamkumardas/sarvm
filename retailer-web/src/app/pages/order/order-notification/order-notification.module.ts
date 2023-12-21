import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderNotificationPageRoutingModule } from './order-notification-routing.module';

import { OrderNotificationPage } from './order-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderNotificationPageRoutingModule
  ],
  declarations: [OrderNotificationPage]
})
export class OrderNotificationPageModule {}
