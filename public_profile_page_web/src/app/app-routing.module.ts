import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ConsumerComponent } from './consumer/consumer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'error-page',
    pathMatch: 'full',
  },
  {
    path: 'shops/:id',
    loadChildren: () =>
      import('./seller-profile/seller-profile.module').then((m) => m.SellerProfileModule),
    //canActivate: [AuthGuard,ShopGuard],
  },
  {
    path: 'shop/:id',
    loadChildren: () =>
      import('./seller-profile/seller-profile.module').then((m) => m.SellerProfileModule),
    //canActivate: [AuthGuard,ShopGuard],
  },
  {
   path: 'SarvmAllApplications', component: ErrorPageComponent 
  },
  {
    path: 'consumer/:id', component: ConsumerComponent 
  },
  {
    path: 'consumers/:id', component: ConsumerComponent 
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
