import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivinginPageRoutingModule } from './livingin-routing.module';

import { LivinginPage } from './livingin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivinginPageRoutingModule
  ],
  declarations: [LivinginPage]
})
export class LivinginPageModule {}
