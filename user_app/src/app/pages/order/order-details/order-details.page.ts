import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/lib/services/cart.service';
import { Constants } from 'src/app/config/constants';
import { ModalController } from '@ionic/angular';
import { SupportPage } from 'src/app/pages/order/support/support.page';
import { InstructionPage } from 'src/app/pages/order/instruction/instruction.page';
import { AlertController } from '@ionic/angular';
import { PayorderPage } from '../payorder/payorder.page';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  order: any;
  phoneNumber = "" ;
  status = Constants.ORDER_STATUS;
  id: any;
  wantToCancel;
  showPayNow: boolean;
  addDisable:boolean = false;
  constructor(private route: ActivatedRoute, public commonservice: CommonService, private cartService: CartService, private router: Router, private modalCtrl: ModalController, private alertCtrl: AlertController,
    private inAppBrowser: InAppBrowser,
      private platform: Platform,  ) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.id = res.id;
      this.getOrder(res.id);
    })
   
  }

  openWithInAppBrowser(url){
    let latlon = url.shop?.location?.latitude + ',' + url.shop?.location?.longitude
    if(this.platform.is('ios')){
      this.inAppBrowser.create('maps://?q=' + latlon, '_system');
    } else {
      let label = encodeURI(url.shop?.name + ' location');
      this.inAppBrowser.create('geo:0,0?q=' + latlon + '(' + label + ')', '_system');
    }
    }

  getOrder(id) {
    this.commonservice.presentLoading();
    this.cartService.getOrder(id).subscribe(res => {
      this.order = res['data'];
      console.log(this.order)
      this.commonservice.dissmiss_loading();
      if(this.order.status != 'COMPLETED' && this.order.status != 'NO_SHOW' && this.order.status != 'CANCELLED' && this.order.status != 'REJECTED'){
        this.showPayNow = true;
      }
    },err=>{
      this.commonservice.dissmiss_loading();
    })
  }
  cancelOrder(){
    this.commonservice.customeAlert('Cancel Order','Are you sure ?',
      ()=>{ this.cartService.cancelOrder(this.id).subscribe(res => {
        this.commonservice.success("Order Cancelled");
        this.router.navigate(['/active-order','ACTIVE']);
      },err=>{
        console.log(err)
        this.commonservice.danger(err.error.error.message);
      })},
      ()=>{}
    );
  }

  // cancelOrder() {
     
  //     this.presentAlert()
  // }
  // async presentAlert() {
  //    const alert = await this.alertCtrl.create({
  //     header: 'Are you sure?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           this.wantToCancel = 0;
  //         },

  //       },
  //       {
  //         text: 'Confirm',
  //         handler: () => {
  //           this.wantToCancel = 1;
  //         },

  //       },
  //     ],
  //   })
  //   await alert.present();
  //   await alert.onDidDismiss();
  //   if (this.wantToCancel) {

  //     this.cartService.cancelOrder(this.id).subscribe(res => {
  //       this.router.navigate(['/active-order','ACTIVE']);
  //     })
  //   }
  // }
  async support() {
    this.addDisable = true;
    const model = await this.modalCtrl.create({
      component: SupportPage,
      cssClass: 'OtpBox-AddMember',
      // componentProps:{
      //   no: this.order?.seller?.phone
      // }
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.addDisable = false;
    // console.log(data)
    if (data == 'Call') {
      let a = document.createElement("a");
      a.innerText = "call ";
      a.href = "tel:" + this.order?.seller?.phone;
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
    // console.log(data)
    this.addInstruction(data);
  }

  addInstruction(data) {
    this.cartService.addInstruction(this.id, data).subscribe(res => {
      this.getOrder(this.id);
    })
  }
updatePayment(mode){
    let data = {
        "payment": {
            "mode": mode,
            "amount": this.order.amount
        }
    }
    this.cartService.updatePayment(this.id,data).subscribe(res=>{
      // console.log(res);
      this.getOrder(this.id);
    })
  }
  async payNow() {
    this.addDisable = true;
    const model = await this.modalCtrl.create({
      component: PayorderPage,
      cssClass: 'OtpBox-AddMember',
      componentProps: {
        amount: this.order.amountAfterDiscount,
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.addDisable = false;
    // console.log(data)
    data?this.updatePayment(data):'';
  }

}
