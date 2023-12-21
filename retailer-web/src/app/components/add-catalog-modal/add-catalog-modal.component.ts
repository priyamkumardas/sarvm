import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadingController, NavController, AlertController, ModalController } from '@ionic/angular';
import { ProductsService } from 'src/app/lib/services/products.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { Constants } from 'src/app/config/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { CommonService } from 'src/app/lib/services/common.service';

import { CancelOrderModalComponent } from '../../pages/order/cancel-order-modal/cancel-order-modal.component'





@Component({
  selector: 'app-add-catalog-modal',
  templateUrl: './add-catalog-modal.component.html',
  styleUrls: ['./add-catalog-modal.component.scss'],
})
export class AddCatalogModalComponent implements OnInit {
 
  masterCategoryArray: any;
  categories = [];
  selectedCategories = []; //Array consists of all the categories selected by users
  // allCategories = [];
  // selectedCategoriesTemp = [];
  // selectedCategorieIds = [];
  // searchCategories;
  // selectedProducts = [];
  // getProductDataFromBackend = [];

  public categorySubject = new BehaviorSubject<string>('false');
  isLoading: boolean;
  searchLang: any;


  constructor(
    private navCtrl: NavController,
    private productsService: ProductsService,
    private storageService: StorageService,
    private router: Router,
    public commonService: CommonService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private modalController: ModalController
  ) { }

  @Output() closeModal = new EventEmitter<{ role: string }>();

  ngOnInit() { }

  ionViewWillEnter() {
    this.getCatalogDataFromBackend();
    // this.storageService.getItemNativeCatalog(Constants.SELECTED_CATEGORIES).then(selectedCategories => {
    //   console.log('selectedCategories', JSON.parse(selectedCategories));
    //   this.selectedCategories = JSON.parse(selectedCategories) ? JSON.parse(selectedCategories) : [];
    // })
    this.getSpashScreenData();
  }

  async pullToRefresh(event) {
    this.commonService.alert('Are you Sure?', 'Do you want to Refresh.', 'No', 'Yes', () => event.target.complete()
      , () => setTimeout(() => {
        this.getCatalogDataFromBackend();
        event.target.complete();
      }))
  }

  getCatalogDataFromBackend() {
    this.selectedCategories = []
    this.commonService.presentLoader().then(res =>{
    res.present()
      this.productsService.getCatalogList().subscribe((resp: any) => {
        res.dismiss()
        if (resp.success) {
          console.log(resp)
          let savedCatalog = []
          resp.data.catalog.map(catalog => {
            savedCatalog.push(catalog.id)
          })
          console.log(this.masterCategoryArray);
          this.masterCategoryArray.map(master => {
            if (savedCatalog.includes(master.id)) {
              this.selectedCategories.push(master)
              master.checked = true
            }
          })
          console.log(this.selectedCategories, 'selected cat')
        }
      },error => {
        res.dismiss()
        console.log(error);
      })
    });
  }
  /**
   * @name getSpashScreenData
   * @type Function - Get all allCategories, microcategories, and products
   * **/
  getSpashScreenData() {
    this.storageService.getItemNativeCatalog(Constants.PRODUCT_DATA).then(catelogPresentinStorage => {
      if (catelogPresentinStorage) {
        var jsonObj = JSON.parse(catelogPresentinStorage);
        console.log(jsonObj);
        this.masterCategoryArray = jsonObj.masterCatalogData.catalog
        if (jsonObj) {
          /**
           * Partner Catalog Data
           */
          // this.getCatalogDataFromBackend();
        } else {
          this.productsService.getcatogoriesList().subscribe((res: any) => {
            if (res && res.data && res.data.catalogue_meta) {
              /**
               * Changed master catalog data array new URL
               */
              const urls = {
                masterCatalogData: res.data.catalogue_meta['masterCatalog'][0].url
              }
              this.productsService.homegetProductsListNew(urls).subscribe((data: any) => {
                if (data) {
                  console.log(data)
                  this.masterCategoryArray = data.masterCatalogData.catalog
                  this.storageService.setItemNativeCatalog(Constants.PRODUCT_DATA, data);
                }
              });
            }
          });
        }
      }
    });
  }


  /**
   * @name chooseCategory
   * @type Function - Select/Unselect the allCategories
   * @param evt - Event triggred on click
   * @param id - Category Id
   * **/

  chooseCategory(category): void {
    if (this.selectedCategories.filter(res => res.id == category.id).length) {
      let categoryExistsIndexID = this.selectedCategories.filter(res => res.id != category.id)
      this.selectedCategories = categoryExistsIndexID
    } else {
      this.selectedCategories.push(category)
    }
    console.log('selectedCategories', this.selectedCategories)
  }

  searchFunction() {
    this.categories = this.masterCategoryArray.filter((category) =>
      category.name.toLowerCase().includes(this.searchLang.toLowerCase())
    );
  }

  navigate() {
    console.log(this.selectedCategories , 'selectedCategories')
    this.storageService.setItemNativeCatalog(Constants.SELECTED_CATEGORIES, this.selectedCategories);
    //console.log("modal dismiss");
    this.modalController.dismiss();
    this.closeModal.emit({ role: 'closeModal' });
    //this.router.navigate(['/select-food'])
  }

  // async confirmCategoryUncheck(categoryItem: any, statusText: string) {
  //   const modal = await this.modalCtrl.create({
  //     component: CancelOrderModalComponent,
  //     cssClass: 'cancel-modal-component-css',
  //     componentProps: {
  //       'orderType': statusText
  //     }
  //   });
  //   modal.onDidDismiss().then((modelData: any) => {
  //     console.log('here');
  //     console.log(modelData);
  //     if (modelData !== null && modelData !== undefined && modelData !== "") {
  //       if(modelData.data.status == 'Yes'){


  //         console.log(categoryItem);
  //         const cIndex = this.selectedCategories.findIndex((v) => +v.id === +categoryItem.id);
  //         const pIndex = this.selectedCategorieIds.findIndex((v) => +v === +categoryItem.id);
  //         if (pIndex > -1) {
  //           this.selectedCategories.splice(cIndex, 1);
  //           this.selectedCategorieIds.splice(pIndex, 1);
  //         } else {
  //           if(categoryItem.checked == false){
  //             this.selectedCategories.push(categoryItem);
  //             this.selectedCategorieIds.push(categoryItem.id.toString());
  //           } else {
  //             this.selectedCategories.splice(cIndex, 1);
  //             this.selectedCategorieIds.splice(pIndex, 1);
  //           }
  //         }

  //         console.log(this.selectedCategories);

  //         this.storageService.setItemNativeCatalog(Constants.SELECTED_CATEGORIES, this.selectedCategories);


  //       }
  //       console.log('Modal Data : ' + modelData);
  //     }
  //   });
  //   await modal.present();
  // }
}