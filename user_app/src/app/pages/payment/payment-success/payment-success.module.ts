import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSuccessPageRoutingModule } from './payment-success-routing.module';

import { PaymentSuccessPage } from './payment-success.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentSuccessPageRoutingModule,
    PipeModule
  ],
  declarations: [PaymentSuccessPage]
})
export class PaymentSuccessPageModule {}
