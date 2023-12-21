import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RetailerService } from 'src/app/lib/services/api/retailer.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})

export class ShopDetailsComponent implements OnInit {
  shopData:any;
  retailerId:any;

  constructor(
    private retailerService:RetailerService,
    private activatedRoute:ActivatedRoute,
    private commonService:CommonService,
    public storgeService: StorageService,
    private route: Router,
    ) {

      this.activatedRoute.params.subscribe((response:any)=>{
        this.retailerId =  response._id;
        this.getretailerDetailsbyId(response._id);
      })

 }

  retailershopList  = [
    {'name': 'Shop Id'},
    {'name':'Shop name'},
    {'name':'City'},
    {'name':'Shop Number'},
    {'name':'Landmark'},
    {'name':'KYCVerification'},
    {'name':'Order History'},
    {'name':'Payment History'},

  ]




  getretailerDetailsbyId(id:any){
    this.retailerService.getretailerDetailsbyId(id).subscribe((res:any)=>{
      this.shopData = res['data'].shopData;
    })
  }

  navigate(id:any){
   this.route.navigate(['/retailer-payment'],{state: id})
  }



  ngOnInit(): void {}



}

