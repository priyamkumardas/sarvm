import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreDetailsPageRoutingModule } from './store-details-routing.module';
import { MapComponentComponent } from 'src/app/components/map-component/map-component.component';

import { StoreDetailsPage } from './store-details.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreDetailsPageRoutingModule,
    PipeModule,SharedModule
  ],
  declarations: [StoreDetailsPage]
})
export class StoreDetailsPageModule {}
