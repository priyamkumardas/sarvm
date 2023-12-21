import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() tab = 'sortBy';
  @Input() filter;
  activeTab = 'Sort By';
  ratingNumber = 1;
  // rangeValue = 1;
  isVeg: boolean = localStorage.getItem('userVegPrefrence') == 'veg'?true:false;
  deliveryType = 0;

  constructor(public modalController: ModalController, public commonservice :CommonService) {
  }

  dismiss(): void {
    this.modalController.dismiss(
      {
        rangeValue: this.filter.rangeValue,
        ratingNumber: this.ratingNumber,
        isVeg: this.isVeg,
        deliveryType: this.deliveryType,
      },
      'confirm'
    );
  }

  changeTab(item): void {
    console.log(this.filter)
    this.activeTab = item;
  }

  setPreference(value): void {
    this.filter.isVeg = value;
  }
  featureNotAvailable() {
    this.commonservice.featureNotAvailable();
  }
}
