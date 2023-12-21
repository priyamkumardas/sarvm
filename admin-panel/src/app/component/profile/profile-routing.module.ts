import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopDetailsComponent } from '../shop-details/shop-details.component';
import { RetailerProfileComponent } from './retailer-profile/retailer-profile.component';

const routes: Routes = [
  {
    path:'retailer-profile',
    component:RetailerProfileComponent,
    canActivate:[]
  },
  {
    path:'shopDetails/:_id',
    component:ShopDetailsComponent,
    canActivate:[]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
