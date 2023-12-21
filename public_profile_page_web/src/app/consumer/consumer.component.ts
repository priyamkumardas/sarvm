import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {
  consumerID: any;
  shopQR = '';

  constructor(
    private route: ActivatedRoute,
    private qrcodemodule: QRCodeModule,
  ) {
    this.route.paramMap.subscribe((params) => {
      // console.log(params.get('username'));
      console.log(params);
      this.consumerID = params.get('id');
      console.log(this.consumerID);
      this.shopQR = window.location.href;
      console.log(this.shopQR);
    });
   }

  ngOnInit(): void {
  }

}
