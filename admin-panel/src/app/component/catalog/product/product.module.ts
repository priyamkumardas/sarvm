import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { IonicModule} from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatTreeModule} from '@angular/material/tree';
import {MatCardModule} from '@angular/material/card';
import {DataTablesModule} from 'angular-datatables';

import {  HttpClientModule,  HttpClient,  HTTP_INTERCEPTORS,} from '@angular/common/http';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';





@NgModule({
declarations: [
  



   
  ],
imports: [
  CommonModule,
  ProductRoutingModule,
  IonicModule,
  FormsModule, ReactiveFormsModule,
  HttpClientModule,
  MatTableModule,
  MatTreeModule,
  MatCardModule,
  DataTablesModule
]
})
export class ProductModule { }
