import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../lib/pipe/pipes.module';

import { DateTimePickerComponent } from 'src/app/components/date-time-picker/date-time-picker.component';
import { NewOrderComponent } from '../pages/order/new-order/new-order.component';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { CancelOrderModalComponent } from '../pages/order/cancel-order-modal/cancel-order-modal.component';
import { BottomTabViewComponent } from './bottom-tab-view/bottom-tab-view.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HeaderComponent } from './header/header.component';
import { AddCatalogModalComponent } from './add-catalog-modal/add-catalog-modal.component';

import { DispatchModalComponent } from './dispatch-modal/dispatch-modal.component';
import { OrderItemComponent } from '../pages/order/order-item/order-item.component';
import { DetailPageSidebarComponent } from '../pages/order/detail-page-sidebar/detail-page-sidebar.component';

const COMPONENTS = [
  DateTimePickerComponent,
  NewOrderComponent,
  EmptyListComponent,
  CancelOrderModalComponent,
  BottomTabViewComponent,
  EditProfileComponent,
  HeaderComponent,
  AddCatalogModalComponent,
  DispatchModalComponent,
  DetailPageSidebarComponent,
  OrderItemComponent
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