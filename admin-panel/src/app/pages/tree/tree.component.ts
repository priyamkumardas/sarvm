import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  items: any;
  data:any;

  catalog:any;
  categories:any;
  subCatagoriers:any;
  product:any;

  constructor(
    private http:HttpClient
  ) {
    this.getdata();
  }




  getdata(){
    this.http.get<any>('./assets/tmpJson/categoryData.json')
    .subscribe(response => {
      this.catalog = response.catalog;
      console.log(this.catalog);
    });
  }


  getId(i:any){
    this.categories = this.catalog[i].categories;
  }

  getsubId(i:any){
    this.subCatagoriers = this.categories[i].categories;
  }

  getproduct(i:any){
    this.product = this.subCatagoriers[i].products;
  }





  ngOnInit(): void {

  }

}
