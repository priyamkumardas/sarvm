import { CommonService } from 'src/app/lib/services/common.service';
import { Router, RoutesRecognized } from '@angular/router';
import { ProductdiscountPage } from './../productProperties/productdiscount/productdiscount.page';
import { Constants } from 'src/app/config/constants';
import { ProductGradingPage } from './../productProperties/product-grading/product-grading.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/lib/services/storage.service';
import { ProductPricingPage } from '../productProperties/product-pricing/product-pricing.page';
import { ProductsService } from 'src/app/lib/services/products.service';
import { OrderQuantityPage } from './../productProperties/order-quantity/order-quantity.page';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-my-catalog',
  templateUrl: './my-catalog.component.html',
  styleUrls: ['./my-catalog.component.scss'],
})
export class MyCatalogComponent implements OnInit {
  productStatus = 'all';
  productsType = ['pending', 'unpublished', 'published'];
  selectTabs: any;
  allSelectedProducts = [];
  categoryProducts = [];
  publishProducts = [];
  unpublishProducts = [];
  searchProduct = '';
  showSearch = false;
  from: string;
  getProductDataFromBackend = [];
  allProductsToShow = [];

  constructor(
    public router: Router,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private productsService: ProductsService,
    public commonService: CommonService,
    public alertController: AlertController,
  ) {
    this.from = this.router.getCurrentNavigation()?.extras.state ? this.router.getCurrentNavigation().extras.state.page : null;
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getCatalogDataFromBackend();
  }

  async pullToRefresh() {
      this.getCatalogDataFromBackend();
  }

  /**
   * @getCatalogDataFromBackend function calls backend api to fetch data which has been sent to partner catalog from select food page
  */
  getCatalogDataFromBackend() {
    this.commonService.presentLoader().then(res => {
      res.present()
      this.productsService.getCatalogList().subscribe((resp: any) => {
        res.dismiss()
        if (resp.success) {
          resp.data.catalog.map(res => {
            this.uncheckCheckedProducts(res)
          })
          this.getProductDataFromBackend = resp.data.catalog;
          this.selectTabs = '0';
          console.log(this.selectTabs, this.getProductDataFromBackend)
          this.publishProducts = []
          this.unpublishProducts = []
          this.segmentChanged();
        }
      }, error => {
        res.dismiss()
        console.log(error);
      });
    })
  }

  checkDuplicateProducts(productId, categoriesName) {
    console.log(productId, categoriesName, this.allProductsToShow)
    if (this.allProductsToShow[categoriesName]) {
      if (!this.allProductsToShow[categoriesName].includes(productId)) {
        this.allProductsToShow[categoriesName].push(productId)
        return true;
      }
    } else {
      this.allProductsToShow[categoriesName] = [productId]
      return true;
    }
    return false;
  }

  /**
   * @uncheckCheckedProducts unchecks products initially after api call (which were sent checked in api from select food page (to partner catalog))
  */
  uncheckCheckedProducts(catalog) {
    if (catalog.categories?.length) {
      catalog.categories.map(res => {
        this.uncheckCheckedProducts(res)
      })
    } else {
      for (let i = 0; i < catalog.products.length; i++) {
        catalog.products[i].checked = false;
      }
    }
  }

  updateProductList(status) {
    this.commonService.presentLoader().then(res => {
      res.present()
      this.productStatus = status;
      res.dismiss()
    })
  }

  segmentChanged() {
    this.commonService.presentLoader().then(res => {
      res.present()
      console.log(this.selectTabs, this.getProductDataFromBackend)
      this.categoryProducts = this.getProductDataFromBackend.filter((category, i) => i == +this.selectTabs)
      console.log(this.categoryProducts);
      res.dismiss()
    })
  }

  changeDetails(item) {
    this.openPricePopUp(item, true);
  }


