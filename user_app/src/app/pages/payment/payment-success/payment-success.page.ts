import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/lib/services/cart.service';
import { SupportPage } from 'src/app/pages/order/support/support.page';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { InstructionPage } from 'src/app/pages/order/instruction/instruction.page';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {
  orderDetails:any;
  noOfOrders:any;
  paymentMode: any;
  isDisable : boolean =false;
  limit = 5;
  offset = 0;
  deliveryDate:any;

  constructor(private router:Router, private cartService:CartService, private modalCtrl:ModalController,   private commonService: CommonService,) { }

  ngOnInit() {
    this.orderDetails = this.router.getCurrentNavigation().extras.state
      ? this.router.getCurrentNavigation().extras.state
      : {
        "status": "SUBMITTED",
        "paymentMethod": "Pay on Delivery",
        "orderNumber": "242f4ea8-7056-40f2-9d11-8f9ae470f4a3",
        "orderDate": "2022-11-03T20:52:29.380Z",
        "subOrders": [
            {
                "orderID": "3fd4f713-38e6-446f-8743-4ebd8380d4d5",
                "deliveryDate": "2023-04-11",
                "mode":"PICKUP"
            },
            {
                "orderID": "ed827485-8692-4f72-a47e-ea0855e377f3",
                "deliveryDate": "2023-11-05",
                "mode":"DELIVER"
            }
        ]
    }
    this.noOfOrders =this.orderDetails?.subOrders?.length
    this.orderDetails?.subOrders?.map(res=>{
      this.deliveryDate = res.deliveryDate;
      res.show = false;
      res.instruction = '';
      this.paymentMode = res.mode;
    })
    // this.getOrders('ALL');
  }

  // getOrders(order_type){
  //   this.commonService.presentLoading();
  //   this.cartService.getOrders(order_type,this.limit,this.offset,this.deliveryDate).subscribe(res=>{
  //     this.commonService.dissmiss_loading()
  //     const activeOutput = res['data'].filter(obj => obj.status != 'COMPLETED' && obj.status != 'DELIVERED' && obj.status != 'NO_SHOW' && obj.status != 'CANCELLED' && obj.status != 'REJECTED').length
  //     this.noOfOrders = activeOutput;
  //   }, err =>{
  //     this.commonService.dissmiss_loading()
  //   })
  // }

  async support() {
    this.isDisable = true
    const model = await this.modalCtrl.create({
      component: SupportPage,
      cssClass: 'OtpBox-AddMember'
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.isDisable = false
    if(data == 'Call'){
      let a = document.createElement("a");
      a.innerText = "call ";
      a.href = "tel:80958 33999";
      a.click();
    }
  }

  show(sub){
    console.log(sub,sub.show)
    sub.show = !sub.show;
  }

  async instruction(sub,id) {
    this.isDisable  = true;
    const model = await this.modalCtrl.create({
      component: InstructionPage,
      cssClass: 'OtpBox-AddMember'
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.isDisable = false;
    console.log(data)
    if(data){
      this.addInstruction(sub,id,data);
    }
  }

 

  addInstruction(sub,id,data){
    this.commonService.presentLoading();
    this.cartService.addInstruction(id,data).subscribe(res=>{
      this.commonService.dissmiss_loading()
      sub.instruction = data;
    },err =>{
      this.commonService.dissmiss_loading()
    })
  }

}
