import { Component, OnInit } from '@angular/core';
import { ModalController,IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-dialog-payment-success',
  templateUrl: './dialog-payment-success.component.html',
  styleUrls: ['./dialog-payment-success.component.scss'],
})
export class DialogPaymentSuccessComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  viewContinue() {
    this.modalCtrl.dismiss({"status":"Yes"});
  }

}
