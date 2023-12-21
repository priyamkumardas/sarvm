import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SelectedPreferencePageRoutingModule } from './selected-preference-routing.module';
import { SelectedPreferencePage } from './selected-preference.page';

import { PipeModule } from 'src/app/lib/pipe/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    
    SelectedPreferencePageRoutingModule,
    PipeModule
  ],
  declarations: [SelectedPreferencePage]
})
export class SelectedPreferencePageModule {}
