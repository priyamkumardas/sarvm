import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReferralRatingComponent } from './referral-rating/referral-rating.component';
import { IonicModule } from '@ionic/angular';
import { PipeModule } from '../lib/pipe/pipes.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyReferalComponent } from './my-referal/my-referal.component';
import { InviteCategoryComponent } from './invite-category/invite-category.component';

const routes: Routes =[
  {
    path: 'dashboard',
    component :DashboardComponent
  },
  {
    path: "",
    component : DashboardComponent
  },
  {
    path: "invite-referal",
    component : InviteCategoryComponent
  },
  {
    path: "my-referal",
    component : MyReferalComponent
  },
  {
    path: "referal-ratting",
    component : ReferralRatingComponent
  },
]


@NgModule({
  declarations: [
    ReferralRatingComponent,
    DashboardComponent,
    MyReferalComponent,
    InviteCategoryComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipeModule,
    FormsModule
  ],
  exports : [RouterModule],
})
export class ReferalModule { }
