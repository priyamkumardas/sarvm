import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { StorageService } from './storage.service';
import { Constants } from 'src/app/config/constants';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ModalController } from '@ionic/angular';
import { LogoutPopupComponent } from 'src/app/components/logout-popup/logout-popup.component';
import { Subject } from 'rxjs';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { info } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  state: boolean = false;
  hasCurrentLocation: boolean = false;
  userData: any;
  isLoading: boolean;
  appCodeVersion;
  appCodeVersionName;
  remoteAppVersionName;
  remoteAppUpdateLink;
  deviceId: any;
  subject = new Subject<boolean>();
  addressUpdated: boolean = false;



  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private storageService: StorageService,
    private appVersion: AppVersion,
    private platform: Platform,
    private iab: InAppBrowser,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing
  ) {
    if (this.storageService.getItem(Constants.AUTH_TOKEN)) {
      this.setUserData()
    }
    this.getDeviceId()
  }

  async getDeviceInfo() {
    const info = await Device.getInfo();
    // console.log(info);
  }

  async getDeviceId() {
    this.deviceId = await Device.getId();
    // console.log(this.deviceId);
  }

  setUserData() {
    this.userData = localStorage.getItem(Constants.AUTH_TOKEN) ? this.parseJwt(this.storageService.getItem(Constants.AUTH_TOKEN)) : 0;
    //console.log(this.userData);
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };


  async present() {
    this.state = true;
    return await this.loadingController.create({
      mode: 'ios',
      message: 'Loading...',
      spinner: 'circles',
    }).then(a => {
      a.present().then(() => {
        if (!this.state) {
          a.dismiss();
        }
      })
    });
  }

  async dismiss() {
    this.state = false;
    //return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    while (await this.loadingController.getTop() !== undefined) {
      await this.loadingController.dismiss();
    }
  }

  async presentLoading() {
    const that = this;
    this.isLoading = true;
    return await this.loadingController.create({
      mode: 'ios',
      spinner: 'crescent',
    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('loading abort presenting'));
        }
      });
    });
  }



  async dissmiss_loading() {
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
    }
    return null;
  }

  presentProgressBarLoading() {
    this.isLoading = true;
  }

  closeProgressBarLoading() {
    this.isLoading = false;
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async success(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }

  async danger(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  }

  toast(message: string, cssClass = '') {
    this.toastController
      .create({ message: message, duration: 3000, mode: 'ios', color: 'dark', cssClass })
      .then((toast) => toast.present());
  }

  async alert(header: string, message: string, okLabel: string, cancelLabel: string, okAction, cancelAction) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: message,
      backdropDismiss: false,
      buttons: [
        {
          text: cancelLabel,
          role: 'cancel',
          handler: () => {
            cancelAction();
          },
        },
        {
          text: okLabel,
          role: 'confirm',
          handler: () => {
            okAction()
          },
        },
      ],
    });
    await alert.present();
  }
  async alert1(header: string, message: string, okLabel: string, cancelLabel: string, okAction, cancelAction) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: header,
      subHeader: message,
      backdropDismiss: false,
      buttons: [
        {
          text: okLabel,
          role: 'confirm',
          handler: () => {
            okAction()
          },
        },
      ],
    });
    await alert.present();
  }


  featureNotAvailable() {
    this.presentToast('Feature not Available.');
  }

  appCheckUpdate() {
    this.appVersion.getVersionNumber().then(versionName => {
      this.appCodeVersionName = versionName;
      this.compareAppVersionWithServerVersion(this.appCodeVersionName, this.remoteAppVersionName);
      console.log("verson name", versionName);
    })
    this.appVersion.getVersionCode().then(versionCode => {
      this.appCodeVersion = versionCode;
      console.log("verson code", versionCode);
    })
    //  this.appCodeVersion = this.appVersion.getVersionCode();
    //  this.appCodeVersionName = this.appVersion.getVersionNumber();
    //  console.log(this.appCodeVersionName);
    //  console.log(this.appCodeVersion);
  }

  compareAppVersionWithServerVersion(localVersion, remoteVersion) {
    //let splittedRemoteVersion,splittedLocalVersion;

    this.platform.ready().then(() => {
      if (this.platform.is("android")) {
        this.remoteAppUpdateLink = remoteVersion.android.updateUrl;
        this.compareVersions(remoteVersion.android.min.split('.'), localVersion.split('.'))
      } else if (this.platform.is("ios")) {
        this.remoteAppUpdateLink = remoteVersion.ios.updateUrl;
        this.compareVersions(remoteVersion.ios.min.split('.'), localVersion.split('.'))
      }
    });
  }

  compareVersions(splittedRemoteVersion, splittedLocalVersion) {
    if (splittedRemoteVersion[0] >= splittedLocalVersion[0]) {
      if (splittedRemoteVersion[0] > splittedLocalVersion[0]) {
        this.updateApp()
      } else {
        if (splittedRemoteVersion[1] >= splittedLocalVersion[1]) {
          if (splittedRemoteVersion[1] > splittedLocalVersion[1]) {
            this.updateApp()
          } else {
            if (splittedRemoteVersion[2] > splittedLocalVersion[2]) {
              this.updateApp()
            }
          }

        }
      }
    }
  }

  async updateApp() {
    const alert = await this.alertController.create({
      header: "Update Available",
      subHeader: "Please Update to Latest Version",
      backdropDismiss: false,
      buttons: [
        {
          text: 'Confirm',
          // role: 'confirm',
          handler: () => {
            //okAction()
            this.iab.create(this.remoteAppUpdateLink, '_system');
            App.exitApp();
          },
        },
      ],
    });
    await alert.present();
  }

  async customeAlert(header, subHeader, yesCallBack, noCallBack, forBack?) {
    if (forBack ? this.addressUpdated : true) {
      const model = await this.modalCtrl.create({
        component: LogoutPopupComponent,
        cssClass: 'DeliveryDayPreference-component-css',
        componentProps: {
          header: header,
          subHeader: subHeader,
          forBack: forBack
        }
      })
      await model.present()
      const { data } = await model.onWillDismiss()
      if (data.status == 'Yes') {
        if (forBack) {
          this.subject.next(true);
        } else {
          this.subject.next(false);
          yesCallBack();
        }
      }else{
        noCallBack();
      }
    } else {
      setTimeout(() => {
        this.subject.next(true);
      }, 200)
    }
  }

   /**
   * 
   * @param photo photo is a base64 url
   * @param shopDetails it is used for giving saved picture starting name
   * @returns saves picture to gallery
   */
   async savePicture(photo: any, userDetails: string) {
    console.log(userDetails, 'userDetails')
    const base64Data = photo;
    // Write the file to the data directory
    const fileName = userDetails + new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents
    }).then((info) => 
    this.success('Image saved successfully'))
      .catch((e) => {console.log('Error occurred while doing stat: ', e) 
      this.danger("image not saved")
    })
    console.log(savedFile, 'savedFile')

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }

  /**
   * 
   * @param base64url it brings base64 url which helps us to convert base64 to image
   * @param fileName is to assign name's for the shared files
   */

  async shareQr(message:any, link:any, base64Url?) {
    let base64 ;
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      base64 = canvas?.toDataURL('image/jpeg')
    let datatobeSharedWithImage = {
      message: message, // not supported on some apps (Facebook, Instagram)
      files: [base64], // an array of filenames either locally or remotely
      url: link + ' Powered by https://www.sarvm.ai',
      chooserTitle: 'Share your happiness with :-)', // Android only, you can override the default share sheet title
    };
    let datatobeShared = {
      message: message, // not supported on some apps (Facebook, Instagram)
      url: link + ' Powered by https://www.sarvm.ai',
      chooserTitle: 'Share your happiness with :-)', // Android only, you can override the default share sheet title
    };
    return this.socialSharing.shareWithOptions(base64Url? datatobeSharedWithImage:datatobeShared)
  }
}
