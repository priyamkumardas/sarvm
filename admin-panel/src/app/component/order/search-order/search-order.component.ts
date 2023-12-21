import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.scss']
})
export class SearchOrderComponent implements OnInit {
orderId:string="";
showErrorMsg:boolean=false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.orderId)
    if(this.orderId=="")
    {
      this.showErrorMsg=true;
      return;
    }
    this.router.navigate(['/order-details/', this.orderId]);
  }
}
