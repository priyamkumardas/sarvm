import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../lib/pipe/pipes.module';


import { EmptyListComponent } from './empty-list/empty-list.component';
import { MapComponentComponent } from "src/app/components/map-component/map-component.component";
import { SearchComponent } from "src/app/components/search/search.component";
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import {StoreListingComponent  } from "./store-listing/store-listing.component";
import { BottomTabViewComponent } from 'src/app/components/bottom-tab-view/bottom-tab-view.component';
import { SupprtCallComponent } from '../pages/supprt-call/supprt-call.component';
import { MonthsPickerComponent } from '../referal/months-picker/months-picker.component';

const COMPONENTS = [
  MapComponentComponent,
  EmptyListComponent,
  SearchComponent,
  EditUserProfileComponent,
  StoreListingComponent,
  BottomTabViewComponent,
  SupprtCallComponent,
  MonthsPickerComponent
];
@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
  ],
  exports: [
    CommonModule,
    ...COMPONENTS
  ],
})
export class SharedModule { }