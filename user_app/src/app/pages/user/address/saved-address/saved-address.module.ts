import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedAddressPageRoutingModule } from './saved-address-routing.module';

import { SavedAddressPage } from './saved-address.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { DeletePopupComponent } from 'src/app/components/delete-popup/delete-popup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    SavedAddressPageRoutingModule
  ],
  declarations: [SavedAddressPage, DeletePopupComponent]
})
export class SavedAddressPageModule {}
