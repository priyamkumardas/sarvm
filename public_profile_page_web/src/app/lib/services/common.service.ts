import { Injectable } from '@angular/core';
import {
  LoadingController,
  ToastController,
  PopoverController,
  AlertController,
} from '@ionic/angular';

import { Constants } from 'src/app/config/constants';
import { CommonApi } from './api/common.api';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  state = false;
  userData: any;
  isLoading: boolean | undefined;
  hasCurrentLocation:boolean = false;
  deviceId:any;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    public popoverCtrl: PopoverController,
    private commonApi:CommonApi,
  ) {
  
  }

 
  getStoreDetails(id:any){
    return this.commonApi.getStoreDetails(id);
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
      mode: 'ios',
      message: 'Loading...',
      spinner: 'circles',

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
      .create({ mode: 'ios', header, message, buttons, backdropDismiss: false })
      .then((alert) => alert.present());
  }

  featureNotAvailable() {
    this.presentToast('Feature not Available.');
  }

  // createArrayofObject(data): any {
  //   const arrayOfObj = {};
  //   if (data) {
  //     data.forEach((v) => {
  //       arrayOfObj[v.id] = v;
  //     });
  //   }
  //   return arrayOfObj;
  // }
}
