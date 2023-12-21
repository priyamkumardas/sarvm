import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogueService } from 'src/app/lib/services/catalouge.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { EmptyListComponent } from 'src/app/components/empty-list/empty-list.component';
import { UserService } from 'src/app/lib/services/user.service';

@Component({
  selector: 'app-store-listing',
  templateUrl: './store-listing.page.html',
  styleUrls: ['./store-listing.page.scss'],
})
export class StoreListingPage implements OnInit {
  categoryId: string;
  merchantListArray = [];
  filterMerchantListArray = [];
  userData = this.commonservice.userData;
  favShops = new Set();
  flag: any;
  constructor(
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    private router: Router,
    public commonservice: CommonService,
    private storageService: StorageService,
    private userService: UserService,
  ) { 
  }

  ngOnInit() {}
  ionViewWillEnter(){
    if(this.router.url.includes("favourites")){
      this.categoryId = 'favourites';
    }else{
      this.route.params.subscribe((params) => {
        this.categoryId = params['id'];
      });
    }
    if (this.userData) {
      this.getFavouriteShops();
    }else{
      this.getMerchantList();
    }
  }

  getMerchantList() {
    this.commonservice.presentProgressBarLoading()

    this.catalogueService.getmerchantListArray(null).subscribe((res: any) => {
      this.commonservice.closeProgressBarLoading()
      if (res && res.data) {
        let data = res.data?.stores ? res.data?.stores : [];
        data.length == 0 ? this.flag = true : this.flag = false;
        if(!this.router.url.includes("favourites")){
          data = data.filter((store) => {
            return store.categories.indexOf(this.categoryId) != -1;
          });
          data.length == 0 ? this.flag = true : this.flag = false;
        }
        if(this.userData){
          data?.map(shops => {
            if (this.favShops.has(shops.shop_id)) {
              //Favourite code 
              shops.myfavshop = true;
            }
          });
          this.merchantListArray = []
          this.merchantListArray.push(...data.filter(shop => shop.myfavshop))
          if(!this.router.url.includes("favourites")){
          this.merchantListArray.push(...data.filter(shop => !shop.myfavshop))
          }else{
            this.merchantListArray.length == 0 ? this.flag = true : this.flag = false;
          }
          console.log(this.merchantListArray)
        }else{
          this.merchantListArray = data;
        }
      }
    },err=>{
      this.commonservice.closeProgressBarLoading()
    })
  }
    

  favouriteShop(event) {
    console.log(event)
    let shop_id = event.shop_id;
    let isFavourite = event.isFavourite;
    if (this.userData) {
      this.commonservice.presentProgressBarLoading()
      let string = String(shop_id)
      this.userService.addFavourite({ shopId: string }).subscribe(res => {
        this.commonservice.closeProgressBarLoading()
        if (isFavourite) {
          this.commonservice.danger('Shop removed from favourites.')
        } else {
          this.commonservice.success('Shop added to favourites.')
        }
        this.getFavouriteShops();
      }, error => {
        this.commonservice.closeProgressBarLoading()
        this.commonservice.toast(error.error.error.message)
      })
    } else {
      this.commonservice.danger("Login Required");
    }
  }

  getFavouriteShops() {
    this.userService.getFavouriteShop().subscribe(res => {
      this.favShops.clear();
      res['data']?.map(res=>{
        this.favShops.add(parseInt(res.shopId));
      });
      this.getMerchantList();
    }, error => {
      console.log(error);
    })
  }
}

