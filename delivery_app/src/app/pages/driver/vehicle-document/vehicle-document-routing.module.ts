import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleDocumentPage } from './vehicle-document.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleDocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleDocumentPageRoutingModule {}
