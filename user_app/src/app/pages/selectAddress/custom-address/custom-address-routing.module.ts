import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomAddressPage } from './custom-address.page';

const routes: Routes = [
  {
    path: '',
    component: CustomAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomAddressPageRoutingModule {}
