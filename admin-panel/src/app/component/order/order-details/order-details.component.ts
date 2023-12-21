import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constants } from 'src/app/config/constants';
import { CartService } from 'src/app/lib/services/cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order!: any;
  phoneNumber = "" ;
  status = Constants.ORDER_STATUS;
  id: any;

  orderDetails  = [
  {'name': 'No.'},
  {'name':'Product Name'},
  {'name':'Qauntity'},
  {'name':'Price'},
  {'name':'Total Amount'},

]


  constructor(private route: ActivatedRoute, private cartService: CartService,private ngxLoaderService:NgxUiLoaderService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.id = res['id'];
      this.getOrderDetails(this.id);
    })
  }

  getOrderDetails(id: any) {
    this.ngxLoaderService.start();
    this.cartService.getOrderDetails(id).subscribe((res: { [x: string]: any; }) => {
      console.log(res['data']);
      this.order = res['data'];
      this.ngxLoaderService.stop();
    },
    (err)=>{
      this.ngxLoaderService.stop();
    })
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
  //       this.router.navigate(['/active-order']);
  //       console.log(res);
  //     })
  //   }
  // }
  // async support() {
  //   const model = await this.modalCtrl.create({
  //     component: SupportPage,
  //     cssClass: 'OtpBox-AddMember',
  //     // componentProps:{
  //     //   no: this.order?.seller?.phone
  //     // }
  //   });
  //   await model.present();
  //   const { data } = await model.onWillDismiss();
  //   console.log(data)
  //   if (data == 'Call') {
  //     let a = document.createElement("a");
  //     a.innerText = "call ";
  //     a.href = "tel:" + this.order?.seller?.phone;
  //     a.click();
  //   }
  // }

  // async instruction() {
  //   const model = await this.modalCtrl.create({
  //     component: InstructionPage,
  //     cssClass: 'OtpBox-AddMember'
  //   });
  //   await model.present();
  //   const { data } = await model.onWillDismiss();
  //   console.log(data)
  //   this.addInstruction(data);
  // }

  // addInstruction(data) {
  //   this.cartService.addInstruction(this.id, data).subscribe(res => {
  //     this.getOrder(this.id);
  //   })
  // }
// updatePayment(mode){
//     let data = {
//         "payment": {
//             "mode": mode,
//             "amount": this.order.amount
//         }
//     }
//     this.cartService.updatePayment(this.id,data).subscribe(res=>{
//       console.log(res);
//       this.getOrder(this.id);
//     })
//   }
  // async payNow() {
  //   const model = await this.modalCtrl.create({
  //     component: PayorderPage,
  //     cssClass: 'OtpBox-AddMember',
  //     componentProps: {
  //       amount: this.order.amount,
  //     },
  //   });
  //   await model.present();
  //   const { data } = await model.onWillDismiss();
  //   console.log(data)
  //   data?this.updatePayment(data):'';
  // }


}
