import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ShopaddressService } from 'src/app/lib/services/shopaddress.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shop-address-page',
  templateUrl: './shop-address-page.component.html',
  styleUrls: ['./shop-address-page.component.scss']
})
export class ShopAddressPageComponent implements OnInit {
  shopdetails :any;
  alldata :any;
  searchText = '';
  page: number = 1;
  count: number = 0;
  tableSize: number=5;


  shoplist  = [
    {'name': 'No.'},
    {'name':'Shop Id'},
    {'name':'Shop Number'},
    {'name':'Shop Name'},
    {'name':'Address'},
    {'name':'KYCVerification'},
    {'name':'Subscription'},
    {'name':'Shop Details'},
    {'name':'Orders'},
  ]

  dtoptions:DataTables.Settings={};
  dtTrigger:Subject<any>=new Subject<any>();



  constructor(
    private shopaddress:ShopaddressService,
    private ngxLoaderService:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getShopDetails();
    this.dtoptions ={
      pagingType: 'full_numbers',
    };
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  getShopDetails(){
    this.ngxLoaderService.start();
    this.shopaddress.getShopAddress().subscribe(
      (res:any)=>{
        this.shopdetails =res;
        this.dtTrigger.next(null)
       this.alldata =this.shopdetails.data;
       this.ngxLoaderService.stop();
      // console.log(this.alldata.shop_id);
    },
    (err)=>{
      this.ngxLoaderService.stop();
    })

  }
}
