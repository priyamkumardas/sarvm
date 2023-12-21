import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Constants } from 'src/app/config/constants';
import { CartService } from 'src/app/lib/services/cart.service';


@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {
  
  
  order:any;  
  status:any = Constants.ORDER_STATUS;
   id:any;
  activeOrders:any;

  constructor(private modalCtrl: ModalController,private route:ActivatedRoute, private cartService:CartService) { }

  ngOnInit() {
    this.route.params.subscribe((res:any)=>{
      //@ts-ignore
      this.id = res.id;
      this.getOrder(res.id);
    })
  }

  getOrder(id:any,e?:any){
    this.cartService.getOrder(id).subscribe((res:any)=>{
      if(e){
        e.target.complete();
      }
      console.log(res['data'].status,this.status[res['data'].status]);
      this.order = res['data'];
      console.log(res.data);
    })
  }
  
}

