import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './lib/services/auth.service';

import { AuthGuard } from './lib/guard/auth.guard';
import { IntroGuard } from './lib/guard/intro.guard';
import { PublicGuard } from './lib/guard/public.guard';
import { SubscriptionGuard } from './lib/guard/subscription.guard';
import { ScanQrCodeComponent } from './pages/kyc/bank-details/scan-qr-code/scan-qr-code.component';
import { OrderAddressComponent } from './components/order-address/order-address.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [IntroGuard, PublicGuard],
  },
  {
    path: 'selected-language',
    loadChildren: () => import('./pages/selected-language/selected-language.module').then((m) => m.SelectedLanguagePageModule)
  },
  {
    path: 'update-language',
    loadChildren: () => import('./pages/selected-language/selected-language.module').then((m) => m.SelectedLanguagePageModule)
  },
  {
    path: 'otp/:phone',
    loadChildren: () => import('./auth/otp/otp.module').then((m) => m.OtpPageModule),
    canActivate: [IntroGuard, PublicGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'kyc-status',
    loadChildren: () => import('./pages/kyc/kyc-status/kyc-status.module').then((m) => m.KycStatusPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'bank-form',
    loadChildren: () => import('./pages/kyc/bank-form/bank-form.module').then((m) => m.BankFormPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'select-vehicle',
    loadChildren: () => import('./pages/driver/select-vehicle/select-vehicle.module').then((m) => m.SelectVehiclePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'vehicle-document',
    loadChildren: () => import('./pages/driver/vehicle-document/vehicle-document.module').then((m) => m.VehicleDocumentPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/driver/profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/driver/edit-profile/edit-profile.module').then((m) => m.EditProfilePageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/support/help/help.module').then((m) => m.HelpPageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./pages/payment/subscription/subscription.module').then(m => m.SubscriptionPageModule)
  },
  {
    path: 'package-list',
    loadChildren: () => import('./pages/payment/package-list/package-list.module').then(m => m.PackageListPageModule),
    canActivate: [AuthGuard, SubscriptionGuard],
  },
  {
    path: 'invoice/:info',
    loadChildren: () => import('./pages/payment/invoice/invoice.module').then(m => m.InvoicePageModule)
  },
  {
    path: 'payment-insight',
    loadChildren: () => import('./pages/payment/payment-insight/payment-insight.module').then(m => m.PaymentInsightPageModule)
  },
  {
    path: 'trip-history',
    loadChildren: () => import('./pages/payment/trip-history/trip-history.module').then(m => m.TripHistoryPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/payment/notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'delivery-options',
    loadChildren: () => import('./pages/driver/delivery-options/delivery-options.module').then(m => m.DeliveryOptionsPageModule)
  },
  {
    path: 'order-pickup',
    loadChildren: () => import('./pages/orders/order-pickup/order-pickup.module').then(m => m.OrderPickupPageModule)
  },
  {
    path: 'order-delivery',
    loadChildren: () => import('./pages/orders/order-delivery/order-delivery.module').then(m => m.OrderDeliveryPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/support/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'delete-account',
    loadChildren: () => import('./pages/setting/delete-account/delete-account.module').then( m => m.DeleteAccountPageModule)
  },
  {
    path: 'bank-details',
    loadChildren: () => import('./pages/kyc/bank-details/bank-details.module').then( m => m.BankDetailsPageModule)
  },
  {
    path: 'select-upi-app',
    loadChildren: () => import('./pages/kyc/bank-details/select-upi-app/select-upi-app.module').then( m => m.SelectUpiAppPageModule)
  },
  {
    path: 'scan-qr-code', component: ScanQrCodeComponent
  },
  {
    path: 'order-address', component: OrderAddressComponent
  },  {
    path: 'support-us',
    loadChildren: () => import('./pages/support/support-us/support-us.module').then( m => m.SupportUsPageModule)
  },
  {
    path: 'referal',
    loadChildren: () => import('./referal/referal.module').then(m => m.ReferalModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
