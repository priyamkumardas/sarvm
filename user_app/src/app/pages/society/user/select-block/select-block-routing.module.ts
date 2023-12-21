import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectBlockPage } from './select-block.page';

const routes: Routes = [
  {
    path: '',
    component: SelectBlockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectBlockPageRoutingModule {}
