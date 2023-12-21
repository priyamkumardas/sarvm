import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { ReferralService } from '../referral.service';
import { PhoneCheck } from 'src/app/config/constants';
import { InviteReferModalComponent } from '../invite-refer-modal/invite-refer-modal.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Contacts, GetContactsOptions } from '@capacitor-community/contacts';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';

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
  //selectedContact: any;

  constructor(
    private modalCtrl: ModalController,
    public referralService: ReferralService,
    public actionSheetController: ActionSheetController,
    private commonService: CommonService,
    public alertController: AlertController,
    private inappBrowser: InAppBrowser,
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.referralService.inviteType.subscribe((res: any) => {
      this.inviteType = res;
    });
    // console.log(this.inviteType);
  }

  invite(via) {
    if (this.mobileNumber && this.mobileNumber.length === 10) {
      this.referralService
        .sendReferralInvite(this.mobileNumber.toString(), this.inviteType.value == 'Consumer' ? 'INDIVIDUAL' : this.inviteType. value)
        .subscribe(
          (res: any) => {
            if (res['success']) {
              // this.presentActionSheet();

              // this.referralService.sendSms(this.mobileNumber,this.referralService.Message_BODY)
              let msgBody
              if (this.inviteType.value == 'INDIVIDUAL') {
                msgBody = this.referralService.Individual_Message_BODY
              }
              if (this.inviteType.value == 'RETAILER') {
                msgBody = this.referralService.Retailer_Message_BODY
              }
              if (this.inviteType.value == 'LOGISTICS_DELIVERY') {
                msgBody = this.referralService.Logistics_Message_BODY
              }
              if (via == 'whatsapp')
              {
                console.log("inviting via whatsapp");
                let url = 'https://wa.me/' + this.mobileNumber.toString() + '?text=' + msgBody;
                console.log(url)
                 const inappBrowser = this.inappBrowser.create(url, '_system', 'location=no');
              }
                else
              this.referralService.sendSms(this.mobileNumber, msgBody)
             
              // this.showBottomSheet = true;
              // this.router.navigate(['profile']);
              //this.referralService.openMyRewardsModal();
              this.modalCtrl.dismiss();
              this.router.navigate(['/referal/my-referal']);

            } else {
              this.commonService.danger(
                res.error.message
              );
            }
          },
          (err) => {
            // console.log(err);
            this.commonService.danger(
              err.error.error.message
            );
          }
        );
    }
    else {
      this.referralService.showToastNumber();
    }
  }
  
  async inviteModal() {
      const modal = await this.modalCtrl.create({
      component: InviteReferModalComponent,
      cssClass: 'DeliveryDayPreference-component-css',
      componentProps: {
        //isModal: true,
      },
    });
    modal.present();
    modal.onDidDismiss().then((data) => {
  // this.number = data.data.number;
      console.log(data);
      if (data.data == '1')
        this.showConfirm();
      else {
        console.log("whatsapp intent must be called here");
        console.log(this.mobileNumber);
        this.invite('whatsapp');
         

      }
});
}
  showConfirm() {
    this.alertController
      .create({
        header: 'Send Referral Invite',
        subHeader: 'Carrier SMS charges may apply',
        message:
          'Are you sure? You want to send referral invite to this number?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('I care about humanity');
            },
          },
          {
            text: 'Yes!',
            handler: () => {
              // this.sms.send(this.mobileNumber, 'Hello world!');
              this.invite('message');
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
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
    this.modalCtrl.dismiss();
    this.router.navigate(['/referal/my-referal']);
  }
  
  refferalclose() {
    this.referralService.closeReferralModal();
  }

  // pickContact() {
  //   const retrieveListOfContacts = async () => {
  //     const projection = {
  //       // Specify which fields should be retrieved.
  //       name: true,
  //       phones: true,
  //       postalAddresses: true,
  //     };
    
  //     const result = await Contacts.pickContact({
  //       projection,
  //     });
  //     console.log("result", result);
  //   };
  // }

  async loadContacts(){
    if(Capacitor.isNativePlatform()){
      await Contacts.checkPermissions().then((permission: any) => {
        if(!permission.granted){
          return;
        }
      });
      
      Contacts.pickContact({
        projection: {
          phones: true,
        },
      }).then((result: any) => {
        if(result?.contact?.phones.length < 1 && result?.contact?.phones != undefined && result?.contact?.phones != null){
          if(result?.contact?.phones[0].number.startsWith("+91")){
            this.mobileNumber = (result?.contact?.phones[0].number.replace('+91', '')).replace(/\s/g, "");
          } else {
            this.mobileNumber = result?.contact?.phones[0].number.replace(/\s/g, "");
          }
          console.log("mobileNumber ====>" + this.mobileNumber);
        } else {
          if(result?.contact?.phones[0].number.startsWith("+91")){
            this.mobileNumber = (result?.contact?.phones[0].number.replace('+91', '')).replace(/\s/g, "");
          } else {
            this.mobileNumber = result?.contact?.phones[0].number.replace(/\s/g, "");
          }
          console.log("mobile ====>" + this.mobileNumber);
        }      
      });
    }    
  }
}
