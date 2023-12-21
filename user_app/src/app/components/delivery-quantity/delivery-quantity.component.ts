import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-delivery-quantity',
  templateUrl: './delivery-quantity.component.html',
  styleUrls: ['./delivery-quantity.component.scss'],
})
export class DeliveryQuantityComponent implements OnInit {
  quantity:any;
  amount:any;
  @Input() unit:any;
  @Input() price:any;
  showMore = false;
  rate = 10;
  @Input() moq;

  //availableQuantity = [1,2,3];
  //availableQuantityGm = [50,100,250,500,750];
  availableQuantityGm = [0.005,0.01,0.025,0.05,0.1,0.25,0.5,0.75];
  availableQuantityKg = [1.5,2,2.5];

  availableQuantityPlt = [0.25,0.5,1,1.5,2,4,5,6,8,10,12,15];

  //availableQuantityMl = [50,100,250,500,750];
  availableQuantityMl = [0.05,0.1,0.25,0.5,0.75];
  availableQuantityLtr = [1.5,2];
  availableQuantityGls = [1,2,4,6,8];
  availableQuantityPkt = [1,2,4,6,8];
  availableQuantityPcs = [1,2,4,6,8];


  constructor(private modalCtrl: ModalController, private commonservice : CommonService) {}

  ngOnInit() {}
  

  closeModal() {
    this.modalCtrl.dismiss(
      {
        quantity: this.amount?this.unit == 'Pcs'?Math.round(this.amount/this.price):(this.amount/this.price).toFixed(3):this.unit == 'Pcs'?Math.round(this.quantity):this.unit == 'Plt'?this.quantity:this.quantity.toFixed(3),
      },
      'confirm'
    );
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  toggleMore() {
    this.showMore = !this.showMore;
  }

  setQuanity(val, unt) {
    this.quantity = val;
    console.log(this.amount?this.unit == 'Pcs'?(this.amount/this.price):(this.amount/this.price).toFixed(3):this.unit == 'Pcs'?(this.quantity):this.unit == 'Plt'?this.quantity:this.quantity.toFixed(3))
    let myVal = parseFloat(this.amount?this.unit == 'Pcs'?(this.amount/this.price):(this.amount/this.price).toFixed(3):this.unit == 'Pcs'?(this.quantity):this.unit == 'Plt'?this.quantity:this.quantity.toFixed(3))
    console.log(myVal)
    if(this.moq && (parseFloat(this.moq) > myVal)){
      this.commonservice.danger("Min order " + this.moq +' '+ this.unit + "," + " please select qty min " + this.moq +' '+ this.unit);
    }else{
      if(parseFloat(this.amount?this.unit == 'Pcs'?Math.round(this.amount/this.price):(this.amount/this.price).toFixed(3):this.unit == 'Pcs'?Math.round(this.quantity):this.unit == 'Plt'?this.quantity:this.quantity.toFixed(3)) < 0){
        this.commonservice.danger("Quantity can not be negative");
      }else{
        this.showMore = false;
        this.unit = unt;
        this.closeModal();
      }
    }
  }
  
  decimalQuantityValue(){
    this.quantity=parseFloat(this.quantity.toFixed(2))
  }
}
