
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './lib/guard/auth.guard';
import { IntroGuard } from './lib/guard/intro.guard';
import { PublicGuard } from './lib/guard/public.guard';
import { PaymentdoneGuard } from './lib/guard/paymentdone.guard'
import { CangobackGuard } from './lib/guard/cangoback.guard'
import { UserpreferenceGuard } from './lib/guard/userpreference.guard';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import { ReferalQrScannerComponent } from './referal/referal-qr-scanner/referal-qr-scanner.component';
import { DashboardComponent } from './referal/dashboard/dashboard.component';
import { ReferalModule } from './referal/referal.module';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>import('./auth/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [IntroGuard, PublicGuard],
  },
  {
    path: 'otp/:phone',
    loadChildren: () => import('./auth/otp/otp.module').then(m => m.OtpPageModule),
    canActivate: [PublicGuard],

  },
  {
    path: 'selected-city',
    loadChildren: () =>import('./pages/selected-city/selected-city.module').then((m) => m.SelectedCityPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'selected-language',
    loadChildren: () =>import('./pages/selected-language/selected-language.module').then((m) => m.SelectedLanguagePageModule),
  },
  {
    path: 'update-language',
    loadChildren: () =>import('./pages/selected-language/selected-language.module').then((m) => m.SelectedLanguagePageModule),
  },
  {
    path: 'selected-preference',
    loadChildren: () =>import('./pages/selected-preference/selected-preference.module').then((m) => m.SelectedPreferencePageModule),
    canActivate: [IntroGuard],
  },
  {
    path: 'payment-success',
    loadChildren: () =>import('./pages/payment/payment-success/payment-success.module').then((m) => m.PaymentSuccessPageModule),
  },
  {
    path: 'track-order/:id',
    loadChildren: () =>import('./pages/order/track-order/track-order.module').then((m) => m.TrackOrderPageModule),
  },
  {
    path: 'order-details/:id',
    loadChildren: () =>import('./pages/order/order-details/order-details.module').then((m) => m.OrderDetailsPageModule),
  },
  {
    path: 'active-order/:order',
    loadChildren: () =>import('./pages/order/active-order/active-order.module').then((m) => m.ActiveOrderPageModule),
  },
  {
    path: 'store-listing/:id',
    loadChildren: () =>import('./pages/store/store-listing/store-listing.module').then((m) => m.StoreListingPageModule),
  },
  {
    path: 'seller-profile/:id',
    loadChildren: () =>
      import('./pages/store/store-details/store-details.module').then(
        (m) => m.StoreDetailsPageModule
      ),
  },
  {
    path: 'store-details',
    loadChildren: () =>import('./pages/store/store-details/store-details.module').then((m) => m.StoreDetailsPageModule),
  },
  {
    path: 'address-list',
    loadChildren: () =>import('./pages/selectAddress/address-list/address-list.module').then((m) => m.AddressListPageModule),
  },
  {
    path: 'custom-address',
    loadChildren: () =>import('./pages/selectAddress/custom-address/custom-address.module').then((m) => m.CustomAddressPageModule),
  },
  {
    path: 'cart',
    loadChildren: () =>import('./pages/cart/cart.module').then((m) => m.CartPageModule),
    canActivate: [PaymentdoneGuard],
  },
  {
    path: 'payment-screen',
    loadChildren: () =>import('./pages/payment/payment-screen/payment-screen.module').then((m) => m.PaymentScreenPageModule),
    canActivate: [AuthGuard, PaymentdoneGuard],
  },
  {
    path: 'faq',
    loadChildren: () =>import('./pages/support/faq/faq.module').then((m) => m.FaqPageModule),
  },
  {
    path: 'help',
    loadChildren: () =>import('./pages/support/help/help.module').then((m) => m.HelpPageModule),
  },
  {
    path: 'favourite',
    loadChildren: () =>import('./pages/user/favourite/favourite.module').then((m) => m.FavouritePageModule),
  },
  {
    path: 'setting',
    loadChildren: () =>import('./pages/user/setting/setting.module').then((m) => m.SettingPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>import('./pages/user/profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'productlisting/:id',
    loadChildren: () =>import('./pages/store/productlisting/productlisting.module').then((m) => m.ProductlistingPageModule),
  },
  {
    path: 'add-member',
    loadChildren: () =>import('./pages/user/add-member/add-member.module').then((m) => m.AddMemberPageModule),
  },
  {
    path: 'add-employee/:id',
    loadChildren: () => import('./pages/employees/add-employee/add-employee.module').then(m => m.AddEmployeePageModule)
  },
  {
    path: 'employee-list',
    loadChildren: () => import('./pages/employees/employee-list/employee-list.module').then(m => m.EmployeeListPageModule)
  },
  {
    path: 'employee-profile/:id',
    loadChildren: () => import('./pages/employees/employee-profile/employee-profile.module').then(m => m.EmployeeProfilePageModule)
  },
  {
    path: 'payorder',
    loadChildren: () => import('./pages/order/payorder/payorder.module').then(m => m.PayorderPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/order/support/support.module').then(m => m.SupportPageModule)
  },
  {
    path: 'instruction',
    loadChildren: () => import('./pages/order/instruction/instruction.module').then(m => m.InstructionPageModule)
  },
  {
    path: 'update-address/:aid',
    canDeactivate: [CangobackGuard],
    loadChildren: () => import('./pages/user/address/update-address/update-address.module').then(m => m.UpdateAddressPageModule)
  },
  
  {
    path: 'saved-address',
    loadChildren: () => import('./pages/user/address/saved-address/saved-address.module').then(m => m.SavedAddressPageModule)
  },
  { path: 'user-edit-profile',
    component: EditUserProfileComponent
  },
  {
    path: 'referal-qr-scan',
    component : ReferalQrScannerComponent
  },
  {
    path: 'mysociety',
    loadChildren: () => import('./pages/society/owner/mysociety/mysociety.module').then( m => m.MysocietyPageModule)
  },
  {
    path: 'addsociety',
    loadChildren: () => import('./pages/society/owner/addsociety/addsociety.module').then( m => m.AddsocietyPageModule)
  },
  {
    path: 'upload-documents',
    loadChildren: () => import('./pages/society/owner/upload-documents/upload-documents.module').then( m => m.UploadDocumentsPageModule)
  },
  {
    path: 'add-admin',
    loadChildren: () => import('./pages/society/owner/add-admin/add-admin.module').then( m => m.AddAdminPageModule)
  },
  {
    path: 'add-blocks',
    loadChildren: () => import('./pages/society/owner/add-blocks/add-blocks.module').then( m => m.AddBlocksPageModule)
  },
  {
    path: 'add-flats',
    loadChildren: () => import('./pages/society/owner/add-flats/add-flats.module').then( m => m.AddFlatsPageModule)
  },
  {
    path: 'livingin',
    loadChildren: () => import('./pages/society/user/livingin/livingin.module').then( m => m.LivinginPageModule)
  },
  {
    path: 'select-society',
    loadChildren: () => import('./pages/society/user/select-society/select-society.module').then( m => m.SelectSocietyPageModule)
  },
  {
    path: 'select-block',
    loadChildren: () => import('./pages/society/user/select-block/select-block.module').then( m => m.SelectBlockPageModule)
  },
  {
    path: 'select-flat',
    loadChildren: () => import('./pages/society/user/select-flat/select-flat.module').then( m => m.SelectFlatPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'my-qr',
    loadChildren: () => import('./pages/user/my-qr/my-qr.module').then( m => m.MyQrPageModule)
  },
  {
    path: 'referal',
    loadChildren: () => import('./referal/referal.module').then( m => m.ReferalModule)
  }



  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
