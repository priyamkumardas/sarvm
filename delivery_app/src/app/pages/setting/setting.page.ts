import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform} from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private router: Router,) {
    /* private ngLocation: Location,
    private platform: Platform
    this.platform.backButton.subscribeWithPriority(101, () => {
      console.log('Handler was called!');
      if (this.router.url.toString().includes('setting')) {
        this.ngLocation.back();
      }
    }); */
  }

  ngOnInit() {
  }

  goToLanguage() {
    this.router.navigate(['/update-language']);
  }

  deleteAccount() {
    this.router.navigate(['/delete-account']);
  }

}
