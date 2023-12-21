import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBlocksPage } from './add-blocks.page';

const routes: Routes = [
  {
    path: '',
    component: AddBlocksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBlocksPageRoutingModule {}
