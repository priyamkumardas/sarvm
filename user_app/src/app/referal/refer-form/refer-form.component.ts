import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { ReferralService } from '../referral.service';
import { PhoneCheck } from 'src/app/config/constants';
import { InviteModalComponent } from '../invite-modal/invite-modal.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/lib/services/location.service';
import { Capacitor } from '@capacitor/core';
import { StorageService } from 'src/app/lib/services/storage.service';


@Component({
  selector: 'app-refer-form',
  templateUrl: './refer-form.component.html',
  styleUrls: ['./refer-form.component.scss'],
})
export class ReferFormComponent implements OnInit {


  phoneNumber: any = null;
  invalidPhone: boolean = true;
  mobileNumber: any;
  userId: any = 1;
  showBottomSheet: boolean = false;
  inviteType: any;
  constructor(
    private modalCtrl: ModalController,
    public referralService: ReferralService,
    public actionSheetController: ActionSheetController,
    private commonService: CommonService,
    public alertController: AlertController,
    private inappBrowser: InAppBrowser,
    private router: Router,
    private locationService: LocationService,
    private storageService: StorageService
    // private sms: SMS
  ) { }

  ngOnInit() {
    this.referralService.inviteType.subscribe((res: any) => {
      this.inviteType = res;

    });
    // console.log(this.inviteType);
  }

  sendRefferal() {
    this.mobileNumber?.length == 10 && !this.invalidPhone ? this.showConfirm() : this.referralService.showToastNumber()
  }

  getLocation(location?) {
    if (Capacitor.isNativePlatform()) {  //Native Platform check
      this.locationService.getAcurateLocation().then(res => {
        this.locationService.getLocation().then(res => {
          let location = {
            lat: res.coords.latitude,
            lon: res.coords.longitude
          }
          this.storageService.setItem('currentLocation', location)
        }).catch(err => {
          // this.commonService.alert('Location permission', 'Location is needed for the app to work properly, kindly go to settings and provide location permission to app.', 'Ok', 'Cancel', () => this.getLocation(), () => history.back());
        })
      }).catch(err => {
        // this.commonService.alert('Location permission', 'Location is needed for the app to work properly, kindly go to settings and provide location permission to app.', 'Ok', 'Cancel', () => this.getLocation(), () => history.back());
      });
    } else {
      //map load for the local (browser)
      this.locationService.getLocation().then(res => {
        let location = {
          lat: res.coords.latitude,
          lon: res.coords.longitude
        }
        this.storageService.setItem('currentLocation', location)
      }).catch(err => {
        // this.commonService.alert('Location permission', 'Location is needed for the app to work properly, kindly go to settings and provide location permission to app.', 'Ok', 'Cancel', () => this.getLocation(), () => history.back());
      })
    }
  }

  invite(via) {
    console.log(this.storageService.getItem('currentLocation'), 'currentLocation')
    if (this.mobileNumber && this.mobileNumber.length === 10) {
      this.referralService.sendReferralInvite(this.mobileNumber.toString(), this.inviteType.value).subscribe((res: any) => {
        if (res['success']) {
          let msgBody
          if (this.inviteType.value == 'INDIVIDUAL') {
            msgBody = this.referralService.Individual_Message_BODY
          }
          if (this.inviteType.value == 'RETAILER') {
            msgBody = this.referralService.Retailer_Message_BODY
          }
          if (this.inviteType.value == 'LOGISTICS_DELIVERY') {
            msgBody = this.referralService.Logistic_Message_BODY
          }
          if (via == 'whatsapp') {
            let url = 'https://wa.me/' + this.mobileNumber.toString() + '?text=' + msgBody;
            const inappBrowser = this.inappBrowser.create(url, '_system', 'location=no');
          }
          else {
            this.referralService.sendSms(this.mobileNumber, msgBody)
          }
          this.router.navigate(['referal/my-referal'])
        } else {
          this.commonService.danger(res.error.message);
        }
      }, err => {
        console.log(err)
        this.commonService.danger(err.error.error.message);
      });
    } else {
      this.referralService.showToastNumber();
    }
  }

  async inviteModal() {
    this.getLocation();
    const modal = await this.modalCtrl.create({
      component: InviteModalComponent,
      cssClass: 'DeliveryDayPreference-component-css',
      componentProps: {
        isModal: true
      }
    });
    modal.present();
    modal.onDidDismiss().then((data) => {
      if (data.data == '1') {
        this.showConfirm();
      }
      else if (data.data == '0') {
        console.log("whatsapp intent must be called here");
        this.invite('whatsapp');
      }
    });
  }

  showConfirm() {
    this.commonService.customeAlert('Send Referral Invite, Carrier SMS charges may apply', 'Are you sure? You want to send referral invite to this number?', () => { this.invite('message') }, () => { })
  }

  isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
    } else {
      return true;
    }
  }

  validatePhone(e) {
    this.invalidPhone = !PhoneCheck(this.mobileNumber);
    this.isNumberKey(e)
  }

  hideBottomSheet() {
    this.mobileNumber = null;
    this.showBottomSheet = false;
    this.action('confirm');
  }

  action(arg) {
    return this.modalCtrl.dismiss(arg);
  }

  openMyRewardsModal() {
    this.modalCtrl.dismiss()
    this.router.navigate(['/referal/my-referal'])
  }
}
