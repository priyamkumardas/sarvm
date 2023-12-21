import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayorderPageRoutingModule } from './payorder-routing.module';

import { PayorderPage } from './payorder.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    PayorderPageRoutingModule
  ],
  declarations: [PayorderPage]
})
export class PayorderPageModule {}
