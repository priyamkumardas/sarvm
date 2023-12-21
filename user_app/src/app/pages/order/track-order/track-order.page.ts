import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/lib/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { PayorderPage } from '../payorder/payorder.page';
import { ModalController } from '@ionic/angular';
import { SupportPage } from 'src/app/pages/order/support/support.page';
import { InstructionPage } from 'src/app/pages/order/instruction/instruction.page';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.page.html',
  styleUrls: ['./track-order.page.scss'],
})
export class TrackOrderPage implements OnInit {

  order:any;
  status = Constants.ORDER_STATUS;
  id:any;
  activeOrders:any;
  addDisable: boolean= false;
  limit = 5;
  offset = 0;
  deliveryDate: any;

  constructor(private modalCtrl: ModalController, public commonservice: CommonService,private route:ActivatedRoute, private cartService:CartService) { }

  ngOnInit() {
    this.route.params.subscribe(res=>{
      this.id = res.id;
      this.getOrder(res.id);
    })
    // this.getOrders('ALL');
  }

  getOrder(id,e?){
    this.commonservice.presentLoading();
    this.cartService.getOrder(id).subscribe(res=>{
      this.commonservice.dissmiss_loading();
      if(e){
        e.target.complete();
      }
      this.activeOrders = res['data'].orderItemDetails?.length;
      console.log(res['data'].status,this.status[res['data'].status]);
      this.order = res['data'];
    },err=>{
      this.commonservice.dissmiss_loading();
    })
  }

  // getOrders(order_type){
  //   this.cartService.getOrders(order_type,this.limit,this.offset, this.deliveryDate).subscribe(res=>{
  //     console.log(res);
  //     const activeOutput = res['data'].filter(obj => obj.status != 'COMPLETED' && obj.status != 'DELIVERED' && obj.status != 'NO_SHOW' && obj.status != 'CANCELLED' && obj.status != 'REJECTED').length
  //     this.activeOrders = activeOutput;
  //   })
  // }

  updatePayment(mode){
    let data = {
        "payment": {
            "mode": mode,
            "amount": this.order.amount
        }
    }
    this.cartService.updatePayment(this.id,data).subscribe(res=>{
      console.log(res);
      this.getOrder(this.id);
    })
  }

  callDeliveryMan(){
    let a = document.createElement("a");
    a.innerText = "call ";
    a.href = "tel:"+this.order?.delivery?.deliveryBoy?.phone;
    a.click();
  }

  async payNow() {
    const model = await this.modalCtrl.create({
      component: PayorderPage,
      cssClass: 'OtpBox-AddMember',
      componentProps: {
        amount: this.order.amountAfterDiscount,
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    console.log(data)
    data?this.updatePayment(data):'';
    // item.qty = data.quantity;:
  }

  async support() {
    this.addDisable = true;
    const model = await this.modalCtrl.create({
      component: SupportPage,
      cssClass: 'OtpBox-AddMember'
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.addDisable= false;
    if(data == 'Call'){
      let a = document.createElement("a");
      a.innerText = "call ";
      a.href = "tel:"+this.order?.seller?.phone;
      a.click();
    }
  }

  async instruction() {
    this.addDisable = true;
    const model = await this.modalCtrl.create({
      component: InstructionPage,
      cssClass: 'OtpBox-AddMember'
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.addDisable= false;
    console.log(data)
    this.addInstruction(data);
  }

  addInstruction(data){
    this.cartService.addInstruction(this.id,data).subscribe(res=>{
      this.getOrder(this.id);
    })
  }

}
