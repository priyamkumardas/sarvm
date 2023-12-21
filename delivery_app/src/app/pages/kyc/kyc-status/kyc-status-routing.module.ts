import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KycStatusPage } from './kyc-status.page';

const routes: Routes = [
  {
    path: '',
    component: KycStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KycStatusPageRoutingModule {}
