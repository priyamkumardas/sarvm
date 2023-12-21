import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { ReferralService } from '../referral.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { Constants } from 'src/app/config/constants';
import { Router } from '@angular/router'

@Component({
  selector: 'app-referral-rating',
  templateUrl: './referral-rating.component.html',
  styleUrls: ['./referral-rating.component.scss'],
})
export class ReferralRatingComponent implements OnInit {

  @Input("phoneNumber") phoneNumber;
  @Input("referType") referType;
  rating: any
  comments: any
  comment: string
  oldRating: any
  ratingChanged = false
  userId: any = this.commonService.parseJwt(this.storageService.getItem(Constants.AUTH_TOKEN)).userId; // this will be changed when login is done & actual user id will be there
  recieveData: any;

  constructor(
    private modalCtrl: ModalController,
    private referralService: ReferralService,
    private commonService: CommonService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.oldRating = this.rating;
    this.recieveData = this.router.getCurrentNavigation().extras.state;
    this.phoneNumber = this.recieveData.phoneNumber;
    this.rating = this.recieveData.rating;
    this.referType = this.recieveData.referType;
    this.comments = this.recieveData.comments;
  }

  action(arg) {
    return this.modalCtrl.dismiss(arg);
  }

  updateRating(rate, cmt) {
    this.rating = rate;
    this.comment = cmt;
    if (cmt != '' || this.oldRating != rate) {
      this.ratingChanged = true;
    }
    else {
      this.ratingChanged = false;
    }
  }

  referralRatingSave() {
    this.referralService.sendReferralRatings(this.phoneNumber, this.referType, this.rating ? this.rating : "5", this.comment ? this.comment : '').subscribe((res) => {
      this.commonService.success("Success.")
    });
    // this.modalCtrl.dismiss();
    this.router.navigate(['/referal/my-referal'])
  }
}
