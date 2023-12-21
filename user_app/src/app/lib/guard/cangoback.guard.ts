import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CommonService } from 'src/app/lib/services/common.service';
import { UpdateAddressPage } from 'src/app/pages/user/address/update-address/update-address.page';

@Injectable({
  providedIn: 'root'
})
export class CangobackGuard implements CanDeactivate<UpdateAddressPage> {
  constructor(private commonService: CommonService){}
  canDeactivate(
    component: UpdateAddressPage,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.commonService.customeAlert('Changes not saved!','Are you sure you want to leave the page without saving changes?',()=>{},()=>{},true);
    return this.commonService.subject.asObservable();
  }
  
}
