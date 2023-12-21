
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { LanguageService } from 'src/app/lib/services/language.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-selected-language',
  templateUrl: './selected-language.page.html',
  styleUrls: ['./selected-language.page.scss'],
})

export class SelectedLanguagePage implements OnInit {

  localLanguage: any;
  allLanguageData
  allLanguage: any[];
  searchLang;
  SelectedLan;

  constructor(
    public router: Router,
    private location: Location,
    private storageservice: StorageService,
    private languageService: LanguageService,
    private commonService: CommonService) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.commonService.presentLoading();
    this.languageService.getAllLanguagesSplashApi().subscribe( (res: any) => {
      this.commonService.dissmiss_loading()
      if (res?.success && res?.data?.language_meta) {
        this.allLanguage = res?.data.language_meta;
        this.allLanguageData = this.allLanguage;
        this.localLanguage = this.storageservice.getItem(Constants.SELECT_LANGUAGES);
        if(this.localLanguage){
          this.SelectedLan = this.localLanguage.text;
        }else{
          this.selectLanguage(this.allLanguage[0])
        }
    }},err=>{
      this.commonService.toast(err.error.error.message);
      this.commonService.dissmiss_loading()
    });
  }

  searchFunction() {
    this.allLanguage = this.allLanguageData.filter((lang) => {
      if (lang.text.toLowerCase().includes(this.searchLang.toLowerCase())) {
        return lang;
      }
    });
  }

  selectLang() {
    if (this.storageservice.getItem(Constants.SELECT_LANGUAGES)) {
      if (this.storageservice.getItem(Constants.AUTH_TOKEN)) {
        this.location.back()
      } else {
        this.router.navigate(['/login'])
      }
    }
  }

  selectLanguage(item) {
    if (item) {
      this.SelectedLan = item.text ;
      this.languageService.selectLanguageCDN(item.url).subscribe((lngData: any) => {
        if (lngData && lngData?.System) {
          localStorage.setItem(
            Constants.SELECT_LANGUAGES,
            btoa(escape(JSON.stringify(item)))
          );
          localStorage.setItem(
            Constants.ALL_LANGUAGES,
            btoa(escape(JSON.stringify(lngData?.System)))
          );
        }
      });
    }
  }
}
