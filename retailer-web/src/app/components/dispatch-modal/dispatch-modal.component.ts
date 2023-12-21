import { Component, OnInit, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { OrderPageModule } from 'src/app/pages/order/order/order.module';
import { OrderService } from 'src/app/lib/services/order.service';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-dispatch-modal',
  templateUrl: './dispatch-modal.component.html',
  styleUrls: ['./dispatch-modal.component.scss'],
})
export class DispatchModalComponent implements OnInit {
  @Input() orderItem
  @Input() isReDispatch
  segment: any = '0';
  deliveryBoyList: any = [];
  deliveryBoyDetile: any = [];
  freelancer: any;
  associated: any;
  constructor(private modalCtrl: ModalController, public commonService: CommonService, private orderService: OrderService,
  ) { }
  ngOnInit() { }
  ionViewWillEnter() {
    this.getDeliveryBoyList()
  }
  segmentChanged(ev: any) {
    this.segment = '0';
  }
  action() {
    return this.modalCtrl.dismiss();
  }
  getDeliveryBoyList() {
    this.commonService.presentLoader().then(presentLoading => {
      presentLoading.present()
      this.orderService.getDelBoyList().subscribe(res => {
        presentLoading.dismiss();
        console.log(res)
        this.associated = res['data'].associated
        this.freelancer = res['data'].freelancer
        console.log(this.freelancer);
        console.log(this.associated);
      }, error => {
        presentLoading.dismiss();
        console.log(error)
      })
    })
  }
  async selectFreelancer(freelancerId) {
    let assignOrder = {
      deliveryBoyID: freelancerId
    }
    if (this.isReDispatch) {
      this.orderService.selectReDeliveryBoy(this.orderItem.orderID, assignOrder).subscribe((order: any) => {
        console.log(order)
        this.commonService.success(order.data.message);
      })
    } else {
      this.orderService.selectDeliveryBoy(this.orderItem.orderID, assignOrder).subscribe((order: any) => {
        console.log(order)
        this.commonService.success('Order assigned successfully!');
      })
    }
    await this.modalCtrl.dismiss(freelancerId);
  }
  async selectAssociated(associateId) {
    let assignOrder = {
      deliveryBoyID: associateId
    }
    if (this.isReDispatch) {
      this.orderService.selectReDeliveryBoy(this.orderItem.orderID, assignOrder).subscribe((order: any) => {
        console.log(order)
        this.commonService.success(order.data.message);
      })
    } else {
      this.orderService.selectDeliveryBoy(this.orderItem.orderID, assignOrder).subscribe((order: any) => {
        console.log(order)
        this.commonService.success('Order assigned successfully!');
      })
    }
    await this.modalCtrl.dismiss(associateId);
  }
  // constructor(private modalCtrl: ModalController
  // ) { }

  // ngOnInit() { }

  // action(arg) {
  //   return this.modalCtrl.dismiss(arg);
  // }

  // deliveryMe() {
  //   this.modalCtrl.dismiss({"status":"deliveryMe"});
  // }

  // deliveryBoy() {
  //   this.modalCtrl.dismiss({"status":"deliveryBoy"});
  // }
}
