import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectUpiAppPageRoutingModule } from './select-upi-app-routing.module';

import { SelectUpiAppPage } from './select-upi-app.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectUpiAppPageRoutingModule,
    PipeModule
  ],
  declarations: [SelectUpiAppPage]
})
export class SelectUpiAppPageModule {}
