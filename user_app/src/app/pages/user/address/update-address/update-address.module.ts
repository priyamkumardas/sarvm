import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAddressPageRoutingModule } from './update-address-routing.module';

import { UpdateAddressPage } from './update-address.page';
import { MapComponentComponent } from 'src/app/components/map-component/map-component.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { SharedModule } from "src/app/components/shared.module";
import { PipeModule } from 'src/app/lib/pipe/pipes.module';

import { HomePage } from 'src/app/pages/home/home.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    UpdateAddressPageRoutingModule,
    SharedModule,
  ],
  declarations: [UpdateAddressPage ],
  providers:[HomePage]
})
export class UpdateAddressPageModule {}
