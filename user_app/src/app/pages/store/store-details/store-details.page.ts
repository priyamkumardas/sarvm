import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from './../../../lib/services/storage.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { CatalogueService } from 'src/app/lib/services/catalouge.service';
import { Constants } from 'src/app/config/constants';
import { LocationService } from 'src/app/lib/services/location.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

import { SellerProfileComponent } from 'src/app/components/seller-profile/seller-profile.component';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.page.html',
  styleUrls: ['./store-details.page.scss'],
})
export class StoreDetailsPage implements OnInit {


  constructor(private modalCtrl: ModalController, private http: HttpClient,
    private route: ActivatedRoute,
    public locationService: LocationService,
    private storageService: StorageService,
    public commonservice: CommonService,
    private catalogueService: CatalogueService,
    private router: Router,
    private  inAppBrowser: InAppBrowser,
    private platform: Platform
	 ) { }

  location = {
    lat: null,
    lon: null,
  }
  
  retailerData: any;
  lat: any;
  long: any;
  name: any;
  about: any;
  sellerDetails: any;
  retailerID: any;
  selectedCategory = null;
  categories: any;
  changedLocation: any;

  ngOnInit() {
    this.route.queryParams.subscribe(res=>{
      this.sellerDetails = JSON.parse(res.vendorDetails);
    })
    if(this.sellerDetails.store_meta[0]?.url) {
      this.commonservice.presentLoading();
      this.catalogueService.getmerchant(this.sellerDetails.store_meta[0].url).subscribe((res: any) => {
        this.commonservice.dissmiss_loading();
        this.retailerData = res;
        this.name = this.retailerData?.retailer.basicInformation?.personalDetails.firstName;
        this.about = this.retailerData?.retailer.basicInformation?.personalDetails.aboutUs;
        this.categories = this.retailerData?.catalog;
        this.location = {
          lat: String(this.retailerData?.shop?.location.lat),
          lon: String(this.retailerData?.shop?.location.lon)
        }
      },err=>{
        this.commonservice.dissmiss_loading();
      })
    }
  }

  async showProfile() {
    if(this.retailerData?.retailer.about){
      const model = await this.modalCtrl.create({
        component: SellerProfileComponent,
        cssClass: 'OtpBox-AddMember',
        componentProps: {
          name: this.retailerData?.retailer.name,
          image: this.retailerData?.retailer.profileImageUrl,
          about: this.retailerData?.retailer.about,
          tagline: this.retailerData?.retailer.tagline,
          address: this.retailerData?.retailer.location.address
          // mobileNumber: this.retailerData.retailer.mobileNumber
        },
      });
      await model.present();
      const { data } = await model.onWillDismiss();
    }
  }
  cancel() {
    this.modalCtrl.dismiss();
  }

  openBrowser(url) {
    let latlon = url.latitude + ',' + url.longitude
    if (this.platform.is('ios')) {
      this.inAppBrowser.create('maps://?q=' + latlon, '_system');
    } else {
      this.inAppBrowser.create('geo:0,0?q=' + latlon , '_system');
    }
  }
}

