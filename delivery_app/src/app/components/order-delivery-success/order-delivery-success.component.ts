import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-order-delivery-success',
  templateUrl: './order-delivery-success.component.html',
  styleUrls: ['./order-delivery-success.component.scss'],
})
export class OrderDeliverySuccessComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeOrderDeliverySuccessModal(){
    this.modalCtrl.dismiss();
  }


}
