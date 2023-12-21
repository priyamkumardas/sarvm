import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from './../../../../lib/services/common.service';

@Component({
  selector: 'app-productdiscount',
  templateUrl: './productdiscount.page.html',
  styleUrls: ['./productdiscount.page.scss'],
})
export class ProductdiscountPage implements OnInit {
  @Input() product = {
    price: 0,
    name: '',
    image: '',
    soldBy: '',
    grading: '',
    discount: 0,
    quantity: 0,
    status: null
  };

  constructor(private modalCtrl: ModalController, public commonService: CommonService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    console.log(this.product);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  async saveProduct() {
    console.log(this.product.discount);
    if (!this.product.discount) {
      this.product.discount = 0;
    }
    if (this.product.discount >= 100) {
      this.commonService.danger('The discount cannot be greater than 99%');
      return this.product.discount;
    } else {
      this.product.status == 'pending' ? this.product.status = 'unpublished' : '';
      await this.modalCtrl.dismiss(this.product);
    }

    if (this.product.discount < 0) {
      this.commonService.danger('The discount cannot be less than 0%');
      return this.product.discount = 0;
    } else {
      this.product.status == 'pending' ? this.product.status = 'unpublished' : '';
      // await this.modalCtrl.dismiss(this.product);
    }

  }

  changePrice(type) {
    console.log(this.product.discount);
    if (type === 'inc') {
      if (this.product.discount >= 100) {
        this.commonService.danger('The discount cannot be greater than 99%');
        return;
      } else {
        this.product.discount = +this.product.discount ? +this.product.discount + 1 : 1;
      }
    } else {
      if (this.product.discount <= 0) {
        this.commonService.danger('The discount cannot be less than 0%');
        return;
      } else {
        this.product.discount = +this.product.discount ? +this.product.discount - 1 : 0;
      }
    }
  }

  checkPrice(event) {

    if (event.detail.value >= 100) {
      this.commonService.danger('The discount cannot be greater than 99%');
      return;
    }
    if (event.detail.value < 0) {
      this.commonService.danger('The discount cannot be less than 0%');
      return;
    }
  }

  async backToGradingPopup() {
    await this.modalCtrl.dismiss('back');
  }
}
