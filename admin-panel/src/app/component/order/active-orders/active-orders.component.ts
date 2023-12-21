import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CartService } from 'src/app/lib/services/cart.service';
@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.scss']
})
export class ActiveOrdersComponent implements OnInit {
  orders: any;
  searchText:any;
  constructor( private cartService:CartService, private ngxLoaderService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getOrders()
  }
  getOrders(){
    this.ngxLoaderService.start();
    this.cartService.getOrders().subscribe(res=>{
      console.log(Object.values(res));
      var tmp=Object.values(res);
      this.orders=tmp[1];
      console.log(this.orders)
      // this.ngxLoaderService.stop();
            },
            (err)=>{
              this.ngxLoaderService.stop();
            });
  }

}
