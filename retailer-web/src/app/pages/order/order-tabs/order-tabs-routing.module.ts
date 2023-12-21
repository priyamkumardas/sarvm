import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderTabsPage } from './order-tabs.page';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: OrderTabsPage,
    children: [
      {
        path: 'order',
        children: [
          {
            path: '',
            loadChildren: () => import('../../../pages/order/order/order.module').then((m) => m.OrderPageModule),
          },
        ]
      },
      /* {
        path: 'order',
        children: [
          {
            path: '',
            loadChildren: () => import('../../../pages/order/order/order.module').then((m) => m.OrderPageModule),
          }
        ]
      }, */
      {
        path: 'order-history',
        children: [
          {
            path: '',
            loadChildren: () => import('../../../pages/order/order-history/order-history.module').then((m) => m.OrderHistoryPageModule),
          }
        ]
      },
      {
        path: 'order-notification',
        children: [
          {
            path: '',
            loadChildren: () => import('../../../pages/order/order-notification/order-notification.module').then((m) => m.OrderNotificationPageModule),
          }
        ]
      },
      {
        path: '',
        redirectTo: '/order-tabs/order',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/order-tabs/order',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [IonicModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderTabsPageRoutingModule {}
