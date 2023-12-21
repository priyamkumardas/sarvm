import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

import { Constants } from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class UserpreferenceGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem(Constants.SELECT_PREFERENCE)) {
      return true;
    } else {
      this.router.navigate(['/selected-preference']);
      return false;
    }
  }
  
}
