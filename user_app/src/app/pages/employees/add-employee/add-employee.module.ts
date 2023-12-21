import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEmployeePageRoutingModule } from './add-employee-routing.module';

import { AddEmployeePage } from './add-employee.page';
import { DatePipe } from '@angular/common';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';


@NgModule({
  providers:[DatePipe],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    AddEmployeePageRoutingModule
  ],
  declarations: [AddEmployeePage]
})
export class AddEmployeePageModule {}
