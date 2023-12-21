import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dialog-payment-failed',
  templateUrl: './dialog-payment-failed.component.html',
  styleUrls: ['./dialog-payment-failed.component.scss'],
})
export class DialogPaymentFailedComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  viewTryAgain() {
    this.modalCtrl.dismiss({"status":"Yes"});
  }

}
