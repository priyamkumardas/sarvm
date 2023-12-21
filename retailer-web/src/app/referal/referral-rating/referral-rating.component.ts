import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { ReferralService } from '../referral.service';

@Component({
  selector: 'app-referral-rating',
  templateUrl: './referral-rating.component.html',
  styleUrls: ['./referral-rating.component.scss'],
})
export class ReferralRatingComponent implements OnInit {
  
  @Input("phoneNumber") phoneNumber;
  @Input("referType") referType;
  
  rating: string;
  comments: string;
  // userId: any = '6388d80e98b71bd01461a0a3';
  userId: any = this.commonService.parseJwt(this.storageService.getItem(Constants.AUTH_TOKEN)).userId; // this will be changed when login is done & actual user id will be there
  
  constructor(
    private modalCtrl: ModalController,
    private referralService: ReferralService,
    private commonService: CommonService,
    private storageService: StorageService
  ) { }


  


  ngOnInit() {
    console.log(this.phoneNumber);
    console.log(this.referType);
  }

  action(arg) {
    return this.modalCtrl.dismiss(arg);
    
  }

  selectRating(item) {
    this.rating = item;
    console.log(this.rating);
  }
  

  referralRatingSave(remarks) {
    this.comments = remarks
    this.referralService
      .sendReferralRatings( this.phoneNumber,this.referType,this.rating ? this.rating : "5" ,this.comments ? this.comments : '')
      .subscribe((res) => {
        console.log(res);
        this.commonService.success("Rating Success.")
      });
    this.modalCtrl.dismiss();
  }
}
