import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentScreenPageRoutingModule } from './payment-screen-routing.module';

import { PaymentScreenPage } from './payment-screen.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentScreenPageRoutingModule,
    PipeModule

  ],
  declarations: [PaymentScreenPage],
  providers: [DatePipe]
})
export class PaymentScreenPageModule {}
