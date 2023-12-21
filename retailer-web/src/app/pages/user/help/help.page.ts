import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from '../../../lib/services/common.service';
import { AuthService } from '../../../lib/services/auth.service';
import { Router } from '@angular/router';

import {ReferralService } from 'src/app/referal/referral.service'

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    public commonservice: CommonService,
    public authservice: AuthService,

  ) { }

  ngOnInit() {
  }

}
