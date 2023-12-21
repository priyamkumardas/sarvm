import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentdoneGuard implements CanActivate {
  paymentDoneFlag=false;
  constructor(public router: Router, private navCtrl:NavController) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.paymentDoneFlag) {
        this.navCtrl.setDirection('root');
        this.router.navigate(['/tabs/home']);
        return false;
      } else {
         return true;
      }
  }
  
}
