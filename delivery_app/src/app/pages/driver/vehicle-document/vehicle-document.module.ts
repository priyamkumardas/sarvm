import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleDocumentPageRoutingModule } from './vehicle-document-routing.module';

import { VehicleDocumentPage } from './vehicle-document.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from "src/app/components/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    SharedModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    VehicleDocumentPageRoutingModule
  ],
  declarations: [VehicleDocumentPage]
})
export class VehicleDocumentPageModule {}
