import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { OtpComponent } from './otp/otp.component';
import { AddMemberPageRoutingModule } from './add-member-routing.module';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { AddMemberPage } from './add-member.page';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfilePhotoOptionComponent } from 'src/app/components/profile-photo-option/profile-photo-option.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddMemberPageRoutingModule,
    PipeModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [AddMemberPage , OtpComponent, ProfilePhotoOptionComponent]
})
export class AddMemberPageModule {}
