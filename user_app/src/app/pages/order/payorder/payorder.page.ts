import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-payorder',
  templateUrl: './payorder.page.html',
  styleUrls: ['./payorder.page.scss'],
})
export class PayorderPage implements OnInit {

  @Input() amount:any;

  constructor(public modelCtrl:ModalController,public commonservice: CommonService,) { }

  ngOnInit() {
    console.log(this.amount)
  }

  featureNotAvailable() {
    this.commonservice.featureNotAvailable();
  }

}
