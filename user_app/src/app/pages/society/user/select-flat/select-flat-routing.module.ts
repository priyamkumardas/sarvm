import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectFlatPage } from './select-flat.page';

const routes: Routes = [
  {
    path: '',
    component: SelectFlatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectFlatPageRoutingModule {}
