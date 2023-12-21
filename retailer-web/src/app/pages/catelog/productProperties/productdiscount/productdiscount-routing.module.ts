import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductdiscountPage } from './productdiscount.page';

const routes: Routes = [
  {
    path: '',
    component: ProductdiscountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductdiscountPageRoutingModule {}
