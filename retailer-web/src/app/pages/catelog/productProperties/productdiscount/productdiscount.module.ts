import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductdiscountPageRoutingModule } from './productdiscount-routing.module';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';

import { ProductdiscountPage } from './productdiscount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductdiscountPageRoutingModule,
    PipeModule,
  ],
  declarations: [ProductdiscountPage]
})
export class ProductdiscountPageModule {}
