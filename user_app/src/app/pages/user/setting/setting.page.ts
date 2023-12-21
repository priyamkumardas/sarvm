import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/lib/services/user.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';
import { NavController } from '@ionic/angular';
import { LocationService } from 'src/app/lib/services/location.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  userData: any;

  constructor(private locationService: LocationService, private navCtrl: NavController, private alertCtrl: AlertController,private userService: UserService,private router: Router,    public commonservice: CommonService,){}

  ngOnInit() {
    this.userData = this.commonservice.userData;
  }

  del(){
    this.commonservice.customeAlert('Are you sure you want to proceed?','This activity will delete your account and all other existing data which is irreversible',()=>{this.deleteAccount()},()=>{});
  }

  async deleteAccount() {
    this.commonservice.presentLoading();
    this.userService.deleteAccount(this.userData.userId).subscribe(res => {
      this.commonservice.dissmiss_loading()
      this.locationService.locationSubscription.unsubscribe();
      localStorage.clear();
      this.navCtrl.setDirection('root');
      this.router.navigate(['/login']);
    }, err =>{
      this.commonservice.dissmiss_loading()
    })
  }
}
