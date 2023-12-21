import { MyCatalogModule } from './pages/catelog/my-catalog/my-catalog.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './lib/services/auth.service';

import { AuthGuard } from './lib/guard/auth.guard';
import { IntroGuard } from './lib/guard/intro.guard';
import { PublicGuard } from './lib/guard/public.guard';
import { ShopGuard } from './lib/guard/shop.guard';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';



const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/user/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
  },
  
  
  {
    path:'profile/edit-profile-screen',
    redirectTo:'edit-profile-screen',
    pathMatch:'full'
  },
  
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [IntroGuard, PublicGuard],
  },
  {
    path: 'selected-language',
    loadChildren: () =>
      import('./pages/selected-language/selected-language.module').then(
        (m) => m.SelectedLanguagePageModule
      ),
    // canLoad: [AuthService]
  },
  {
    path: 'otp/:phone',
    loadChildren: () =>
      import('./auth/otp/otp.module').then((m) => m.OtpPageModule),
    canActivate: [IntroGuard, PublicGuard],
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard,ShopGuard],
  },
  {
    path: 'kyc-form',
    loadChildren: () =>
      import('./pages/kyc/kyc-form/kyc-form.module').then(
        (m) => m.KycFormPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'bank-form',
    loadChildren: () =>
      import('./pages/kyc/bank-form/bank-form.module').then(
        (m) => m.BankFormPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'shop-address',
    loadChildren: () =>
      import('./pages/shopDetails/shop-address/shop-address.module').then(
        (m) => m.ShopAddressPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'shop-working-hours',
    loadChildren: () =>
      import(
        './pages/shopDetails/shop-working-hours/shop-working-hours.module'
      ).then((m) => m.ShopWorkingHoursPageModule),
  },
  ///////////////////////////////////////////   Catelog////////////////////////////////////////
  {
    path: 'select-category',
    loadChildren: () =>
      import('./pages/catelog/select-category/select-category.module').then(
        (m) => m.SelectCategoryPageModule
      ),
  },
  {
    path: 'add-product-details',
    loadChildren: () =>
      import(
        './pages/catelog/add-product-details/add-product-details.module'
      ).then((m) => m.AddProductDetailsPageModule),
  },
  {
    path: 'my-catalog',
    loadChildren: () =>
      import('./pages/catelog/my-catalog/my-catalog.module').then(
        (m) => m.MyCatalogModule
      ),
  },
  {
    path: 'browse-catalog',
    loadChildren: () =>
      import(
        './pages/catelog/select-food/browse-catalog/browse-catalog.module'
      ).then((m) => m.BrowseCatalogPageModule),
  },
  {
    path: 'select-food',
    loadChildren: () =>
      import('./pages/catelog/select-food/select-food.module').then(
        (m) => m.SelectFoodPageModule
      ),
  },
  {
    path: 'product-listing',
    loadChildren: () =>
      import('./pages/catelog/product-listing/product-listing.module').then(
        (m) => m.ProductListingPageModule
      ),
  },
  {
    path: 'selected-product-preview',
    loadChildren: () =>
      import(
        './pages/catelog/selected-product-preview/selected-product-preview.module'
      ).then((m) => m.SelectedProductPreviewPageModule),
  },
  {
    path: 'product-pricing',
    loadChildren: () =>
      import(
        './pages/catelog/productProperties/product-pricing/product-pricing.module'
      ).then((m) => m.ProductPricingPageModule),
  },
  {
    path: 'productdiscount',
    loadChildren: () =>
      import(
        './pages/catelog/productProperties/productdiscount/productdiscount.module'
      ).then((m) => m.ProductdiscountPageModule),
  },
  {
    path: 'product-grading',
    loadChildren: () =>
      import(
        './pages/catelog/productProperties/product-grading/product-grading.module'
      ).then((m) => m.ProductGradingPageModule),
  },

  /////////// EMployee///////////////////////
  {
    path: 'add-employee',
    loadChildren: () =>
      import('./pages/employees/add-employee/add-employee.module').then(
        (m) => m.AddEmployeePageModule
      ),
  },
  {
    path: 'employee-list',
    loadChildren: () =>
      import('./pages/employees/employee-list/employee-list.module').then(
        (m) => m.EmployeeListPageModule
      ),
  },
  {
    path: 'employee-profile',
    loadChildren: () =>
      import('./pages/employees/employee-profile/employee-profile.module').then(
        (m) => m.EmployeeProfilePageModule
      ),
  },
  {
     path: 'order',
     loadChildren: () =>
       import('./pages/order/order/order.module').then((m) => m.OrderPageModule),
   },

  {
    path: 'order-details/:orderId/:orderStatus',
    loadChildren: () =>
      import('./pages/order/order-details/order-details.module').then(
        (m) => m.OrderDetailsPageModule
      ),
  },
  {
    path: 'order-history',
    loadChildren: () =>
      import('./pages/order/order-history/order-history.module').then(
        (m) => m.OrderHistoryPageModule
      ),
  },
  {
    path: 'package-list',
    loadChildren: () =>
      import('./pages/payment/package-list/package-list.module').then(
        (m) => m.PackageListPageModule
      ),
  },
  {
    path: 'selling-mode',
    loadChildren: () =>
      import('./pages/shopDetails/selling-mode/selling-mode.module').then(
        (m) => m.SellingModePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/user/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
  },

  {
    path: 'setting',
    loadChildren: () =>
      import('./pages/user/setting/setting.module').then(
        (m) => m.SettingPageModule
      ),
  },
  {
    path: 'invoice/:info',
    loadChildren: () =>
      import('./pages/payment/invoice/invoice.module').then(
        (m) => m.InvoicePageModule
      ),
  },
  {
    path: 'subscription',
    loadChildren: () =>
      import('./pages/payment/subscription/subscription.module').then(
        (m) => m.SubscriptionPageModule
      ),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./support/faq/faq.module').then((m) => m.FaqPageModule),
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./pages/user/help/help.module').then((m) => m.HelpPageModule),
  },
  /* {
    path: 'order-tabs',
    loadChildren: () =>
      import('./pages/order/order-tabs/order-tabs.module').then(m => m.OrderTabsPageModule)
  }, */
  {
    path: 'order-notification',
    loadChildren: () =>
      import('./pages/order/order-notification/order-notification.module').then(m => m.OrderNotificationPageModule)
  },
  {
    path: 'schedule-date',
    loadChildren: () => import('./pages/order/orderProperties/schedule-date/schedule-date.module').then( m => m.ScheduleDatePageModule)
  },
  {
    path: 'schedule-calendar',
    loadChildren: () => import('./pages/order/orderProperties/schedule-calendar/schedule-calendar.module').then( m => m.ScheduleCalendarPageModule)
  },
  {
    path: 'schedule-time',
    loadChildren: () => import('./pages/order/orderProperties/schedule-time/schedule-time.module').then( m => m.ScheduleTimePageModule)
  },
  {
    path: 'full-notification',
    loadChildren: () => import('./support/full-notification/full-notification.module').then( m => m.FullNotificationPageModule)
  },
  {
    path: 'edit-profile', component:EditProfileComponent

  },


  {
    path: 'seller-profile/:id',
    loadChildren: () => import('./components/seller-profile/seller-profile.module').then( m => m.SellerProfilePageModule)
  },
  // {
  //   path: 'orders',
  //   loadChildren: () => import('./pages/newfolder/orders/orders.module').then( m => m.OrdersPageModule)
  // },
  // {
  //   path: 'new-order',
  //   loadChildren: () => import('./pages/newfolder/new-order/new-order.module').then( m => m.NewOrderPageModule)
  // },
  {
    path: 'employee-profile',
    loadChildren: () =>
      import('./pages/employees/employee-profile/employee-profile.module').then(
        (m) => m.EmployeeProfilePageModule
      ),
  },
  {
     path: 'order',
     loadChildren: () =>
       import('./pages/order/order/order.module').then((m) => m.OrderPageModule),
   },

  {
    path: 'order-details/:orderId/:orderStatus',
    loadChildren: () =>
      import('./pages/order/order-details/order-details.module').then(
        (m) => m.OrderDetailsPageModule
      ),
  },
  {
    path: 'order-history',
    loadChildren: () =>
      import('./pages/order/order-history/order-history.module').then(
        (m) => m.OrderHistoryPageModule
      ),
  },
  {
    path: 'package-list',
    loadChildren: () =>
      import('./pages/payment/package-list/package-list.module').then(
        (m) => m.PackageListPageModule
      ),
  },
  {
    path: 'selling-mode',
    loadChildren: () =>
      import('./pages/shopDetails/selling-mode/selling-mode.module').then(
        (m) => m.SellingModePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/user/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
  },

  {
    path: 'setting',
    loadChildren: () =>
      import('./pages/user/setting/setting.module').then(
        (m) => m.SettingPageModule
      ),
  },
  {
    path: 'invoice/:info',
    loadChildren: () =>
      import('./pages/payment/invoice/invoice.module').then(
        (m) => m.InvoicePageModule
      ),
  },
  {
    path: 'subscription',
    loadChildren: () =>
      import('./pages/payment/subscription/subscription.module').then(
        (m) => m.SubscriptionPageModule
      ),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./support/faq/faq.module').then((m) => m.FaqPageModule),
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./pages/user/help/help.module').then((m) => m.HelpPageModule),
  },
  /* {
    path: 'order-tabs',
    loadChildren: () =>
      import('./pages/order/order-tabs/order-tabs.module').then(m => m.OrderTabsPageModule)
  }, */
  {
    path: 'order-notification',
    loadChildren: () =>
      import('./pages/order/order-notification/order-notification.module').then(m => m.OrderNotificationPageModule)
  },
  {
    path: 'schedule-date',
    loadChildren: () => import('./pages/order/orderProperties/schedule-date/schedule-date.module').then( m => m.ScheduleDatePageModule)
  },
  {
    path: 'schedule-calendar',
    loadChildren: () => import('./pages/order/orderProperties/schedule-calendar/schedule-calendar.module').then( m => m.ScheduleCalendarPageModule)
  },
  {
    path: 'schedule-time',
    loadChildren: () => import('./pages/order/orderProperties/schedule-time/schedule-time.module').then( m => m.ScheduleTimePageModule)
  },
  {
    path: 'full-notification',
    loadChildren: () => import('./support/full-notification/full-notification.module').then( m => m.FullNotificationPageModule)
  },
  {
    path: 'edit-profile', component:EditProfileComponent

  },


  {
    path: 'seller-profile/:id',
    loadChildren: () => import('./components/seller-profile/seller-profile.module').then( m => m.SellerProfilePageModule)
  },
  // {
  //   path: 'catalog',
  //   loadChildren: () => import('./pages/newfolder/catalog/catalog.module').then( m => m.CatalogPageModule)
  // },
  {
    path: 'order-quantity',
    loadChildren: () =>
      import(
        './pages/catelog/productProperties/order-quantity/order-quantity.module'
      ).then((m) => m.OrderQuantityPageModule),
  },
  {
    path: 'customer-detail/:customerId/:userPhoneNumber/:userStatus',
    loadChildren: () => import('./pages/crm/customer-detail/customer-detail.module').then( m => m.CustomerDetailPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/crm/customers/customers.module').then( m => m.CustomersPageModule)
  },







 
 
  {
    path: 'wallet',
    loadChildren: () => import('./pages/user/wallet/wallet.module').then( m => m.WalletPageModule)
  },


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
