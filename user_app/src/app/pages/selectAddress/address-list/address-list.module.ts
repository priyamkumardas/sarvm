import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressListPageRoutingModule } from './address-list-routing.module';

import { AddressListPage } from './address-list.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { HomePage } from '../../home/home.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressListPageRoutingModule,
    PipeModule
  ],
  declarations: [AddressListPage],
  providers:[HomePage]
})
export class AddressListPageModule {}
