import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectFoodPageRoutingModule } from './select-food-routing.module';

import { SelectFoodPage } from './select-food.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';

import { SelectCategoryPage } from "src/app/pages/catelog/select-category/select-category.page";
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipeModule,
    IonicModule,
    SelectFoodPageRoutingModule,
    SharedModule
  ],
  declarations: [SelectFoodPage],
  providers: [SelectCategoryPage]
})
export class SelectFoodPageModule {}
