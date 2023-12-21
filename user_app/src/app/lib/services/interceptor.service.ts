import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LocationService } from "src/app/lib/services/location.service";
import { Constants } from '../../config/constants';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  constructor(
    private storageservice: StorageService,
    private router: Router,
    private locationservice: LocationService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.storageservice.getItem(Constants.AUTH_TOKEN) ? this.storageservice.getItem(Constants.AUTH_TOKEN) : environment.unauthToken;
    // let userLocation = this.storageservice.getItem(Constants.USER_LOCATION);
    console.log(request.headers , 'request.headers')
    if (token && !request.headers.get('skip') && !request.headers.get('casheInvalidate') && !request.headers.get('currentLatLng')) {
      request = request.clone({
        headers: request.headers
          .set('Authorization', 'Bearer ' + token)
          .set('app_name', environment.app_name)
          .set('app_version_code', environment.app_version_code)
          .set('lat', this.locationservice.currentLatLong?.lat ? this.locationservice.currentLatLong.lat.toString() : '1')
          .set('lon', this.locationservice.currentLatLong?.lon ? this.locationservice.currentLatLong.lon.toString() : '1')
      });
    } else {
      if (request.headers.get('skip')) {
        request = request.clone({
          headers: request.headers.delete('skip')
        });
      }
      if (request.headers.get('currentLatLng')) {
        let lat = this.storageservice.getItem('currentLocation') ? this.storageservice.getItem('currentLocation').lat.toString() : '1'
        let lon = this.storageservice.getItem('currentLocation') ? this.storageservice.getItem('currentLocation').lon.toString() : '1'
        request = request.clone({
          headers: request.headers
            .set('Authorization', 'Bearer ' + token)
            .set('app_name', environment.app_name)
            .set('app_version_code', environment.app_version_code)
            .set('lat', lat)
            .set('lon', lon)
        });
      }
      if (request.headers.get('casheInvalidate')) {
        request = request.clone({
          headers: request.headers.delete('casheInvalidate')
        });
        request = request.clone({
          headers: request.headers
            .set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0')
            .set('Pragma', 'no-cache')
            .set('Expires', '0')
        });
      }
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err.status === 0 || err.status === 503) {
          //this.router.navigateByUrl(`/maintenance`);
        }
        return throwError(err);
      })
    );
    //} else {
    //  return Observable.throw(new HttpErrorResponse({ status: 4 }));
    //}
  }
}
