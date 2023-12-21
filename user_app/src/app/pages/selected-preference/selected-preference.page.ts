import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { Location } from '@angular/common';
import { StorageService } from 'src/app/lib/services/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-selected-preference',
  templateUrl: './selected-preference.page.html',
  styleUrls: ['./selected-preference.page.scss'],
})
export class SelectedPreferencePage implements OnInit {
  isPreference : any = '';
  nameOfItemSelected='true';
  constructor(
    private router: Router,
    private location: Location,
    private storageservice: StorageService,
    private navCtrl: NavController
    ) { }

  ngOnInit() {}

  onSelect(isSelected: any){
    this.isPreference = isSelected;
  }

  selectPreference(){
    if(this.isPreference !==null && this.isPreference !==''){
      localStorage.setItem(Constants.SELECT_PREFERENCE,btoa(escape(JSON.stringify({isPreference:this.isPreference}))));
      this.navCtrl.setDirection('root');
      this.router.navigateByUrl('/tabs/home', { replaceUrl:true });
    }
  }

  myBackButton(){
    this.navCtrl.setDirection('root');
    this.router.navigate(['/selected-language']);
  }

  funBorderChange(nameofitem)
  {
    this.nameOfItemSelected=nameofitem;
    this.storageservice.setItem(Constants.SELECT_PREFERENCE, this.nameOfItemSelected); 
    this.navCtrl.setDirection('root');
    this.router.navigate(['/tabs/home']);
  }
}
