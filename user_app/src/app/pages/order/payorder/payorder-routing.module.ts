import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayorderPage } from './payorder.page';

const routes: Routes = [
  {
    path: '',
    component: PayorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayorderPageRoutingModule {}
