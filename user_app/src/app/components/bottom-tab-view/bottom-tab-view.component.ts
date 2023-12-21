import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';


@Component({
  selector: 'app-bottom-tab-view',
  templateUrl: './bottom-tab-view.component.html',
  styleUrls: ['./bottom-tab-view.component.scss'],
})
export class BottomTabViewComponent implements OnInit {

  checkRouter: any;

  @Input() tabsRootType: string = 'home';
  @Input() tabsTextAvailable: Boolean = false;

  @Output() orderStateChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router,
    public commonService: CommonService,) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.checkRouter = this.router.getCurrentNavigation().finalUrl.toString();
  }

  orderPageNavigation(pageName: any){
    this.router.navigateByUrl('/'+pageName, { replaceUrl: true }) 
  }
  
  moveToStoreListing() {
    let url = '/store-listing'+ '/' + 'favourites' 
    this.router.navigateByUrl(url,{state:{page:"favourites"}});
  }

}
