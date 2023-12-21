import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectFlatPageRoutingModule } from './select-flat-routing.module';

import { SelectFlatPage } from './select-flat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectFlatPageRoutingModule
  ],
  declarations: [SelectFlatPage]
})
export class SelectFlatPageModule {}
