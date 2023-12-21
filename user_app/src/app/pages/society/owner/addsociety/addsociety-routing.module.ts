import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsocietyPage } from './addsociety.page';

const routes: Routes = [
  {
    path: '',
    component: AddsocietyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsocietyPageRoutingModule {}
