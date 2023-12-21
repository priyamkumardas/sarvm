import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectBlockPageRoutingModule } from './select-block-routing.module';

import { SelectBlockPage } from './select-block.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectBlockPageRoutingModule
  ],
  declarations: [SelectBlockPage]
})
export class SelectBlockPageModule {}
