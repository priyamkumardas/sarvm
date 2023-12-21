import { Component, OnInit } from '@angular/core';
import { ModalController,IonicModule } from '@ionic/angular';
import { DialogPaymentFailedComponent } from '../dialog-payment-failed/dialog-payment-failed.component';
import { DialogPaymentSuccessComponent } from '../dialog-payment-success/dialog-payment-success.component';

@Component({
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.scss'],
})
export class DialogPaymentComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async cancel() {
    this.closeDialogPaymentComponent();
    const modal = await this.modalCtrl.create({
      component: DialogPaymentFailedComponent,
      cssClass: 'cancel-modal-css',
      componentProps: {
      }
    });
    modal.onDidDismiss().then((modelData: any) => {
      /* if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        console.log('Modal Data : ' + modelData);
      } */
    });
    await modal.present();
  }

  async accept() {
    this.closeDialogPaymentComponent();
    const modal = await this.modalCtrl.create({
      component: DialogPaymentSuccessComponent,
      cssClass: 'cancel-modal-css',
      componentProps: {
      }
    });
    modal.onDidDismiss().then((modelData: any) => {
      /* if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        console.log('Modal Data : ' + modelData);
      } */
    });
    await modal.present();
  }

  closeDialogPaymentComponent() {
    this.modalCtrl.dismiss();
  }

}
