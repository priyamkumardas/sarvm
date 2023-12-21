import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Constants } from '../../config/constants';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(public storageservice: StorageService, public router: Router, private navCtrl: NavController) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.storageservice.getItem(Constants.AUTH_TOKEN)) {
      this.navCtrl.setDirection('root');
      this.router.navigate(['/tabs/home']);
      return false;
    } else {
       return true;
    }
  }
}
