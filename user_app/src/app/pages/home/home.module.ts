import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { FilterComponent } from 'src/app/components/filter/filter.component';
import { HomePageRoutingModule } from './home-routing.module';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
//import { EmptyListComponent } from 'src/app/components/empty-list/empty-list.component';
import { SharedModule } from "src/app/components/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PipeModule,
    SharedModule,
  ],
  declarations: [HomePage, FilterComponent, ]
})
export class HomePageModule {}
