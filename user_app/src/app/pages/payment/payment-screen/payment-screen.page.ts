import { Component, OnInit } from '@angular/core';
import { Checkout } from 'capacitor-razorpay';
import { StorageService } from 'src/app/lib/services/storage.service';
import { Constants } from 'src/app/config/constants';
import { CartService } from 'src/app/lib/services/cart.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PaymentdoneGuard } from 'src/app/lib/guard/paymentdone.guard'
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-payment-screen',
  templateUrl: './payment-screen.page.html',
  styleUrls: ['./payment-screen.page.scss'],
})
export class PaymentScreenPage implements OnInit {

  cartData:any;

  constructor(
    private router:Router,
    private storageService: StorageService,
    private cartService:CartService, 
    private datePipe:DatePipe, 
    private paymentdonegaurd:PaymentdoneGuard,
    private commonService: CommonService,
    ) { }

  ngOnInit() {
    this.cartData = this.storageService.getItem(Constants.CART_DATA);
    // this.cartData.cart.map((v) => {
    //   v.date = new Date(new Date(v.date).setHours(new Date(v.date).getHours() + 6));
    //   console.log(v.date)
    // });
    console.log(this.cartData)
  }

  async loadCheckout() {
    const options = { 
      key: 'rzp_test_hFUDHIJ1dunt1v', 
      amount: '5000', 
      description: 'POC', 
      image: 'https://test.sarvm.ai/images/image%2016logo.png', 
      currency: 'INR', 
      name: 'Sarvm', 
      prefill: { email: 'void@razorpay.com', contact: '9191919191', name: 'Razorpay Software'}, 
      theme: {color: '#4db965'}}
    try {
    let data = (await Checkout.open(options));
    console.log(data['response']);
    } catch (error) {
      console.log(error); //Doesn't appear at all
    }
  }

  placeOrder(){
    this.commonService.presentLoading();
    this.cartService.placeOrder(this.cartData).subscribe(res=>{
      this.commonService.dissmiss_loading()
      if(res['success']){
        this.paymentdonegaurd.paymentDoneFlag=true;
        localStorage.removeItem(Constants.CART_DATA);
        this.router.navigate(['/payment-success'], { replaceUrl:true,
          state: { ...res['data'] },
        });
      }
    },err=>{
      this.commonService.dissmiss_loading()
    })
  }

}
