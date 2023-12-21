import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBlocksPageRoutingModule } from './add-blocks-routing.module';

import { AddBlocksPage } from './add-blocks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddBlocksPageRoutingModule
  ],
  declarations: [AddBlocksPage]
})
export class AddBlocksPageModule {}
