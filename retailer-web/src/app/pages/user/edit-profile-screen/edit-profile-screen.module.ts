import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfileScreenPageRoutingModule } from './edit-profile-screen-routing.module';

import { EditProfileScreenPage } from './edit-profile-screen.page';
import { PipeModule } from "../../../lib/pipe/pipes.module";

@NgModule({
    declarations: [EditProfileScreenPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditProfileScreenPageRoutingModule,
        PipeModule
    ]
})
export class EditProfileScreenPageModule {}
