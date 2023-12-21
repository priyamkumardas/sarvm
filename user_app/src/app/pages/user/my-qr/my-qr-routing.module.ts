import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyQrPage } from './my-qr.page';

const routes: Routes = [
  {
    path: '',
    component: MyQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyQrPageRoutingModule {}
