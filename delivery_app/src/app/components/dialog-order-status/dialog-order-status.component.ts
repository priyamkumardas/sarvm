import { Component, Input, OnInit } from '@angular/core';
import { ModalController,IonicModule } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { OrderService } from 'src/app/lib/services/order.service';

@Component({
  selector: 'app-dialog-order-status',
  templateUrl: './dialog-order-status.component.html',
  styleUrls: ['./dialog-order-status.component.scss'],
})
export class DialogOrderStatusComponent implements OnInit {

  @Input() tripOrder: any;
  @Input() statusType: any;
  @Input() isOrder: boolean
  orderTripDetail: any;

  constructor(private modalCtrl: ModalController,
    public commonService: CommonService,
    private orderService: OrderService,) { }

  ngOnInit() {
    if(this.tripOrder) {
      this.orderTripDetail = this.tripOrder;
    }
  }

  viewYes() {
    this.modalCtrl.dismiss({"status":"Yes"});
  }

  viewNo() {
    this.modalCtrl.dismiss({"status":"No"});
  }
}
