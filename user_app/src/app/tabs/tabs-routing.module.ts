import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { IntroGuard } from '../lib/guard/intro.guard';
import { UserpreferenceGuard } from '../lib/guard/userpreference.guard';
import { AuthGuard } from '../lib/guard/auth.guard';

const routes: Routes = [
  {
    path: 'active-order',
    redirectTo: 'active-order/ACTIVE',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then((m) => m.HomePageModule),
        canActivate: [IntroGuard, UserpreferenceGuard],
      },
      {
        path: 'favourites',
        canActivate: [AuthGuard],
        loadChildren: () =>import('../pages/store/store-listing/store-listing.module').then((m) => m.StoreListingPageModule),
      },
      {
        path: 'active-order/:order',
        loadChildren: () =>import('../pages/order/active-order/active-order.module').then((m) => m.ActiveOrderPageModule),
      },
      {
        path: 'productlisting/:id',
        loadChildren: () =>import('../pages/store/productlisting/productlisting.module').then((m) => m.ProductlistingPageModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
