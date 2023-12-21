import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedAddressPage } from './saved-address.page';

const routes: Routes = [
  {
    path: '',
    component: SavedAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedAddressPageRoutingModule {}
