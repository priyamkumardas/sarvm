import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreListingPageRoutingModule } from './store-listing-routing.module';
import { StoreListingPage } from './store-listing.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { SharedModule } from "src/app/components/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreListingPageRoutingModule,
    PipeModule,
    SharedModule
  ],
  declarations: [StoreListingPage, ]
})
export class StoreListingPageModule {}
