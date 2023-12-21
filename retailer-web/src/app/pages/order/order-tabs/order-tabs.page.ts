import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../lib/services/common.service';
@Component({
  selector: 'app-order-tabs',
  templateUrl: './order-tabs.page.html',
  styleUrls: ['./order-tabs.page.scss'],
})
export class OrderTabsPage implements OnInit {

  constructor(public commonService: CommonService,) { }

  ngOnInit() {
  }

}
