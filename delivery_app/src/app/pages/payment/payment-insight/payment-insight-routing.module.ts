import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentInsightPage } from './payment-insight.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentInsightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentInsightPageRoutingModule {}
