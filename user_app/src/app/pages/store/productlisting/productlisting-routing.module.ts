import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductlistingPage } from './productlisting.page';

const routes: Routes = [
  {
    path: '',
    component: ProductlistingPage,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductlistingPageRoutingModule {}
