import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-order-item-status',
  templateUrl: './order-item-status.component.html',
  styleUrls: ['./order-item-status.component.scss'],
})
export class OrderItemStatusComponent implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {}

  
  closeAddWeightModal() {
    this.modalCtrl.dismiss();
  }
}
