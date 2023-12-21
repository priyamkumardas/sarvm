import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../lib/pipe/pipes.module';

import { GstComponent } from './gst/gst.component';
import { DateTimePickerComponent } from 'src/app/components/date-time-picker/date-time-picker.component';

//import { MyReferalComponent } from 'src/app/referal/my-referal/my-referal.component';
//import { InviteCategoryComponent } from 'src/app/referal/invite-category/invite-category.component';
import { ReferFormComponent } from 'src/app/referal/refer-form/refer-form.component';
import { BottomTabViewComponent } from './bottom-tab-view/bottom-tab-view.component';
//import { DashboardComponent } from '../referal/dashboard/dashboard.component';
import { OrderAddressComponent } from './order-address/order-address.component';
import { AddWeightComponent } from './add-weight/add-weight.component';
import { DistanceCoversComponent } from './distance-covers/distance-covers.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderAcceptedComponent } from './order-accepted/order-accepted.component';
import { OrderItemStatusComponent } from './order-item-status/order-item-status.component';
import { DialogOrderStatusComponent } from './dialog-order-status/dialog-order-status.component';
import { DialogPaymentFailedComponent } from './dialog-payment-failed/dialog-payment-failed.component';
import { DialogPaymentSuccessComponent } from './dialog-payment-success/dialog-payment-success.component';
import { OrderNewComponent } from './order-new/order-new.component';
import { OrderDeliverySuccessComponent } from './order-delivery-success/order-delivery-success.component';
import { DialogPaymentComponent } from './dialog-payment/dialog-payment.component';

import { VehicleDrivingLicenseComponent } from './vehicle-driving-license/vehicle-driving-license.component';
import { VehicleRcComponent } from './vehicle-rc/vehicle-rc.component';
import { VehicleInsuranceComponent } from './vehicle-insurance/vehicle-insurance.component';
import { VehiclePollutionCertificateComponent } from './vehicle-pollution-certificate/vehicle-pollution-certificate.component';
import { VehicleOthersPermitComponent } from './vehicle-others-permit/vehicle-others-permit.component';
import { VehicleOthersDewormingCertiComponent } from './vehicle-others-deworming-certi/vehicle-others-deworming-certi.component';

import { VerifyOtpComponent } from '../pages/driver/verify-otp/verify-otp.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { OrderInTransitComponent } from './order-in-transit/order-in-transit.component';
import { InviteReferModalComponent } from '../referal/invite-refer-modal/invite-refer-modal.component';
//import { ReferralRatingComponent } from '../referal/referral-rating/referral-rating.component';
import { DeleteQrComponent } from './delete-qr/delete-qr.component';
import { ScanQrCodeComponent } from '../pages/kyc/bank-details/scan-qr-code/scan-qr-code.component';

const COMPONENTS = [
  GstComponent,
  BottomTabViewComponent,
  DateTimePickerComponent,
  OrderAddressComponent,
  AddWeightComponent,
  OrderNewComponent,
  OrderDetailsComponent,
  OrderAcceptedComponent,
  OrderItemStatusComponent,
  OrderDeliverySuccessComponent,
  DistanceCoversComponent,
  //MyReferalComponent,
  //InviteCategoryComponent,
  //DashboardComponent,
  ReferFormComponent,
  DialogOrderStatusComponent,
  DialogPaymentComponent,
  DialogPaymentFailedComponent,
  DialogPaymentSuccessComponent,

  VehicleDrivingLicenseComponent,
  VehicleRcComponent,
  VehicleInsuranceComponent,
  VehiclePollutionCertificateComponent,
  VehicleOthersPermitComponent,
  VehicleOthersDewormingCertiComponent,
  
  VerifyOtpComponent,
  ConfirmationPopupComponent,
  OrderInTransitComponent,
  InviteReferModalComponent,
  //ReferralRatingComponent,

  DeleteQrComponent,
  ScanQrCodeComponent
];
@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    PipeModule,
  ],
  exports: [
    CommonModule,
    ...COMPONENTS
  ],
})
export class SharedModule { }