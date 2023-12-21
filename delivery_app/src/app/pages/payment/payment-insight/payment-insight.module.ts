import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentInsightPageRoutingModule } from './payment-insight-routing.module';

import { PaymentInsightPage } from './payment-insight.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from "src/app/components/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    SharedModule,
    PaymentInsightPageRoutingModule
  ],
  declarations: [PaymentInsightPage]
})
export class PaymentInsightPageModule {}
