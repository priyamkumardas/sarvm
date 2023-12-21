import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.page.html',
  styleUrls: ['./seller-profile.page.scss'],
})
export class SellerProfilePage implements OnInit {

  retailerData:any;
  lat:any;
  long:any;
  created_at:any;
  mobileNumber:any;
  retailerID:any;
constructor(private http:HttpClient, private commonService:CommonService,  private route: ActivatedRoute){
// this.http.get('./assets/temporaryJson/retailerProfilejson.json').subscribe((res:any)=>{
//   this.retailerData=res;
//   console.log(res);
//   this.lat=res.retailer.location.lat
//   this.long=res.retailer.location.lon
//   console.log(this.lat, this.long);
//   this.mobileNumber=res.retailer.mobileNumber;
// })
this.route.paramMap.subscribe((params) => {
  // console.log(params.get('username'));
  console.log(params);
  this.retailerID = params.get('id');
  console.log(this.retailerID);
});
}
ngOnInit(): void {
this.commonService.getStoreDetails(this.retailerID).subscribe((res:any)=>{
  console.log(res);
  this.retailerData=res;
  this.lat=res.shop[0].latitude;
  this.long=res.shop[0].longitude;
  this.mobileNumber=res.retailer.phone;
  this.created_at=this.retailerData?.shop[0].created_at.substr(0, 10);
  console.log(this.lat, this.long, this.mobileNumber);
})
}
}
