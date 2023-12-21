import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilterPipe } from 'src/app/lib/pipe/filter.pipe';
import { ShopDataService } from '../../../lib/services/api/shop-data.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-shop-data',
  templateUrl: './shop-data.component.html',
  styleUrls: ['./shop-data.component.scss']
})
export class ShopDataComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number=5;

   url=`${environment.baseUrl}/rms/apis/v1/shop`
   shopData: any;
   shopDataGroup!:FormGroup;
   searchText:any;
  isNotData: boolean=false;
  isDataShowed:boolean=false;
  constructor(private http: HttpClient,private ngxLoaderService:NgxUiLoaderService, private shopDataService: ShopDataService, private fb:FormBuilder) {
    this.shopDataGroup=this.fb.group({
      pincode:[],
      city:[],
      shop_id:[],
      mobile:[]
    })
  }
   
  ngOnInit() {
    // this.callShopDataApi();
   
  }
  callShopDataApi() {
       var pincode=this.shopDataGroup.get('pincode')?.value;
       var city=this.shopDataGroup.get('city')?.value;
       var shop_id=this.shopDataGroup.get('shop_id')?.value;
       var mobile=this.shopDataGroup.get('mobile')?.value;
       if(pincode===null && city===null && shop_id===null)
       {
         this.isNotData=true;
         return;
       }
       else{
         if(pincode==null)
         pincode="";
         if(city==null)
         city="";
         if(shop_id==null)
         shop_id=""
         if(mobile==null)
         mobile="";
         this.isDataShowed=true;
        this.ngxLoaderService.start();
        this.shopDataService.callShopData(pincode, city, shop_id, mobile).subscribe((data: any) => {
          this.shopData = data.data;
          console.log(this.shopData);
          this.tableSize=this.shopData;
          this.ngxLoaderService.stop();
        },
        (err)=>{
          this.ngxLoaderService.stop();
        });
       }
      
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  Reset(){
    this.shopDataGroup.reset();
    this.isDataShowed=false;
  }
}
