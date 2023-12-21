import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { AddWeightComponent } from 'src/app/components/add-weight/add-weight.component';
import { DistanceCoversComponent } from 'src/app/components/distance-covers/distance-covers.component';
import { CommonService } from 'src/app/lib/services/common.service';
import { OnboardService } from 'src/app/lib/services/onboard.service';

@Component({
  selector: 'app-delivery-options',
  templateUrl: './delivery-options.page.html',
  styleUrls: ['./delivery-options.page.scss'],
})
export class DeliveryOptionsPage implements OnInit {

  distanceTo: any = 0;
  distanceFrom: any = 0;

  selectKM: any = '';

  deliveryInfor: any = [];
  deliveryKilometros: any = [];
  //deliverykilogram: any = [];

  flatRate: boolean = false;
  surCharge: number = 0;

  constructor(private ngLocation: Location,
    public commonService: CommonService,
    private onboardService: OnboardService,
    private modalCtrl: ModalController) {
  }

  ngOnInit() {
    //console.log(this.selectKM);
    this.getdeliveryBoy();
  }

  onFlatRateChange(ev){
    this.flatRate = ev.detail.checked;
  }

  isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
    } else {
      return true;
    }
  }

  getdeliveryBoy() {
    this.commonService.present();
    this.onboardService.getDeliveryCharges().subscribe((res: any) => {
      this.commonService.dismiss();
      if (res?.isVehicleDoc?.success && res?.isVehicleDoc?.data != undefined) {
        this.deliveryInfor = res?.isVehicleDoc?.data;
        this.deliveryKilometros = res?.isVehicleDoc?.data.charges;
        this.flatRate = res?.isVehicleDoc?.data.flatRate;
        this.surCharge = res?.isVehicleDoc?.data.surCharge;
        var lastArrItem = Object.keys(this.deliveryKilometros[this.deliveryKilometros.length - 1]) + "";
        this.selectKM = lastArrItem + "";
      }
    }, (error) => {
      this.commonService.dismiss();
      this.commonService.danger(error?.message);
    });
  }

  selectDistance(seleKey, item) {
    console.log(item);
    this.selectKM = seleKey;
  }

  async openAddWeightModal() {
    const modal = await this.modalCtrl.create({
      component: AddWeightComponent,
      cssClass: 'gst-modal-css',
      componentProps: { selectKM: this.selectKM, isModal: false, }
    });
    await modal.present();
    modal.onDidDismiss().then((data: any) => {
      if (data.data !== 0 && data.data !== null && data.data !== undefined) {
        this.deliveryKilometros.filter((res, ind) => {
          if (Object.keys(res) + "" === this.selectKM) {
            this.deliveryKilometros[ind]["" + Object.keys(res)].push(data.data.weightItem);
          }
        });
        //console.log("deliveryKilometros>>" + JSON.stringify(this.deliveryKilometros));
      }
    });
  }

  async openDistanceCoversModal() {
    let lastVal = 0;
    if (this.deliveryKilometros.length != 0) {
      var lastArrItem = Object.keys(this.deliveryKilometros[this.deliveryKilometros.length - 1]) + "";
      let val = lastArrItem.split("-");
      lastVal = parseInt(val[1].replace('KM', ''));
    } else {
      lastVal = 0;
    }
    const modal = await this.modalCtrl.create({
      component: DistanceCoversComponent,
      cssClass: 'gst-modal-css',
      componentProps: {
        distanceTo: this.distanceTo,
        distanceFrom: this.distanceFrom,
        allDistance: this.deliveryKilometros,
        lastDistance: lastVal,
        isModal: false,
      }
    });
    await modal.present();
    modal.onDidDismiss().then((data: any) => {
      if (data.data !== 0 && data.data !== null && data.data !== undefined) {
        let chekitm = this.deliveryKilometros.some((res, ind) => {
          if (Object.keys(res) + "" === data.data.distanceTo + '-' + data.data.distanceFrom + 'KM') {
            return true;
          }
        });
        if (!chekitm) {
          var obj;
          if (this.deliveryKilometros.length != 0) {

            var lastArrItem = Object.keys(this.deliveryKilometros[this.deliveryKilometros.length - 1]) + "";
            let val = lastArrItem.split("-");
            let firstVal = parseInt(val[0]);
            let lastVal = parseInt(val[1].replace('KM', ''));

            if (lastVal != data.data.distanceFrom && lastVal <= data.data.distanceFrom) {
              obj = { [lastVal + '-' + data.data.distanceFrom + 'KM']: [] }
            } else {
              return this.commonService.danger("You select distance is equal (" + lastVal + '-' + data.data.distanceFrom + ")! Please select diffrent");
            }
          } else {
            obj = { [data.data.distanceTo + '-' + data.data.distanceFrom + 'KM']: [] }
          }

          this.deliveryKilometros.push(obj);
          this.selectKM = Object.keys(obj) + "";

        } else {
          this.commonService.danger("This distance is already there");
        }
        //console.log("deliveryKilometros>>" + JSON.stringify(this.deliveryKilometros));
      }
    });
  }

  saveDeliveryCharges() {
    if (this.deliveryKilometros !== undefined && this.deliveryKilometros !== '', this.deliveryKilometros !== null) {
      let newChargeItem = Object.assign({ "flatRate": this.flatRate, "surCharge": this.surCharge, "charges": this.deliveryKilometros });
      this.commonService.present();
      this.onboardService.postDeliveryCharges(newChargeItem).subscribe((res: any) => {
        this.commonService.dismiss();
        if (res?.isVehicleDoc?.success && res?.isVehicleDoc?.data != undefined) {
          this.onBack();
        }
      }, (error) => {
        this.commonService.dismiss();
        this.commonService.danger(error?.message);
      });
    } else {
      this.commonService.danger("please select any vehicle item!");
    }
  }

  onBack() {
    this.ngLocation.back();
  }
}
