import { Injectable } from '@angular/core';
import {
  LoadingController,
  ToastController,
  PopoverController,
  AlertController,
} from '@ionic/angular';
import { Device } from '@capacitor/device'

import { Constants } from 'src/app/config/constants';
import { StorageService } from 'src/app/lib/services/storage.service';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Platform } from '@ionic/angular';
import { updateLocale } from 'moment';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { BehaviorSubject } from 'rxjs';
import { OnboardService } from './onboard.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  state = false;
  userData: any;
  isLoading: boolean;
  appCodeVersion; 
  appCodeVersionName;
  remoteAppVersionName;
  remoteAppUpdateLink;
  deviceId:any;
  hasCurrentLocation: boolean = false;
  isOnline: boolean;


  private approvalSegmentStageStatus = new BehaviorSubject("");
  currentSegmentStageStatus = this.approvalSegmentStageStatus.asObservable();

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    public popoverCtrl: PopoverController,
    private storageService: StorageService,
    private appVersion:AppVersion,
    private platform:Platform,
    private iab: InAppBrowser,
  ) {
    if(this.storageService.getItem(Constants.AUTH_TOKEN)){
      this.setUserData()
    }
    this.getDeviceId()
    this.isOnline = this.storageService.getItem(Constants.APP_ONLINE_OFFLINE);
  }

  async getDeviceInfo() {
    const info = await Device.getInfo();
    // console.log(info);
  }
  
  async getDeviceId(){
    this.deviceId = await Device.getId();
    // console.log(this.deviceId);
  }

  // getDeliveryPersonInfo() {
  //   this.onboardService.getDeliveryPersonInfo().subscribe((res: any) => {
  //     if (res?.isTrip.success && res?.isTrip?.data != undefined && res?.isTrip?.data != null && res?.isTrip?.data != '') {
  //       this.isOnline = res.isTrip.data.isOnline;
  //     }
  //   }, (error) => {
  //     this.danger(error?.message);
  //   });
  // }

  appCheckUpdate(){
    this.appVersion.getVersionNumber().then(versionName => {
      this.appCodeVersionName = versionName;
      this.compareAppVersionWithServerVersion(this.appCodeVersionName,this.remoteAppVersionName);
      console.log("verson name",versionName);
    })
    this.appVersion.getVersionCode().then(versionCode => {
      this.appCodeVersion = versionCode;
      console.log("verson code",versionCode);
    })
  }

  compareAppVersionWithServerVersion(localVersion,remoteVersion){
    this.platform.ready().then(() => {
      if (this.platform.is("android")){
        this.remoteAppUpdateLink=remoteVersion.android.updateUrl;
        this.compareVersions(remoteVersion.android.min.split('.'),localVersion.split('.'))
      }else if(this.platform.is("ios")){
        this.remoteAppUpdateLink=remoteVersion.ios.updateUrl;
        this.compareVersions(remoteVersion.ios.min.split('.'),localVersion.split('.'))
      }
    });
  }

  compareVersions(splittedRemoteVersion,splittedLocalVersion){
    if(splittedRemoteVersion[0]>=splittedLocalVersion[0]){
      if(splittedRemoteVersion[0]>splittedLocalVersion[0]){
        this.updateApp()
      }else{
        if(splittedRemoteVersion[1]>=splittedLocalVersion[1]){
          if(splittedRemoteVersion[1]>splittedLocalVersion[1]){
            this.updateApp()
          }else{
            if(splittedRemoteVersion[2]>splittedLocalVersion[2]){
              this.updateApp()
            }
          }
        }
      }
    }
  }

  async updateApp(){
    const alert = await this.alertController.create({
      header: "Update",
      subHeader: "Please update to newer version",
      buttons: [
        // {
        //   text: 'Skip',
        //   role: 'cancel',
        //   handler: () => {
        //     //cancelAction();
        //   },
        // },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            //okAction()
            this.iab.create(this.remoteAppUpdateLink,'_system');
          },
        },
      ],
    });
    await alert.present();
  }

  setUserData() {
    this.userData = this.parseJwt(
      this.storageService.getItem(Constants.AUTH_TOKEN)
    );
  }

  getUserData() {
    return this.parseJwt(this.storageService.getItem(Constants.AUTH_TOKEN));
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  async present() {
    this.state = true;
    return await this.loadingController
      .create({
        spinner: 'lines',
        message: 'Please wait...',
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.state) {
            a.dismiss();
          }
        });
      });
  }

  async dismiss() {
    this.state = false;
    //return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    while ((await this.loadingController.getTop()) !== undefined) {
      await this.loadingController.dismiss();
    }
  }

  async presentLoading() {
    const that=this;
    this.isLoading = true;
    return await this.loadingController.create({
      mode: 'ios'

    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('loading abort presenting'));
        }
      });
    });

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  presentProgressBarLoading(){
    this.isLoading = true;
  }

  closeProgressBarLoading(){
    this.isLoading = false;
  }

  async presentLoader(): Promise<HTMLIonLoadingElement> {
    return await this.loadingController.create({
      mode: 'ios',
      message: 'Loading...',
      spinner: 'circles',
      animated: true
    })
  }

  async dissmiss_loading(){
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
    }
    return null;
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
    });
    toast.present();
  }

  async success(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'success',
    });
    toast.present();
  }

  async danger(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'danger',
    });
    toast.present();
  }

  toast(message: string, cssClass = '') {
    this.toastController
      .create({
        message,
        duration: 3000,
        mode: 'ios',
        color: 'dark',
        cssClass,
      })
      .then((toast) => toast.present());
  }

  alert(
    header: string,
    message: string,
    okLabel: string,
    cancelLabel: string,
    okAction: () => void,
    cancelAction: () => void
  ) {
    const buttons = [];
    if (okLabel) {
      buttons.push({ text: okLabel, handler: okAction });
    }
    if (cancelLabel) {
      buttons.push({
        text: cancelLabel,
        role: 'cancel',
        handler: cancelAction,
      });
    }
    this.alertController
      .create({ header, message, buttons, backdropDismiss: false })
      .then((alert) => alert.present());
  }

  featureNotAvailable() {
    this.presentToast('Feature not Available.');
  }

  createArrayofObject(data): any {
    const arrayOfObj = {};
    if (data) {
      data.forEach((v) => {
        arrayOfObj[v.id] = v;
      });
    }
    return arrayOfObj;
  }

  updateVehicleDocSegmentStatus(message: string) {
    this.approvalSegmentStageStatus.next(message)
  }
}
