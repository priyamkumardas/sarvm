import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShopDataService } from 'src/app/lib/services/api/shop-data.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from '../../storage.service';
import { PaymentService } from '../../payment.service';
import { Constants } from 'src/app/config/constants';
import { OnboardService } from '../../onboard.service';
import { CommonApi } from 'src/app/lib/services/api/common.api';
import { catchError, throwError } from 'rxjs';
import { CartService } from 'src/app/lib/services/cart.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
export interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
@Component({
  selector: 'app-view-shop',
  templateUrl: './view-shop.component.html',
  styleUrls: ['./view-shop.component.scss']
})

export class ViewShopComponent implements OnInit {

  shopId:any;
  userId:any;
  shopData:any;
  subscriptionDetails:any;
  kycDetails:any;

  subscriptionList  = [
    {'name': 'Shop Id'},
    {'name':'Start Date'},
    {'name':'End Date'},
    {'name':'GSTIN'},
    {'name':'Status'},
    {'name':'subscriptionId'},
    {'name':'Amount'}

  ]



  constructor(
    private route: ActivatedRoute,
    private shopDataService: ShopDataService,
    private api:CommonApi,
    private loader:NgxUiLoaderService,
    private OnboardService: OnboardService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.shopId = params.get('id');
      // console.log(this.shopId);
    });

  }

async getShopData(){
  await this.loader.start()
  this.shopDataService.callShopDataApi(this.shopId).subscribe((response) => {
    if(response){
       this.loader.stop()
      this.shopData= response.data.shop
      this.userId = this.shopData?.user_id;
      this.subscriptionDetails = response.data.subscriptionDetails;
      this.getKYCDetails(this.userId);
      console.log(this.userId)
    }
    else{
      this.loader.stop()

    }
  },
  (error)=>{
    this.loader.stop()
  }
  )

}


getKYCDetails(id:any) {
  this.OnboardService.getKYCDetail(id).subscribe((res: any) => {
    console.log('kycres', res.data[0]);
    this.kycDetails=res.data[0];
  }, (error) => {
  });
}






  ngOnInit(): void {

    this.getShopData();
    // this.getAllShopOrders(this.shop_id)
// this.getAllSubscription();
// this.getKYCDetails();
  }

  // getKYCDetails() {
  //   // this.commonService.present();
  //   this.onboardService.getKYCDetail(this.shop_id).subscribe((res: any) => {
  //     console.log('kycres', res);



}
