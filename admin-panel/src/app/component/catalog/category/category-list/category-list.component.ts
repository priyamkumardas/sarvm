import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { CatalogService } from 'src/app/lib/services/catalog.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  category:any;
  status?: string;
  page: number = 1;
  count: number = 0;
  tableSize: number=5;
  constructor(private catalogService:CatalogService, private ngxLoaderService:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getCategory();
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  getCategory(){
    this.ngxLoaderService.start();
    this.catalogService.getCategory().subscribe(res=>{
      console.log(Object.values(res));
      var tmp=Object.values(res);
      this.category=tmp[1];
      console.log(this.category)
      this.ngxLoaderService.stop();
            },
            (err)=>{
              this.ngxLoaderService.stop();
            });
  }
  deleteCategory(id:any)
  {
    this.catalogService.deleteCategoryById(id).subscribe(() => {
      this.status = 'Delete successful'
      this.getCategory();
    });
  
  }
}

