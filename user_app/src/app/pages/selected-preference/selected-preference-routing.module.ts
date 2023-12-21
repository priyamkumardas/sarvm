import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedPreferencePage } from './selected-preference.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedPreferencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedPreferencePageRoutingModule {}
