import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectVehiclePageRoutingModule } from './select-vehicle-routing.module';

import { SelectVehiclePage } from './select-vehicle.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from "src/app/components/shared.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    SharedModule,
    SelectVehiclePageRoutingModule
  ],
  declarations: [SelectVehiclePage]
})
export class SelectVehiclePageModule {}
