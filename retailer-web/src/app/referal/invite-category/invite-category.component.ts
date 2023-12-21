import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReferralService } from '../referral.service';

@Component({
  selector: 'app-invite-category',
  templateUrl: './invite-category.component.html',
  styleUrls: ['./invite-category.component.scss'],
})
export class InviteCategoryComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private referralService: ReferralService
  ) {}

  ngOnInit() {}

  action(arg, type?) {
    this.referralService.setInviteeData(type);
    return this.modalCtrl.dismiss(arg);
  }

  notAvailable(){
    this.referralService.showToast();
  }

  refferalclose() {
    this.referralService.closeReferralModal();
  }
}
