import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MysocietyPageRoutingModule } from './mysociety-routing.module';

import { MysocietyPage } from './mysociety.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MysocietyPageRoutingModule
  ],
  declarations: [MysocietyPage]
})
export class MysocietyPageModule {}
