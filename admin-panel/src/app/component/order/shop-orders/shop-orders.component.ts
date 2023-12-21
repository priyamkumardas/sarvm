import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CartService } from 'src/app/lib/services/cart.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shop-orders',
  templateUrl: './shop-orders.component.html',
  styleUrls: ['./shop-orders.component.scss']
})
export class ShopOrdersComponent implements OnInit {
shopId:any;
searchText:any;
shopOrderData:any;
page: number = 1;
count: number = 0;
tableSize: number=5;

dtoptions:DataTables.Settings={};
dtTrigger:Subject<any>=new Subject<any>();


shopOrders  = [
  {'name': 'No.'},
  {'name':'Order Id'},
  {'name':'Amount'},
  {'name':'Total Items'},
  {'name':'user Phone'},
  {'name':'Delivery Date'},
  {'name':'Addrerss'},
  {'name':'Payment Status'},
  {'name':'Delivery Person Details'},
  {'name':'Orders'},


]


  constructor(
    private route:ActivatedRoute,
     private cartService:CartService,
     private ngxLoaderService:NgxUiLoaderService
     ) { }

  ngOnInit(): void {


    this.dtoptions ={
      pagingType: 'full_numbers',
    };

    this.route.paramMap.subscribe((params) => {
      // console.log(params.get('username'));
      console.log(params);
      this.shopId = params.get('id');
      console.log(this.shopId);
    });
   this.getAllShopOrders(this.shopId)
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  getAllShopOrders(shop_id:any)
  {
    this.ngxLoaderService.start();
    this.cartService.getAllShopOrder(shop_id).subscribe((res:any)=>{
      this.shopOrderData=res.data;
      this.dtTrigger.next(null)
      console.log(this.shopOrderData);
      this.ngxLoaderService.stop();
    },
    (err)=>{
      this.ngxLoaderService.stop();
    })
  }


}
