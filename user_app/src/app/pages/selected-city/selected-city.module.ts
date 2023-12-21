import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedCityPageRoutingModule } from './selected-city-routing.module';

import { SelectedCityPage } from './selected-city.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedCityPageRoutingModule,
    PipeModule
  ],
  declarations: [SelectedCityPage]
})
export class SelectedCityPageModule {}
