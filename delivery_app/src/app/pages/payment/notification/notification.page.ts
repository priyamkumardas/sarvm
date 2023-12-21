import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  userData: any;
  notificationItems: any = [];

  constructor(private ngLocation: Location,
    public commonService: CommonService,
    private onboardService: OnboardService,
    private router: Router,) { }

  ngOnInit() {
    this.userData = this.commonService.userData;
    this.getAllNotifications();
  }

  getAllNotifications(){
    this.notificationItems = [];
    this.commonService.present();
    this.onboardService.getAllNotification(this.userData.userId).subscribe((res: any) => {
      this.commonService.dismiss();
      console.log('Notification res ', res);
      if (res?.isNotifi.success && res?.isNotifi?.data != undefined && res?.isNotifi?.data != null && res?.isNotifi?.data != '') {
        this.notificationItems = res?.isNotifi?.data;
      }
    }, (error) => {
      this.commonService.dismiss();
      this.commonService.danger(error?.message);
    });
  }
  
}
