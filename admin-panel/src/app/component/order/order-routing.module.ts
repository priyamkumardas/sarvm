import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { SearchOrderComponent } from './search-order/search-order.component';
import { ShopOrdersComponent } from './shop-orders/shop-orders.component';
import { TrackOrderComponent } from './track-order/track-order.component';

const routes: Routes = [
  {
    path: 'order-details/:id',
    component:OrderDetailsComponent,
    canActivate:[]
  },
  {
    path:'track-order/:id',
    component:TrackOrderComponent,
    canActivate:[]
  },
  {
    path:'search-order',
    component:SearchOrderComponent,
    canActivate:[]
  },

  // {
  //   path:'profile-section',
  //   component:ProfileSectionComponent,
  //   canActivate:[]
  // },
  // {
  //   path:'retailer-profile/:_id',
  //   component:RetailerProfileComponent,
  //   canActivate:[]
  // },
  {
    path:'order-history',
    component:OrderHistoryComponent,
    canActivate:[]
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
