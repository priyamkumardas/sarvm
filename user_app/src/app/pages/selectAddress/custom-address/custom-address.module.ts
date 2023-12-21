import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomAddressPageRoutingModule } from './custom-address-routing.module';

import { CustomAddressPage } from './custom-address.page';
import { MapComponentComponent } from 'src/app/components/map-component/map-component.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { SharedModule } from "src/app/components/shared.module";
import { HomePage } from 'src/app/pages/home/home.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomAddressPageRoutingModule,
    PipeModule,
    SharedModule
  ],
  declarations: [CustomAddressPage],
  providers:[HomePage]

})
export class CustomAddressPageModule {}
