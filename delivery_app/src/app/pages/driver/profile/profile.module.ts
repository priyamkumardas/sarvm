import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { ProfilePage } from './profile.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    PipeModule,
    SharedModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
