import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule,  HttpClient,  HTTP_INTERCEPTORS,} from '@angular/common/http';
import { InterceptorService } from './lib/services/interceptor.service';
import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';


import { OnlyNumber } from './shared/onlynumber.directive';
import { FilterPipe } from './lib/pipe/filter.pipe';
// import { OrderModule } from './component/order/order.module';
import { OrderRoutingModule } from './component/order/order-routing.module';
// import {MatCardModule} from '@angular/material/card';
import {NgxPaginationModule} from 'ngx-pagination';
import { RetailKycDetailComponent } from './pages/retail-kyc-detail/retail-kyc-detail.component';
// import { IonicModule} from '@ionic/angular';
// import { AddProductDetailsComponent } from './component/catelog/add-product-details/add-product-details.component';
import { CategoryRoutingModule } from './component/catalog/category/category-routing.module';
// import { TreeviewModule } from 'ngx-treeview';
import { TreeComponent } from './pages/tree/tree.component';
import { IonicModule } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';
import { OrderModule } from './component/order/order.module';
import { ShopOrdersComponent } from './component/order/shop-orders/shop-orders.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import {DataTablesModule} from 'angular-datatables';
import { RetailerPaymentDetailsComponent } from './component/retailer-payment-details/retailer-payment-details.component';
import { ProductFormComponent } from './component/catalog/product/product-form/product-form.component';
import { ProductListComponent } from './component/catalog/product/product-list/product-list.component';
import { TableComponent } from './shared/table/table.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import {NumberNegativeDirective} from './shared/number-negative.directive'
import { BulkUploadComponent } from './component/catalog/product/bulk-upload/bulk-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    routingComponents,
    FilterPipe,
    HeaderComponent,
    ShopOrdersComponent,
    RetailKycDetailComponent,
    TreeComponent,
    RetailerPaymentDetailsComponent,
    ProductFormComponent,
    ProductListComponent,
    TableComponent,
    PaginationComponent,
    NumberNegativeDirective,
    BulkUploadComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    // TreeviewModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxUiLoaderModule,
    OrderModule,
    OrderRoutingModule,
   CategoryRoutingModule,
   NgxUiLoaderModule,
   NgxUiLoaderHttpModule.forRoot({
    showForeground:true,
   }),
   DataTablesModule


  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
