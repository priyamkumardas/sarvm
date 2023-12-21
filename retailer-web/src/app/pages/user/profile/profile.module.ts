import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';
import { DashboardComponent } from 'src/app/referal/dashboard/dashboard.component';
import { MyReferalComponent } from 'src/app/referal/my-referal/my-referal.component';
import { InviteCategoryComponent } from 'src/app/referal/invite-category/invite-category.component';
import { ReferFormComponent } from 'src/app/referal/refer-form/refer-form.component';
import { ReferralRatingComponent } from 'src/app/referal/referral-rating/referral-rating.component';
import { InviteModalComponent } from 'src/app/referal/invite-modal/invite-modal.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    PipeModule,
    QRCodeModule
  ],
  declarations: [ProfilePage,
    DashboardComponent,
    MyReferalComponent,
    InviteCategoryComponent,
    ReferFormComponent,
    InviteModalComponent,
    ReferralRatingComponent
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ProfilePageModule { }
