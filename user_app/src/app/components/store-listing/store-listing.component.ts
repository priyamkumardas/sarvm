import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-listing-component',
  templateUrl: './store-listing.component.html',
  styleUrls: ['./store-listing.component.scss'],
})
export class StoreListingComponent implements OnInit {

  @Input() item:any;
  @Output() favEvent = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {}

  favouriteShop(shop_id, isFavourite){
    this.favEvent.emit({shop_id:shop_id, isFavourite:isFavourite})
  }

  /**
   * @name gotoStore
   * @type Function - Navigate to store all products listing
   * **/
  gotoStore(details) {
    this.router.navigate([`/tabs/productlisting/${details.shop_id}`], {
      queryParams: { 
        vendorDetails: JSON.stringify(details)
      },
    });
  }


}

