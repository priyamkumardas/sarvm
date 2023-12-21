import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreListingPage } from './store-listing.page';

const routes: Routes = [
  {
    path: '',
    component: StoreListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreListingPageRoutingModule {}
