import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeListPageRoutingModule } from './employee-list-routing.module';

import { EmployeeListPage } from './employee-list.page';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeListPageRoutingModule
  ],
  declarations: [EmployeeListPage, FilterModalComponent],
  entryComponents: [FilterModalComponent]
})
export class EmployeeListPageModule {}
