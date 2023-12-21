import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/lib/services/auth.service";
import { StorageService } from './component/storage.service';
import { CommonApi } from './lib/services/api/common.api';
import { CatalogService } from './lib/services/catalog.service';
import { Constants } from 'src/app/config/constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  

  constructor(
  private  storageService: StorageService,
  private commonApi : CommonApi,
  private catalogService: CatalogService,

 
  )

   {
  //  this.getdata();
  }

   //catalog mapping structure tree
  //  getdata() {
  //   this.catalogService.getcatalogTreedata().subscribe((res:any)=>{
  //     console.log(res);
  //     let masterCatalogfile = res.data[0].url;
  //     this.commonApi.getCDNLink(masterCatalogfile).subscribe((data:any)=>{
  //       if(data){
  //         this.storageService.setItem(Constants.PRODUCT_DATA,data);       
  //     }})
    
  //   })
  
  // }





  ngOnInit(): void {
  }


}

