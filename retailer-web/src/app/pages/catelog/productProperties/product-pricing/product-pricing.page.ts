import { CommonService } from './../../../../lib/services/common.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-pricing',
  templateUrl: './product-pricing.page.html',
  styleUrls: ['./product-pricing.page.scss'],
})
export class ProductPricingPage implements OnInit {
  @Input() product = {
    price: 0,
    name: '',
    image: '',
    soldBy: '',
    grading: '',
    discount: 0,
    quantity: 0,
  };
  @Input() from:String;
  constructor(
    private modalCtrl: ModalController,
    private commonService: CommonService
  ) {}

  ngOnInit() {}

  selectItem(item) {
    this.product.soldBy = item;
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  async saveProduct() {
    if (this.product.price < 0) {
      this.commonService.danger('Price cannot be in negative');
      return;
    }
    if (!this.product.price) {
      this.commonService.danger('Please enter price');
      return;
    }
    if (!this.product.soldBy) {
      this.commonService.danger('Please select sold by');
      return;
    }
    await this.modalCtrl.dismiss(this.product);
  }

  checkPrice(event) {
    if (event.detail.value < 0) {
      this.commonService.danger('Price cannot be in negative');
      return;
    }
  }

  // changePrice(type) {
  //   if (type === 'inc') {
  //     this.product.price = +this.product.price ? +this.product.price + 1 : 1;
  //   } else {
  //     this.product.price = +this.product.price ? +this.product.price - 1 : 0;
  //   }
  // }
}
