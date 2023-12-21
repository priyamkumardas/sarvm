import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportUsPageRoutingModule } from './support-us-routing.module';

import { SupportUsPage } from './support-us.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    SupportUsPageRoutingModule
  ],
  declarations: [SupportUsPage]
})
export class SupportUsPageModule {}
