import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ActiveOrdersComponent } from './active-orders/active-orders.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import {MatCardModule} from '@angular/material/card';
import { IonicModule } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ShopOrdersComponent } from './shop-orders/shop-orders.component';
import { SearchOrderComponent } from './search-order/search-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';








@NgModule({
  declarations: [
    OrderDetailsComponent,
    SearchOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatCardModule,
    IonicModule ,
    MatIconModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
   
   
  ]
})
export class OrderModule { }
