import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullNotificationPage } from './full-notification.page';

const routes: Routes = [
  {
    path: '',
    component: FullNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullNotificationPageRoutingModule {}
