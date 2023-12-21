import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RetailerService } from 'src/app/lib/services/api/retailer.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-retailer-profile',
  templateUrl: './retailer-profile.component.html',
  styleUrls: ['./retailer-profile.component.scss']
})
export class RetailerProfileComponent implements  OnInit {
    id:any;
    retailerData:any;
    page: number = 1;
    count: number = 0;
    tableSize: number=5;
    searchText='';
    config: any;


    retailerList  = [
      {'name': 'No.'},
      {'name':'Name'},
      {'name':'Mobile Number'},
      {'name':'Last Login'},
      {'name':'Status'},
      {'name':'Details'}
    ]


    posts:any;
    dtoptions:DataTables.Settings={};
    dtTrigger:Subject<any>=new Subject<any>();

  constructor(
    private loader:NgxUiLoaderService ,
    private retailerService:RetailerService,
    private route:ActivatedRoute,
    private commonService:CommonService,
    public storgeService: StorageService,
    )
    { }



    getretailerDetails(_id:any){
      this.loader.start();
      this.retailerService.getretailerDetails(_id).subscribe((res:any)=>{
        this.retailerData = res['data'];
        this.dtTrigger.next(null)
        console.log(res['data']);
        this.loader.stop();
      },
      (err)=>{
        this.loader.stop();
      })
    }


    pageChanged(event: any) {
      this.config.currentPage = event;
    }





 ngOnInit() {

  this.dtoptions ={
    pagingType: 'full_numbers',
  };

  this.route.params.subscribe((res:any)=>{
    this.id = res._id;
    this.getretailerDetails(res._id);
    console.log(res._id);
  })

  this.config = {
    itemsPerPage: 10,
    currentPage: 1,
  };









 }





}

