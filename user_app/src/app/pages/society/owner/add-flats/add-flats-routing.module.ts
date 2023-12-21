import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFlatsPage } from './add-flats.page';

const routes: Routes = [
  {
    path: '',
    component: AddFlatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFlatsPageRoutingModule {}
