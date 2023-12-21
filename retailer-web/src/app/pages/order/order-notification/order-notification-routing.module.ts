import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderNotificationPage } from './order-notification.page';

const routes: Routes = [
  {
    path: '',
    component: OrderNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderNotificationPageRoutingModule {}
