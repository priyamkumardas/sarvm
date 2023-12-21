import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-support-us',
  templateUrl: './support-us.page.html',
  styleUrls: ['./support-us.page.scss'],
})
export class SupportUsPage implements OnInit {

  constructor(public modelCtrl:ModalController, public commonservice:CommonService) { }

  ngOnInit() {
  }

}
