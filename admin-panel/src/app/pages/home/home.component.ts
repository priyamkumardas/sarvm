import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StorageService } from 'src/app/component/storage.service';
import { RetailerService } from 'src/app/lib/services/api/retailer.service';
import { ShopaddressService } from 'src/app/lib/services/shopaddress.service';
import { EmpserviceService } from 'src/app/shared/empservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shopDetails :any;
  retailerDetails:any;
  empDetails:any;
  retailerId= 'type=retailer';



  constructor(
    private storage: StorageService,
    private shopaddress:ShopaddressService,
    private loader:NgxUiLoaderService,
    private retailerService:RetailerService,
    private route:ActivatedRoute,
    private _EmpserviceService:EmpserviceService,

  ) { }



 async  getShopDetails(){
  await this.loader.start();
    this.shopaddress.getShopAddress().subscribe(
      (res:any)=>{
        if(res){
          this.loader.stop();
         this.shopDetails =res.data.length;
        }

        else{
          this.loader.stop();
        }
    },
    (err)=>{
      this.loader.stop();
    })

  }

 async  getretailerDetails(){
  await this.loader.start();
    this.retailerService.getretailerDetails(this.retailerId).subscribe((res:any)=>{

      if(res){
        this.loader.stop();
        this.retailerDetails = res['data'].length;
      }
      else{
        this.loader.stop();
      }

    },
    (err)=>{
      this.loader.stop();
    })
  }


 async getemployeeDetails(){
  await this.loader.start();
    this._EmpserviceService.getemployeeDetails().subscribe((res:any)=>{

      if(res){
        this.loader.stop();
        this.empDetails = res['data'].length;
        console.log(this.empDetails);
      }
      else{
        this.loader.stop();
      }

    },
    (err)=>{
      this.loader.stop();
    })
  }




  ngOnInit(): void {
    this.getShopDetails();
    this.getretailerDetails();
    this.getemployeeDetails();
    // location.reload();

  }


}
