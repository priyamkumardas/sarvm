import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogFormComponent } from '../catalog/catalog-form/catalog-form.component';
import { CatalogListComponent } from '../catalog/catalog-list/catalog-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path: 'category-form/:id',
    component:CategoryFormComponent,
    canActivate:[]
  },
  {
    path: 'category-list',
    component:CategoryListComponent,
    canActivate:[]
  },
  {
    path: 'catalog-form/:id',
    component:CatalogFormComponent,
    canActivate:[]
  },
  {
    path: 'catalog-list',
    component:CatalogListComponent,
    canActivate:[]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
