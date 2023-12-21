import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CatalogService } from 'src/app/lib/services/catalog.service';
// import { LoaderService } from 'src/app/lib/services/loader.service';
import { LoaderService } from 'src/app/lib/services/loader.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // @Output() onUpdatemapping = new EventEmitter<any>();
  @Output() updateProductData = new EventEmitter<any>();
  productsData: any;
  id: any;
  count: number = 0;
  tableSize: number = 5;
  config: any;

  syncBtn: any;

  constructor(
    private catalogService: CatalogService,
    private loadingService: LoaderService,
    private router: Router,
  ) { }

  productList = [
    { 'name': 'SNo' },
    { 'name': 'Product Id' },
    { 'name': 'Product name' },
    { 'name': 'image' },
    { 'name': 'Description' },
    { 'name': 'Place of origin' },
    { 'name': 'Minimum Order Quantity' },
    { 'name': 'Maximum Order Quantity' },
    { 'name': 'Minimum price per order' },
    { 'name': 'Weight per piece' },
    { 'name': 'Regular price' },
    { 'name': 'MRP' },
    { 'name': 'Selling price' },
    { 'name': 'Return option' },
    { 'name': 'Veg' },
    { 'name': 'Tax_status' },
    { 'name': 'HSN' },
    { 'name': 'tax' },
    { 'name': 'min_price' },
    { 'name': 'max_price' },
    { 'name': 'Update' },
    { 'name': 'UpdateMapping' },
    { 'name': 'Delete' },
  ]

  dataList = [
    "sno",
    "id",
    "name",
    "image",
    "description",
    "place_of_origin",
    "min_oq",
    "max_oq",
    "min_ppo",
    "weight_per_piece",
    "rp",
    "mrp",
    "sp",
    "return_option",
    "veg",
    "tax_status",
    "hsn",
    "tax",
    "min_price",
    "max_price",
    "update",
    "updatemapping",
    "delete"
  ]

  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  searchText: string = '';
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 1;

  getProducts(e?: any) {
    if (e) {
      this.page = e.next ? this.page + 1 : e.prev ? this.page - 1 : this.page;
      this.pageSize = e.pageSize;
    }
    this.loadingService.setLoading(true);
    this.catalogService.getProducts(this.searchText, this.page, this.pageSize).subscribe((res: any) => {
      this.productsData = res['data'];
      this.totalItems = res['data'].totalCount;
      this.loadingService.setLoading(false);
      console.log(this.productsData)
    }, err => {
      console.log(err);
      this.loadingService.setLoading(false);
    });
  }
  syncOperation() {
    this.catalogService.syncOperation().subscribe((res: any) => {
      console.log(res);
    })
  }

  deleteProduct(id: any) {
    if (confirm(`Are You Sure To Delete The Record With Id ${id}`)) {
      this.catalogService.deletProduct(id).subscribe(() => {
        alert("Product Deleted Successfully");
        this.getProducts();
      })
    }
  }

  updateProductdata(id: any) {
    this.router.navigate(['/product-form', id])
  }

  onUpdatemapping(id: any) {
    console.log(id)
    this.router.navigate(['/product-form',id], {queryParams: {productcatalogData : true}});
  }

  ngOnInit(): void {
    this.getProducts();
    this.dtoptions = {
      pagingType: 'full_numbers',
    };
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
    };
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  gotoTop() {
    window.scrollTo(0, 0);
  }


}
