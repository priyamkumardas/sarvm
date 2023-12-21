import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selectedTab:String;

  constructor(public router:Router,public commonService: CommonService) { }

  ngOnInit() {
  }

  changeActiveTab(e){
    console.log(e);
    this.selectedTab = e.tab
  }

}
