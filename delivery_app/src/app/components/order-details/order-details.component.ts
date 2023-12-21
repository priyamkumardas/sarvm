import { Component, Input, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AlertController, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {

  @Input() orderData: any;

  constructor(private modalCtrl: ModalController,
    private callNumber: CallNumber) { }

  ngOnInit() {
    console.log(this.orderData);
  }

  getCharector(str: any){
    return str.charAt(0) + str.charAt(str.indexOf(' ') + 1)
  }
  
  closeAddWeightModal() {
    this.modalCtrl.dismiss();
  }

  callNumberOrder(number: any) {
    this.callNumber.callNumber(number,true);
  }

}
