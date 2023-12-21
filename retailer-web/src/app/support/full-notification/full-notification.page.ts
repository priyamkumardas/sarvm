import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { OrderService } from 'src/app/lib/services/order.service';

@Component({
  selector: 'app-full-notification',
  templateUrl: './full-notification.page.html',
  styleUrls: ['./full-notification.page.scss'],
})
export class FullNotificationPage implements OnInit {

  order: any;
  orderId: string = "0000-0068";

  constructor(
    private modalCtrl: ModalController,
    private orderService: OrderService,
    private commonService: CommonService,) {
  }

  ngOnInit() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    debugger;
    if (this.orderId != null && this.orderId != undefined && this.orderId != "") {
      this.commonService.present();
      this.orderService.getOrderByIdDetails(this.orderId).subscribe((order: any) => {
        if (order.success == true && order.data != null && order.data != undefined) {
          this.order = order.data;
          this.commonService.dismiss();
        } else {
          this.commonService.dismiss();
        }
      }, (error) => {
        this.commonService.dismiss();
        this.commonService.danger(error);
      });
    }
  }

  getCharector(str: any) {
    return str.charAt(0) + str.charAt(str.indexOf(' ') + 1)
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
