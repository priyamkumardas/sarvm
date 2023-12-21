import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from './../../../../lib/services/common.service';

@Component({
  selector: 'app-order-quantity',
  templateUrl: './order-quantity.page.html',
  styleUrls: ['./order-quantity.page.scss'],
})
export class OrderQuantityPage implements OnInit {
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
  // quantity: any;
  amount: any;
  @Input() unit: any;
  @Input() price: any;
  showMore = false;
  rate = 10;
  solditem: any;
  selectedOption: any;

  availableQuantityGm = [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 0.75];
  availableQuantityKg = [1.5, 2, 2.5];
  availableQuantityPcs = [0.25, 0.5, 1, 1.5, 4, 5, 6, 8, 10, 12, 15];
  availableQuantityMl = [0.05, 0.1, 0.25, 0.5, 0.75];
  availableQuantityLtr = [1.5, 2];
  constructor(private modalCtrl: ModalController, public commonService: CommonService) { }

  ngOnInit() {
    console.log(this.product);
    this.selectedOption = this.product.soldBy;
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  async saveProduct() {
    console.log(this.product)
    if ((this.solditem === 'gram') || (this.solditem === 'ml')) {
      this.product.quantity = (this.product.quantity / 1000);
    }
    console.log(this.product.quantity);
    if (this.product.quantity <= 0) {
      this.commonService.danger('The quantity cannot be less than 0');
      return this.product.quantity = 0;
    } else {
      await this.modalCtrl.dismiss(this.product);
      return this.product.quantity;
    }
  }

  radioGroupChange(entry): void {
    if ((entry.target.value === 'ml')) {
      this.solditem = entry.target.value;
    } else if (entry.target.value === 'gram') {
      this.solditem = entry.target.value;
    } else {
      this.solditem = this.product.soldBy;
    }
    console.log(this.solditem);
    this.selectedOption = entry.target.value;
  }

  async backToQuantityPopup() {
    await this.modalCtrl.dismiss('back');
  }

  toggleMore() {
    this.showMore = !this.showMore;
  }

  setQuanity(val, unt) {
    this.showMore = false;
    this.product.quantity = val;
    this.product.soldBy = unt;
  }

  decimalQuantityValue() {
    console.log(this.product.quantity);
    console.log(parseFloat(this.product.quantity.toFixed(2)));
    this.product.quantity = parseFloat(this.product.quantity.toFixed(2))
  }

  changePrice(type) {
    if (type === 'inc') {
      this.product.quantity = +this.product.quantity ? +this.product.quantity + 1 : 1;
    } else {
      this.product.quantity = +this.product.quantity ? +this.product.quantity - 1 : 0;
    }
  }

  checkPrice(event) {
    if (event.detail.value < 0) {
      this.commonService.danger('The value cannot be less than 0');
      return;
    }
  }
}
