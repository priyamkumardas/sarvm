import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/config/constants';
import { CommonApi } from './api/common.api';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private commonService: CommonService,
    private commonApi: CommonApi) {}

  onCreateProduct(data: any): Observable < any > {
    console.log(data);
    return this.commonApi.postData(`${ApiUrls.productdetails.products}`, data);
  }
  
  upload(file: any, preSignedUrl: any): Observable < any > {
    const formData = new FormData();
    formData.append("file", file, file.name);
    
    return this.commonApi.putDataByUrl(preSignedUrl, formData);
  }

  getPresignedUrl() {
    return this.commonApi.getData(`${ApiUrls.productdetails.productImage}`);
  }

  onUpload(event: any): Observable < any > {
    return this.commonApi.putData(`${ApiUrls.productdetails.products}`, event)
  }

  getProducts(searchText: string, page: number, pageSize: number) {
    let params = `?q=${searchText}&page=${page}&pageSize=${pageSize}`
    return this.commonApi.getData(ApiUrls.productdetails.products + params);
  }
  syncOperation() {
    return this.commonApi.getData(`${ApiUrls.productdetails.syncproductApi}`);
  }
  bulkUpload(data:any) {
    return this.commonApi.postData(`${ApiUrls.productdetails.bulkUpdate}`,data);
  }
  getProductById(id: any) {
    return this.commonApi.getProductDataById(ApiUrls.productdetails.products + '/' + id);
  }

  addProduct(product: any) {
    return this.commonApi.postData(ApiUrls.productdetails.products, product)
  }
  // addproductMapping(id:any, category:any){
  //   console.log('ProductId',id);
  //   return this.commonApi.postData(`${ApiUrls.productdetails.productMapping}/${id}`,category);

  // }
  addproductMapping(id: any, category: any) {
    console.log('ProductId', id);
    return this.commonApi.putData(`${ApiUrls.productdetails.productMapping(id)}`, category);

  }
  getcatalogTreedata() {
    return this.commonApi.getData(ApiUrls.productdetails.catalogTree);
  }
  getCatalog(url: string) {
    return this.commonApi.getCDNLink(url);
  }

  deletProduct(id: any) {
    return this.commonApi.deletProductById(`${ApiUrls.productdetails.products}/${id}`);
  }
  updateProductById(id: any, data: any) {
    return this.commonApi.updateProductDataById(ApiUrls.productdetails.products + '/' + id, data);
  }



  onGetDataTree() {
    return this.commonApi.getDataTree(`${ApiUrls.categoryDataTree}`);
  }

  onCreateCategory(data: any): Observable < any > {
    console.log(data);
    return this.commonApi.postData(`${ApiUrls.categorydetails.categories}`, data);
  }
  onCreateCatalog(data: any): Observable < any > {
    console.log(data);
    return this.commonApi.postData(`${ApiUrls.catalogDetails.catalog}`, data);
  }
  onParentsCall() {
    return this.commonApi.getParentData(`${ApiUrls.categorydetails.categories}`);
  }
  uploadCategory(file: any, preSignedUrl: any): Observable < any > {


    const formData = new FormData();


    formData.append("file", file, file.name);


    return this.commonApi.putDataByUrl(preSignedUrl, formData);
  }
  uploadCatalog(preSignedUrl: any, image:any): Observable < any > {
    return this.commonApi.putDataByUrl(preSignedUrl, image);
  }

  getPresignedUrlcategory() {
    return this.commonApi.getData(`${ApiUrls.categorydetails.categoryImage}`)
  }

  onUploadcategory(event: any): Observable < any > {
    return this.commonApi.putData(`${ApiUrls.categorydetails.categories}`, event)
  }

  getCategory() {
    return this.commonApi.getData(ApiUrls.categorydetails.categories);
  }
  getCatalogData() {
    return this.commonApi.getData(ApiUrls.catalogDetails.catalog);
  }
  getCategoryById(id: any) {
    return this.commonApi.getCategoryDataById(ApiUrls.categorydetails.categories + '/' + id);
  }
  getCatalogById(id: any) {
    return this.commonApi.getCatalogDataById(ApiUrls.catalogDetails.catalog + '/' + id);
  }

  updateCategoryById(id: any, data: any) {
    return this.commonApi.updateCategoryDataById(ApiUrls.categorydetails.categories + '/' + id, data);
  }
  updateCatalogById(id: any, data: any) {
    return this.commonApi.updateCatalogDataById(ApiUrls.catalogDetails.catalog + '/' + id, data);
  }
  deleteCategoryById(id: any) {
    return this.commonApi.deleteCategoryById(ApiUrls.categorydetails.categories + '/' + id);
  }
  deleteCatalogById(id: any) {
    return this.commonApi.deleteCatalogById(ApiUrls.catalogDetails.catalog + '/' + id);
  }
  addCategory(category: any) {
    return this.commonApi.postData(ApiUrls.categorydetails.categories, category)
  }
}
