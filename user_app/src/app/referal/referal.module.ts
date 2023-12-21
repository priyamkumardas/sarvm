import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { ReferralRatingComponent } from './referral-rating/referral-rating.component';
import { ReferFormComponent } from './refer-form/refer-form.component';
import { MyReferalComponent } from './my-referal/my-referal.component';
import { InviteCategoryComponent } from './invite-category/invite-category.component';
import { InviteModalComponent } from './invite-modal/invite-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PipeModule } from '../lib/pipe/pipes.module';
import { Routes, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode'; 
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
    path: "invite-form",
    component : InviteModalComponent
  },
  {
    path: "invite-screen",
    component : InviteModalComponent
  },
  {
    path: "referal-rating",
    component : ReferralRatingComponent
  }
]
@NgModule({
  declarations: [
    ReferralRatingComponent,
    ReferFormComponent,
    MyReferalComponent,
    InviteCategoryComponent,
    DashboardComponent,
    InviteModalComponent,
    
  ],

  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    QRCodeModule,
    RouterModule.forChild(routes),
    PipeModule,
  ],
  exports : [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
})

export class ReferalModule { }
