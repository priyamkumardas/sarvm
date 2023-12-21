import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: 'product-form/:id',
    component:ProductFormComponent,
    canActivate:[]
  },
  {
    path: 'product-list',
    component:ProductListComponent,
    canActivate:[]
  },
  {
    path: 'bulk-upload',
    component:BulkUploadComponent,
    canActivate:[]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }