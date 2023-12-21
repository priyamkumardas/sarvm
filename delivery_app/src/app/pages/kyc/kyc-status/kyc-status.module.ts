import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KycStatusPageRoutingModule } from './kyc-status-routing.module';

import { KycStatusPage } from './kyc-status.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from "src/app/components/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    IonicModule,
    KycStatusPageRoutingModule,
    PipeModule,
    SharedModule
  ],
  declarations: [KycStatusPage]
})
export class KycStatusPageModule {}
