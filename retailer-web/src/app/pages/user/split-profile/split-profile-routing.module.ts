import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplitProfilePage } from './split-profile.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'edit-profile-screen',
    pathMatch:'full'

  },
 
  {
    path: '',
    component: SplitProfilePage,
    // children:[
      
    //   {
    //     path:'edit-profile-screen',
    //     loadChildren:()=>import('../edit-profile-screen/edit-profile-screen.module').then(m=>m.EditProfileScreenPageModule)
    //   },
    //   {
    //     path:'wallet',
    //     loadChildren:()=>import('../wallet/wallet.module').then(m=>m.WalletPageModule)
    //   },
    //   {
    //     path:'shop-address',
    //     loadChildren:()=>import('../../shopDetails/shop-address/shop-address.module').then(m=>m.ShopAddressPageModule)
    //   },
    //   {
    //     path:'settings',
    //     loadChildren:()=>import('../../user/setting/setting.module').then(m=>m.SettingPageModule)
    //   },
    //   {
    //     path:'subscription',
    //     loadChildren:()=>import('../../../pages/payment/subscription/subscription.module').then(m=>m.SubscriptionPageModule)
    //   },
    //   {
    //     path:'bank-form',
    //     loadChildren:()=>import('../../../pages/kyc/bank-form/bank-form.module').then(m=>m.BankFormPageModule)
    //   },
    //   {
    //     path:'help',
    //     loadChildren:()=>import('../../../pages/user/help/help.module').then(m=>m.HelpPageModule)
    //   },

    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitProfilePageRoutingModule {}
