import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { ReferralService } from '../referral.service';
import { PhoneCheck } from 'src/app/config/constants';



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
    
    // private sms: SMS
  ) {}

  ngOnInit() {
    this.referralService.inviteType.subscribe((res: any) => {
      this.inviteType = res;
      
    });
    // console.log(this.inviteType);
  }

  invite() {
    if (this.mobileNumber && this.mobileNumber.length === 10) {
      this.referralService
        .sendReferralInvite(this.mobileNumber.toString(), this.inviteType.name == 'Consumer'?'INDIVIDUAL':this.inviteType.name)
        .subscribe(
          (res: any) => {
            if (res['success']) {
              // this.presentActionSheet();

              // this.referralService.sendSms(this.mobileNumber,this.referralService.Message_BODY)
              let msgBody
              if(this.inviteType.name=='Consumer'){
                msgBody=this.referralService.Individual_Message_BODY
              }
              if(this.inviteType.name=='RETAILER'){
                msgBody=this.referralService.Retailer_Message_BODY
              }
              this.referralService.sendSms(this.mobileNumber,msgBody)
              // this.showBottomSheet = true;
              // this.router.navigate(['profile']);
              this.referralService.openMyRewardsModal();

            } else {
              this.commonService.danger(
                res.error.message
              );
            }
          },
          (err) => {
            // console.log(err);
            this.commonService.danger(
              err.error.error.body[0].message
            );
          }
        );
    }
    else{
      this.referralService.showToastNumber();
    }
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
              this.invite();
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
  
  refferalclose() {
    this.referralService.closeReferralModal();
  }
}
