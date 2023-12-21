import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectSocietyPage } from './select-society.page';

const routes: Routes = [
  {
    path: '',
    component: SelectSocietyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectSocietyPageRoutingModule {}
