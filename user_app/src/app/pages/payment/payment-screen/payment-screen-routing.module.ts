import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentScreenPage } from './payment-screen.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentScreenPageRoutingModule {}
