import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructionPageRoutingModule } from './instruction-routing.module';

import { InstructionPage } from './instruction.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructionPageRoutingModule,
    PipeModule
  ],
  declarations: [InstructionPage]
})
export class InstructionPageModule {}
