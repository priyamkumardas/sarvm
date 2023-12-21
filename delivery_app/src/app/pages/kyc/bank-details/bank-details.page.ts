import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Constants } from 'src/app/config/constants';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { UserService } from 'src/app/lib/services/user.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.page.html',
  styleUrls: ['./bank-details.page.scss'],
})
export class BankDetailsPage implements OnInit {

  segment = 'UpiId';
  userPaymentInfo: any;
  userId: any;

  constructor(private router: Router,
    private ngLocation: Location,
    public commonService: CommonService,
    private storageService: StorageService,
    private onboardService: OnboardService,
    private userService: UserService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUpiList(); 
  }

  segmentChanged(e) {
    this.segment = e.detail.value;
  }

  addUPIOrBankAccount() {
    if (this.segment == 'UpiId') {
      this.router.navigate(['/select-upi-app']);
    } else {
      this.router.navigate(['/bank-form']);
    }
  }

  // Get user's existing details
  getUpiList() {
    this.userId =
      this.commonService.getUserData() && this.commonService.getUserData().userId;
      this.commonService.presentProgressBarLoading();
      this.userService.getUPI(this.userId ? this.userId : null).subscribe((userDetails: any) => {
      this.commonService.closeProgressBarLoading()
      this.userPaymentInfo = userDetails.data;
    },err =>{
      this.commonService.closeProgressBarLoading()
      console.log(err);
    });
  }

  gotToQrScanPage(inx) {
    this.router.navigate(['/scan-qr-code', { data: JSON.stringify(inx) }]);
  }

}
