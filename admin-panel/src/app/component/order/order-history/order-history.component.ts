import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { OrderService } from 'src/app/lib/services/api/order.service';

import { CartService } from 'src/app/lib/services/cart.service';
// import { OrderService } from '../order.service';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  id:any;
  orders: any;
  searchText:any;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.getOrderHistory()
  }
  getOrderHistory(){
    this.orderService.getOrderHistory().subscribe(res=>{
      console.log(Object.values(res));
      var tmp=Object.values(res);
      this.orders=tmp[1];
      console.log(this.orders)
            });
  }

}