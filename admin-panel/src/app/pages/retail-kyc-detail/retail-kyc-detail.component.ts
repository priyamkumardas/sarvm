import { Component, OnInit } from '@angular/core';
import { EmpserviceService } from 'src/app/shared/empservice.service';
import { KycdetailService } from 'src/app/lib/services/kycdetail.service';

@Component({
  selector: 'app-retail-kyc-detail',
  templateUrl: './retail-kyc-detail.component.html',
  styleUrls: ['./retail-kyc-detail.component.scss']
})
export class RetailKycDetailComponent implements OnInit {

  kycdetails : any;
  alldata:any;

  constructor( private kycservice:EmpserviceService) { }

  ngOnInit(): void {
   this.getKycDetails();
  }

  getKycDetails(){
    this.kycservice.getKycDetails().subscribe(
      (res) => { 
        this.kycdetails = res; 
        this.alldata =this.kycdetails.data[0];
      }
    )

  }

  

}
