import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankDetailsPage } from './bank-details.page';
import { ScanQrCodeComponent } from './scan-qr-code/scan-qr-code.component';

const routes: Routes = [
  {
    path: '',
    component: BankDetailsPage
  },
  {
    path: 'select-upi-app',
    loadChildren: () => import('./select-upi-app/select-upi-app.module').then( m => m.SelectUpiAppPageModule)
  },
  {
    path: 'scan-qr-code', component: ScanQrCodeComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankDetailsPageRoutingModule {}
