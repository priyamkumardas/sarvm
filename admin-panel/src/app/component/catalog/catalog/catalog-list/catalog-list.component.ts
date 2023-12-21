import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CatalogService } from 'src/app/lib/services/catalog.service';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {

  category:any;
  status?: string;
  catalog: any;
  constructor(private catalogService:CatalogService, private ngxLoaderService:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getCatalogData();
  }

  getCatalogData(){
    this.ngxLoaderService.start();
    this.catalogService.getCatalogData().subscribe((res)=>{
      console.log(Object.values(res));
      var tmp=Object.values(res);
      this.catalog=tmp[1];
      this.ngxLoaderService.stop();
            },
            (err)=>{
              this.ngxLoaderService.stop();
            });
  }
  deleteCatalog(id:any)
  {
    this.catalogService.deleteCatalogById(id).subscribe(() => {
      this.status = 'Delete successful'
      this.getCatalogData();
    });
  
  }
}
