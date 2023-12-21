import { Component, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { EventEmitter } from '@angular/core';
import { LocationService } from 'src/app/lib/services/location.service';
import { CommonService } from 'src/app/lib/services/common.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() searchOutput: EventEmitter<any> = new EventEmitter();
  searchAddResult:any =[];
  searchText:string;
  constructor(private locationService:LocationService, public commonService:CommonService) {
  }

  ngOnInit() {}

  sendData(val){
    this.searchOutput.emit({lat:val.lat,lon:val.lon});
    this.searchAddResult = [];
    this.searchText = '';
  }

  searchAddress(data){
    // this.commonService.presentLoading();
    this.locationService.getSearchLocation(data).subscribe((data) => {
      console.log(data);
      // this.commonService.dissmiss_loading()
      this.searchAddResult = data;
    },err => {
      // this.commonService.dissmiss_loading()
      console.log(err);
    });
  }
}
