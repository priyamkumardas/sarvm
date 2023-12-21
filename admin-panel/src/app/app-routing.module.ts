import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { OtpComponent } from './auth/otp/otp.component';
import { ShopDataComponent } from './component/shopData/shop-data/shop-data.component';
import { CategoryListComponent } from './component/catalog/category/category-list/category-list.component';
import { CategoryFormComponent } from './component/catalog/category/category-form/category-form.component';
import { CatalogListComponent } from './component/catalog/catalog/catalog-list/catalog-list.component';
import { CatalogFormComponent } from './component/catalog/catalog/catalog-form/catalog-form.component';
// import { AddProductDetailsComponent } from './component/catelog/add-product-details/add-product-details.component';
import { ActiveOrdersComponent } from './component/order/active-orders/active-orders.component';
import { OrderHistoryComponent } from './component/order/order-history/order-history.component';
import { TrackOrderComponent } from './component/order/track-order/track-order.component';
import { RetailerProfileComponent } from './component/profile/retailer-profile/retailer-profile.component';
import { EditShopComponent } from './component/shopData/edit-shop/edit-shop.component';
import { ViewShopComponent } from './component/shopData/view-shop/view-shop.component';
import { ShopDetailsComponent } from './component/shop-details/shop-details.component';
import { AuthGuard } from './lib/guard/auth.guard';
import { PublicGuard } from './lib/guard/public.guard';
import { EmplistComponent } from './pages/emplist/emplist.component';
import { HomeComponent } from './pages/home/home.component';
import { RetailKycDetailComponent } from './pages/retail-kyc-detail/retail-kyc-detail.component';
import { ShopaddressService } from './lib/services/shopaddress.service';
import { ShopAddressPageComponent } from './pages/shop-address-page/shop-address-page.component';
import { ShopOrdersComponent } from './component/order/shop-orders/shop-orders.component';
import { RetailerPaymentDetailsComponent } from './component/retailer-payment-details/retailer-payment-details.component';
import { ProductFormComponent } from './component/catalog/product/product-form/product-form.component';
import { ProductListComponent } from './component/catalog/product/product-list/product-list.component';
import { BulkUploadComponent } from './component/catalog/product/bulk-upload/bulk-upload.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'otp', component: OtpComponent, canActivate: [PublicGuard] },
  // { path: '', component: HomeComponent  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], },
  { path: 'shop-data', component: ShopDataComponent, canActivate: [AuthGuard], },
  { path: 'edit-shop-data/:id', component: EditShopComponent, canActivate: [AuthGuard] },
  { path: 'view-shop-details/:id', component: ViewShopComponent, canActivate: [AuthGuard] },
  { path: 'shoplist', component: ShopAddressPageComponent, canActivate: [AuthGuard] },
  { path: 'active-orders', component: ActiveOrdersComponent, canActivate: [AuthGuard] },
  { path: 'shopDetails/:_id', component: ShopDetailsComponent, canActivate: [AuthGuard] },

  {
    path:'shop-orders/:id',
    component:ShopOrdersComponent,
    canActivate:[]
  },
  { path: 'app-emplist', component: EmplistComponent, canActivate: [AuthGuard], },
  { path: 'track-order/:id', component: TrackOrderComponent, canActivate: [AuthGuard] },
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard] },
  { path: 'retailer-profile', component: RetailerProfileComponent, canActivate: [AuthGuard] },
  { path: 'product-form/:id', component:ProductFormComponent, canActivate:[AuthGuard] },
  { path: 'product-list', component:ProductListComponent, canActivate:[AuthGuard] },
  { path: 'category-list', component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: 'category-form/:id', component: CategoryFormComponent, canActivate: [AuthGuard] },
  { path: 'catalog-list', component: CatalogListComponent, canActivate: [AuthGuard] },
  { path: 'catalog-form/:id', component: CatalogFormComponent, canActivate: [AuthGuard] },
  { path: 'retailer-payment', component: RetailerPaymentDetailsComponent, canActivate: [AuthGuard] },
  { path: 'bulk-upload', component: BulkUploadComponent, canActivate: [AuthGuard] },






  // {
  //   path: '',
  //   component:HomeComponent,
  //   canActivate: [AuthGuard],
  // },


  {
    path: 'kycdetails',
    component: RetailKycDetailComponent
  },








  // {
  //   path:'profile-section',
  //   component:ProfileSectionComponent,
  //   canActivate:[]
  // },
  // {
  //   path:'retailer-profile/:id',
  //   component:RetailerProfileComponent,
  //   canActivate:[]
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, OtpComponent, HomeComponent, ShopDataComponent, EditShopComponent, ViewShopComponent, ShopAddressPageComponent, ActiveOrdersComponent, ShopDetailsComponent, EmplistComponent, TrackOrderComponent, OrderHistoryComponent,  RetailerProfileComponent, CatalogListComponent, CategoryListComponent, CategoryFormComponent, CatalogFormComponent,RetailerPaymentDetailsComponent,ProductFormComponent ,ProductListComponent,BulkUploadComponent]
