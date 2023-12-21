import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { filter, pairwise } from 'rxjs/operators';
@Component({
  selector: 'app-select-vehicle',
  templateUrl: './select-vehicle.page.html',
  styleUrls: ['./select-vehicle.page.scss'],
})
export class SelectVehiclePage implements OnInit {

  /* userId: any = ''; */
  selectVehicleItem: any = '';
  vehicleInfo: any = '';
  vehiclesTypes = [
    {
      "name": "PEDESTRIAN",
      "icon": "assets/images/ic_pedestrian.svg"
    },
    {
      "name": "BICYCLE",
      "icon": "assets/images/ic_bicycle.svg"
    },
    {
      "name": "CYCLE RICKSHAW",
      "icon": "assets/images/ic_cycle_rickshaw.svg"
    },
    {
      "name": "AUTO RICKSHAW",
      "icon": "assets/images/ic_auto_rickshaw.svg"
    },
    {
      "name": "BIKE",
      "icon": "assets/images/ic_bike.svg"
    },
    {
      "name": "E-RICKSHAW",
      "icon": "assets/images/ic_e_rickshaw.svg"
    }
  ];
  previousUrl: any = '';

  constructor(private router: Router,
    public commonService: CommonService,
    private onboardService: OnboardService,
    private platform: Platform,) {

    this.previousUrl = this.router.getCurrentNavigation().previousNavigation.finalUrl.toString();
  }

  ngOnInit() {
    //this.getDeliveryPreference();
  }

  ionViewDidEnter() {
    this.router.events
      .pipe(filter((e: any) => e instanceof NavigationEnd),
        pairwise()
      ).subscribe((e: any) => {
        this.previousUrl = e[0].urlAfterRedirects
        console.log(e[0].urlAfterRedirects); // previous url
      });
    this.getDeliveryPreference();
  }


  getDeliveryPreference() {
    this.commonService.present();
    this.onboardService.getDeliveryPreference().subscribe((res: any) => {
      this.commonService.dismiss();
      console.log('select-vehicle ', res);
      if (res?.isDOption?.success && res?.isDOption?.data != undefined) {
        this.selectVehicleItem = res?.isDOption?.data.preference;
        //this.router.navigateByUrl('/kyc-status'), { replaceUrl: true };
      }
    }, (error) => {
      this.commonService.dismiss();
      this.commonService.danger(error?.message);
    });
  }

  selectedVehicle(type: any) {
    this.selectVehicleItem = type;
  }

  addUpdateDeliveryPreference() {
    if (this.selectVehicleItem !== undefined && this.selectVehicleItem !== '' && this.selectVehicleItem !== null) {
      if (this.selectVehicleItem) {
        //this.vehicleInfo = Object.assign({ "userId": this.userId, "preference": this.selectVehicleItem })
        this.vehicleInfo = Object.assign({ "preference": this.selectVehicleItem })
      }
      this.commonService.present();
      this.onboardService.addUpdateDeliveryPreferences(this.vehicleInfo).subscribe((res: any) => {
        this.commonService.dismiss();
        if (res?.isDOption?.success && res?.isDOption?.data != undefined) {
          this.selectVehicleItem = res?.isDOption?.data.preference;
          if (this.previousUrl == "/profile" || this.previousUrl == "/vehicle-document") {
            this.router.navigateByUrl('/profile');
          } else {
            this.router.navigateByUrl('/kyc-status', { state: { selectedVehicle: this.vehicleInfo.preference } });
          }
        }
      }, (error) => {
        this.commonService.dismiss();
        this.commonService.danger(error?.message);
      });
    } else {
      this.commonService.danger("Please Select an Option");
    }
  }

  goToVehicleDocument() {
    if (this.selectVehicleItem !== undefined && this.selectVehicleItem !== '' && this.selectVehicleItem !== null) {
      if (this.selectVehicleItem) {
        this.vehicleInfo = Object.assign({ "preference": this.selectVehicleItem })
      }
      this.onboardService.addUpdateDeliveryPreferences(this.vehicleInfo).subscribe((res: any) => {
        if (res?.isDOption?.success && res?.isDOption?.data != undefined) {
          this.selectVehicleItem = res?.isDOption?.data.preference;
          this.router.navigateByUrl('/vehicle-document', { state: { isProfile: true } });
        }
      }, (error) => {
        this.commonService.danger(error?.message);
      });
    } else {
      this.commonService.danger("Please Select an Option");
    }
  }

  // onBack() {
  //   if (this.previousUrl == "/profile" || this.previousUrl == "/select-vehicle" || this.previousUrl == "/vehicle-document") {
  //     this.router.navigate(['/profile']);
  //   } else {
  //     this.router.navigate(['/selected-language']);
  //     localStorage.clear()
  //   }
  // }

}
