// import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss'],
})
export class SellerProfileComponent implements OnInit {
  @Input() name ;
  @Input() image ;
  @Input() about ;
  @Input() tagline;
  @Input() address;
  showMore = false;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
   }



  cancel() {
    this.modalCtrl.dismiss();
  }


}
