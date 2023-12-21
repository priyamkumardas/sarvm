import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';

@Injectable({
  providedIn: 'root'
})
export class NativepermissionsService {

  constructor(private androidPermissions: AndroidPermissions, public platform: Platform, private locationAccuracy:LocationAccuracy) { }

  checkRecordAudioPermission(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (Capacitor.isNativePlatform()) {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
          result => {
            if (result.hasPermission) {
              resolve(true);
            } else {
              this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then((data) => {
                if(data.hasPermission){
                  resolve(true);
                } else {
                  resolve({"errorMsg":'please allow the permission for speech recognition', "status":false});
                }
              });
            }
          }
        );
      } else {
        console.log('Capacitor not detected platform');
        reject({"errorMsg":'Capacitor not detected platform', "status":false});
        //return false;
      }
    });
  }

  checkCameraPermission(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (Capacitor.isNativePlatform()) {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
          result => {
            if (result.hasPermission) {
              resolve(true);
            } else {
              this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then((data) => {
                if(data.hasPermission){
                  resolve(true);
                } else {
                  resolve({"errorMsg":'please allow the permission for Camera', "status":false});
                }
              });
            }
          }
        );
      } else {
        console.log('Capacitor not detected platform');
        reject({"errorMsg":'Capacitor not detected platform', "status":false});
      }
    });
  }

  checkReadExternalPermission() {
    return new Promise((resolve, reject) => {
      if (Capacitor.isNativePlatform()) {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
          result => {
            if (result.hasPermission) {
              resolve(true);
            } else {
              this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((data) => {
                if(data.hasPermission){
                  resolve(true);
                } else {
                  resolve({"errorMsg":'please allow the permission for Read External storage', "status":false});
                }
              });
            }
          }
        );
      } else {
        console.log('Capacitor not detected platform');
        reject({"errorMsg":'Capacitor not detected platform', "status":false});
      }
    });
  }

  checkWriteExternalPermission() {
    return new Promise((resolve, reject) => {
      if (Capacitor.isNativePlatform()) {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
          result => {
            if (result.hasPermission) {
              resolve(true);
            } else {
              this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then((data) => {
                resolve(true);
              });
            }
          }
        );
      } else {
        console.log('Capacitor not detected platform');
        reject(false);
      }
    });
  }

  checkLocationPermission(){
    return new Promise((resolve, reject) => {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        console.log('can',canRequest);
        if(canRequest) {
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(res=>{
            resolve(true)
          }).catch(err=>{
            reject(false);
          })
        }else{
          reject(false);
        }
      });
    });
  }
}
