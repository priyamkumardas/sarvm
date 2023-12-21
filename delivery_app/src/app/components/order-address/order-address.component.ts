import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
/* import { AlertController, IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { Optional } from '@angular/core'; */
@Component({
  selector: 'app-order-address',
  templateUrl: './order-address.component.html',
  styleUrls: ['./order-address.component.scss'],
})
export class OrderAddressComponent implements OnInit {

  @Input() orderDropPick: any;

  constructor(private modalCtrl: ModalController,
    private platform: Platform,) { 
    /* @Optional() private routerOutlet?: IonRouterOutlet
    this.platform.backButton.subscribeWithPriority(101, () => {
      console.log('Handler was called!');
      if (this.routerOutlet == null || !this.routerOutlet?.canGoBack()) {
        this.modalCtrl.dismiss();
      }
    }); */
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
