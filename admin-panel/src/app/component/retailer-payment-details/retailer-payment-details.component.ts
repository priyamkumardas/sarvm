import { Component, OnInit } from '@angular/core';
import { RetailerService } from 'src/app/lib/services/api/retailer.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-retailer-payment-details',
  templateUrl: './retailer-payment-details.component.html',
  styleUrls: ['./retailer-payment-details.component.scss']
})
export class RetailerPaymentDetailsComponent implements OnInit {

  reatilerId: any;
  paymentDetails:any;

     paymentHead  = [
      {'name': 'Id'},
      {'name':'Amount Due'},
      {'name':'Amount Paid'},
      {'name':'Payment Gateway'},
      {'name':'Service Name'},
      {'name':'Creation Date'},
      {'name':'Payment Status'}

    ]

  constructor(
    private retailerService:RetailerService,
    private activatedRoute: ActivatedRoute,
    private route: Router

  ) {
    this.reatilerId =this.route.getCurrentNavigation()?.extras.state
    console.log(this.reatilerId);
  }



  getPaymentDetails(){
      this.retailerService.getretailerpaymentDetails(this.reatilerId).subscribe((response:any)=>{
       this.paymentDetails = response.data;
       console.log(this.paymentDetails);
      })

  }



  ngOnInit(): void {
    console.log(this.reatilerId);
    this.getPaymentDetails();
  }

}