  updateProduct(data, toPublish?) {
    this.getProductDataFromBackend.map(res => {
      toPublish ? this.remvoeSelectProducts(res, toPublish) : this.addSelectedProducts(res, data)
    })
    console.log(data);
    this.productsService.updateCatalogData({ catalog: this.getProductDataFromBackend }).subscribe((resp) => {
      console.log('p updated')
    }, err => {
      console.log('p update error')
    });
    this.clearAllProducts();
    // this.clearProductCount();
  }

  addSelectedProducts(catalog, product) {
    // console.log(product)
    if (catalog.categories?.length) {
      catalog.categories.map(res => {
        this.addSelectedProducts(res, product)
      })
    } else {
      for (let i = 0; i < catalog.products.length; i++) {
        if (catalog.products[i].id == product.id) {
          catalog.products[i] = product;
        }
      }
    }
  }

  remvoeSelectProducts(catalog, toPublish) {
    // console.log(catalog)
    if (catalog.categories?.length) {
      catalog.categories.map(res => {
        this.remvoeSelectProducts(res, toPublish)
      })
    } else {
      for (let i = 0; i < catalog.products.length; i++) {
        if (this.productStatus === catalog.products[i].status) {
          catalog.products[i].checked = false;
          if (toPublish) {
            if (this.productStatus == 'unpublished' && this.unpublishProducts.includes(catalog.products[i].id)) {
              catalog.products[i].status = 'published'
            } else if (this.productStatus == 'published' && this.publishProducts.includes(catalog.products[i].id)) {
              catalog.products[i].status = 'unpublished'
            }
          }
        }
      }
    }
  }

  clearProductCount() {
    if (this.productStatus === 'published') {
      this.publishProducts = [];
    } else {
      this.unpublishProducts = [];
    }
  }

  onSelectProduct(productId, type) {
    if (type === 'unpublished') {
      if (!this.unpublishProducts.includes(productId)) {
        this.unpublishProducts.push(productId)
      } else {
        this.unpublishProducts.splice(this.unpublishProducts.findIndex(res => res == productId), 1);
      }
      console.log(this.unpublishProducts)
    }
    if (type === 'published') {
      if (!this.publishProducts.includes(productId)) {
        this.publishProducts.push(productId)
      } else {
        this.publishProducts.splice(this.publishProducts.findIndex(res => res == productId), 1);
      }
      console.log(this.publishProducts)
    }
  }

  publishSelectedProducts() {
    this.publishProducts.forEach((v) => {
      this.allSelectedProducts.map((item) => {
        if (item.id === v) {
          item.status = 'published';
        }
      });
    });
    this.updateProductList(this.productStatus);
    this.storageService.setItemNativeCatalog(
      Constants.SELECTED_PRODUCT,
      this.allSelectedProducts
    );
    let submit_obj = {
      "products": this.allSelectedProducts
    }
    this.productsService.updateCatalogData(submit_obj).subscribe((resp) => {
    });
  }

  unpublishSelectedProducts() {
    this.unpublishProducts.forEach((v) => {
      this.allSelectedProducts.map((item) => {
        if (+item.id === +v) {
          item.status = 'unpublished';
        }
      });
    });
    this.updateProductList(this.productStatus);
    this.storageService.setItemNativeCatalog(
      Constants.SELECTED_PRODUCT,
      this.allSelectedProducts
    );
    let submit_obj = {
      "products": this.allSelectedProducts
    }
    this.productsService.updateCatalogData(submit_obj).subscribe((resp) => {
    });
    this.unpublishProducts = [];
  }

  selectAllProducts(): void {
    console.log(this.getProductDataFromBackend[this.selectTabs])
    this.getProductDataFromBackend.map((res, i) => {
      if (i == this.selectTabs) {
        // res.categories.map(res => {
        res.categories[0].products.map(res => {
          if (res.status == this.productStatus) {
            if (this.productStatus === 'published') {
              res.checked = true;
              this.publishProducts.push(res.id);
            } else {
              res.checked = true;
              this.unpublishProducts.push(res.id);
            }
          }
        })
        // })
      }
    })
  }

