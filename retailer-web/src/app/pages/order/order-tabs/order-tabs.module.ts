import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderTabsPageRoutingModule } from './order-tabs-routing.module';

import { OrderTabsPage } from './order-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderTabsPageRoutingModule
  ],
  declarations: [OrderTabsPage]
})
export class OrderTabsPageModule {}
