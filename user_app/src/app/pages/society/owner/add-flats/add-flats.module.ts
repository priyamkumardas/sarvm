import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFlatsPageRoutingModule } from './add-flats-routing.module';

import { AddFlatsPage } from './add-flats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFlatsPageRoutingModule
  ],
  declarations: [AddFlatsPage]
})
export class AddFlatsPageModule {}
