import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddsocietyPageRoutingModule } from './addsociety-routing.module';

import { AddsocietyPage } from './addsociety.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddsocietyPageRoutingModule
  ],
  declarations: [AddsocietyPage]
})
export class AddsocietyPageModule {}
