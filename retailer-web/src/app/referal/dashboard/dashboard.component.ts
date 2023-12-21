import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { InviteCategoryComponent } from 'src/app/referal/invite-category/invite-category.component';
import { MyReferalComponent } from 'src/app/referal/my-referal/my-referal.component';
import { ReferFormComponent } from 'src/app/referal/refer-form/refer-form.component';
import { ReferralService } from '../referral.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userId: any = 1; // this will be changed when login is done & actual user id will be there
  referred: any;
  acknowledged: any;
  signedUp: any;
  order: any;
  profileComplete: any;
  maxReward: any;
  constructor(
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    private referralService: ReferralService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getMyReferrals();
  }

  async presentLoading(loading) {
    return await loading.present();
  }

 async getMyReferrals() {
 const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    this.presentLoading(loading);

    this.referralService.myReferralsList().subscribe(
      (res: any) => {
        this.referred = parseInt(res['data']['users_invited']) / 100;
        this.acknowledged = parseInt(res['data']['acknowledged']) / 100;
        this.signedUp = parseInt(res['data']['signedup']) / 100;
        this.order = parseInt(res['data']['first_order_completed']) / 100;
        this.profileComplete = parseInt(res['data']['profile_completed']) / 100;
        this.maxReward = res['data']['max_reward'];
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();

      }
    );
  }

  openInviteModal() {
    this.referralService.openInviteModal();
  }

  openMyRewardsModal() {
    this.referralService.openMyRewardsModal();
  }

  action() {
    return this.modalCtrl.dismiss();
  }

  refferalclose() {
    this.referralService.closeReferralModal();
  }
}
