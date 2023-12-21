import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Constants } from 'src/app/config/constants';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CommonService {
  [x: string]: any;
  danger(arg0: string) {
    throw new Error('Method not implemented.');
  }

  state: boolean = false;
  hasCurrentLocation:boolean = false;
  userData:any;
  isLoading: boolean | undefined;


  constructor(
    
    private storageService:StorageService,
    
  ) {
    if(this.storageService.getItem(Constants.AUTH_TOKEN)){
      this.setUserData()
    }
    
  }
  
  

  
  setUserData(){
    this.userData = this.parseJwt(this.storageService.getItem(Constants.AUTH_TOKEN));
    //console.log(this.userData);
  }

   parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };


  

  

  toast(message: string, cssClass = '') {
    this['toastController']
      .create({
        message,
        duration: 3000,
        mode: 'ios',
        color: 'dark',
        cssClass,
      })
      .then((toast: { present: () => any; }) => toast.present());
  }

  

  featureNotAvailable()
  {
    alert('Feature not Available.');
  }

  
}