  /**
   * @isSelectAllOrClear it goes to each and every products and checks whether that product has been selected or not
   */
  isSelectAllOrClear() {
    let returnValue = true;
    this.categoryProducts.map(res => {
      // res.categories[0].map(res =>{
      res.categories[0].products.map(res => {
        // console.log(res , "res");
        // console.log(this.productStatus , "productStatus")
        if (res.checked && this.productStatus == res.status) {
          returnValue = false
        }
      })
      // })
    })
    // console.log(this.categoryProducts, 'returnvalue')
    return returnValue
  }

  clearAllProducts(): void {
    this.getProductDataFromBackend.map((res, i) => {
      if (i == this.selectTabs) {
        // res.categories.map(res => {
        res.categories[0].products.map(res => {
          if (res.status == this.productStatus) {
            if (this.productStatus === 'published') {
              if (this.publishProducts.includes(res.id)) {
                res.checked = false;
                let index = this.publishProducts.indexOf(res.id)
                if (index > -1) {
                  this.publishProducts.splice(index, 1)
                }
              }
            } else {
              if (this.unpublishProducts.includes(res.id)) {
                res.checked = false;
                let index = this.unpublishProducts.indexOf(res.id)
                if (index > -1) {
                  this.unpublishProducts.splice(index, 1)
                }
              }
            }
          }
        })
        // })
      }
    })
    this.segmentChanged();
  }

  toggleSearch(show): void {
    this.showSearch = show;
    if (!show) {
      this.searchProduct = '';
    }
  }

  onAdd() {
    this.storageService.getItemNativeCatalog(Constants.SELECTED_CATEGORIES).then(result => {
      if (result) {
        this.router.navigate(['/select-food']);
      } else {
        this.router.navigate(['/select-category']);
      }
    })
  }

  /**
   * @function for assigning price of the product 
   */
  async openPricePopUp(item, next = false) {
    console.log(this.from)
    const model = await this.modalCtrl.create({
      component: ProductPricingPage,
      cssClass: 'DeliveryDayPreference-component-css min-height',
      mode: 'ios',
      componentProps: {
        product: item,
        from: this.from,
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    if (data) {
      console.log(data);
      this.updateProduct(data);
      if (next) {
        this.openGradingPopUp(item, next);
      }
    }
    if(data?.status === 'published' || data?.status === 'unpublished'){
      this.openOrderQuentity(item, next)
    }
  }

  /**
   * @function for adding grading to the product 
   */

  async openGradingPopUp(item, next = false) {
    const model = await this.modalCtrl.create({
      component: ProductGradingPage,
      cssClass: 'DeliveryDayPreference-component-css',
      mode: 'ios',
      componentProps: {
        product: item,
        from: this.from,
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    if (data && data !== 'back') {
      this.updateProduct(data);
      if (next) {
        this.openDiscountPopUp(item, next);
      }
    } else {
      this.openPricePopUp(item, next);
    }
  }

  /**
   * @function for adding discount to the product 
   */
  async openDiscountPopUp(item, next = false) {
    const model = await this.modalCtrl.create({
      component: ProductdiscountPage,
      cssClass: 'DeliveryDayPreference-component-css',
      mode: 'ios',
      componentProps: {
        product: item,
        from: this.from,
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    console.log(data);
    if (data && data !== 'back') {
      this.updateProduct(data);
      if (next) {
        this.openOrderQuentity(item, next);
      }
    } else {
      this.openGradingPopUp(item, next);
    }
  }

  /**
   * @function for adding order quantity to the product 
   */

  async openOrderQuentity(item, next = false) {
    console.log('my cat me console hua')
    const model = await this.modalCtrl.create({
      component: OrderQuantityPage,
      cssClass: 'DeliveryDayPreference-component-css min-height',
      mode: 'ios',
      componentProps: {
        product: item,
        from: this.from,
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    console.log(data);
    if (data && data !== 'back') {
      this.updateProduct(data);
    } else {
      this.openDiscountPopUp(item, next);
    }
  }

  filter_product_array(product_array, productStatus) {
    // console.log(product_array);
    return product_array.filter(product => product.status.trim().toLowerCase() === productStatus)
  }
}