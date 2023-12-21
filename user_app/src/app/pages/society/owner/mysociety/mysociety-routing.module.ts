import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MysocietyPage } from './mysociety.page';

const routes: Routes = [
  {
    path: '',
    component: MysocietyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MysocietyPageRoutingModule {}
