import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedCityPage } from './selected-city.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedCityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedCityPageRoutingModule {}
