import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-invite-refer-modal',
  templateUrl: './invite-refer-modal.component.html',
  styleUrls: ['./invite-refer-modal.component.scss'],
})
export class InviteReferModalComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }
  action(arg) {
    return this.modalCtrl.dismiss(arg);

  }
}
