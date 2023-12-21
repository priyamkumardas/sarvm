import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplitProfilePageRoutingModule } from './split-profile-routing.module';

import { SplitProfilePage } from './split-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplitProfilePageRoutingModule
  ],
  declarations: [SplitProfilePage]
})
export class SplitProfilePageModule {}
