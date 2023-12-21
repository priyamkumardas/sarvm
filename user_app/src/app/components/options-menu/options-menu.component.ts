import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { StorageService } from 'src/app/lib/services/storage.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { ActivatedRoute ,Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss'],
})
export class OptionsMenuComponent implements OnInit {

  favShops = this.storageService.getItem(Constants.FAV_SHOPS);
  @Input() shopId: any;
  @Input() vendDetails: any;
  addDisable : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private storageService:StorageService,
    public commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  

  action(arg) {
    return this.modalCtrl.dismiss(arg);
  }
  
  share(arg){
    this.addDisable = true;
    let appLink = environment.sarvmAllApps.publicPage
    let link =  this.vendDetails?.dataList?.shop?.profileUrl;
    let message = `Hey! Here is a shop that I liked : ${link}, Check out SarvM.AI, an app digitizing the food supply chain. Download the app now  ${appLink}`;
    this.commonService.shareQr(message, link).then(res=>{
      this.addDisable = false; 
    })
    return this.modalCtrl.dismiss(arg);
  }
  
  sellerProfile(details) {
    console.log(details);
    this.router.navigate([`/seller-profile/${details.shop_id}`], {
      queryParams: { 
        vendorDetails:JSON.stringify(details)
      }
    });
    this.action('close')
  }
}

