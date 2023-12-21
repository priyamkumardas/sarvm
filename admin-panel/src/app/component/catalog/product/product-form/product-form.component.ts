import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogService } from 'src/app/lib/services/catalog.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';




interface ids {
  catalog_id: string;
  category_mapping_id: string;
}
interface finalCat {
  cat: string;
  subcat: string;
  micro: string;
}
export enum allowedValues {
  veg = "Veg",
  nonVeg = "Non-Veg",
  jain = "Jain",
  egg = "Egg",
  notApplicable = "Not Applicable"
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  allowedValues = allowedValues;
  name = 'Angular Validate số âm Directive';
  body: any;
  selecteFile: any;
  preSignedimgUrl: any;
  // @ViewChild('productForm', { read: ElementRef, static:false }) productForm: ElementRef | undefined;
  productFormhide = false;
  productcatalogData: any;
  selectedCategoryName: string = "";
  isSubmitted = false;
  isShowimg = false;
  selectedSubCategoryName: string = "";
  selectedProductsName: string = "";
  //tree code
  dropdownEnabled = true;
  values: number[] = [];
  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];
  vegcategory: any;
  url: any;
  msg = "";
  selectedFile: any;
  data: any;
  productFormdata: any;
  event: any;
  file: any;
  imageUrl = `/assets/images/productdefaultimg.png`;
  presignedUrl = '';
  remoteimageUrl = '';
  product_id!: string | null;
  productData: any;
  toggleButton: boolean = false;

  showItem1: boolean = false;
  showItem2: boolean = false


  showItem3: any;
  showSubMenu = false;
  selectedItems: any = [];
  // items: any;
  items1: any;
  data1: any;
  catalog: any;
  catalogData: any;
  categories: any;
  subCatagoriers: any;
  product: any;
  checkedCatalog: any;
  checkedCategory: any;
  checkedSubCategory: any;
  visibleLevel1: number = -1;
  visibleLevel2: number = -1;
  visibleLevel3: number = -1;
  IsCategory: boolean = false;
  IsCategoryMapping: boolean = false;
  IsProducts: boolean = false;
  categoryData: any;

  //Dipali category mapping
  productid: any;
  productArray = new Array();


  mapCatagory = {
    catalogId: '',
    catalogMapping: ''
  }
  //Dipali category mapping
  selectedCat: any;
  selectedSubCat: any;
  updateMapping: any = [];
  imagePreview: any;

  // selecteFile:any; 
  constructor(public router: Router,
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.productcatalogData = this.route.snapshot.queryParamMap.get('productcatalogData')
  }

  ngOnInit() {
    if(this.route.snapshot.queryParamMap.get('productcatalogData')){
      let id = this.router.url.split('/') [this.router.url.split('/').length-1].split('?') [0];
      this.productcatalogData = {id:id};
    }
    // this.getPresignedUrl();
    this.productFormdata = new FormGroup({
      // id: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      place_of_origin: new FormControl('',),
      min_oq: new FormControl('', [Validators.required]),
      max_oq: new FormControl('',),
      min_ppo: new FormControl('',),
      weight_per_piece: new FormControl('',),
      rp: new FormControl('',),
      mrp: new FormControl('',),
      sp: new FormControl('',),
      return_option: new FormControl('',),
      veg: new FormControl('', [Validators.required]),
      tax_status: new FormControl('', [Validators.required]),
      hsn: new FormControl('',),
      tax: new FormControl('',),
      min_price: new FormControl('',),
      max_price: new FormControl('',),
    })
    this.route.paramMap.subscribe((params) => {
      this.product_id = params.get('id');
      this.onCallData(this.product_id);
      this.getdata();
    });
    //bydefault values by dropdown
    this.productFormdata.get('veg').value = "Veg";
    this.productFormdata.get('tax_status').value = "TAXABLE";
  }
  get errorControl() {
    return this.productFormdata.controls;
  }





  onCallData(id: any) {
    if (id === '0') {
      this.productFormdata.reset();
      this.toggleButton = false;
      return;
    }
    this.toggleButton = true;
    this.catalogService.getProductById(id).subscribe((res: any) => {
      var productFormdata = Object.values(res);
      res.data.mappings.map((mapping: any) => {
        this.updateMapping.push(mapping.category_mapping_id)
      })
      this.productData = productFormdata[1];
      this.productFormdata.patchValue({
        id: this.productData.id,
        image: this.productData.image,
        name: this.productData.name,
        description: this.productData.description,
        place_of_origin: this.productData.place_of_origin,
        min_oq: this.productData.min_oq,
        max_oq: this.productData.max_oq,
        min_ppo: this.productData.min_ppo,
        weight_per_piece: this.productData.weight_per_piece,
        rp: this.productData.rp,
        mrp: this.productData.mrp,
        sp: this.productData.sp,
        return_option: this.productData.return_option,
        veg: this.productData.veg,
        tax_status: this.productData.tax_status,
        hsn: this.productData.hsn,
        tax: this.productData.tax,
        min_price: this.productData.min_price,
        max_price: this.productData.max_price,
      });
    })
  }

  onSubmit() {
    if (this.productFormdata.invalid) {
      this.productFormdata(this.productFormdata);
      return;
    }
  }


  //catalog mapping structure tree
  getdata() {
    this.catalogService.getcatalogTreedata().subscribe((res: any) => {
      this.catalog = res.data[0].url;
      this.catalogService.getCatalog(this.catalog).subscribe((res: any) => {
        this.catalogData = res.catalog;
        if (this.product_id != '0') {
          this.catalogData.map((cat: any) => {
            cat.categories.map((subcat: any) => {
              subcat.categories.map((micro: any) => {
                if (this.updateMapping.includes(micro.id)) {
                  micro.checked = true;
                  cat.checked = true;
                  subcat.checked = true;
                }
              })
            })
          })
        }
      })
    })
  }

  //Category mapping
  getId(i: any, id: any) {
    this.productid = id;
    this.categories = this.catalogData[i].categories;
    this.subCatagoriers = [];
  }

  getsubId(i: any, id: any) {
    this.mapCatagory.catalogId = id;
    this.subCatagoriers = this.categories[i].categories;
  }

  getproduct(i: any, id: any) {
    this.productid = id;
    this.mapCatagory.catalogMapping = id;
    this.product = this.subCatagoriers[i].products;
  }

  deSelect(value: any, cName: string, flag: string) {
    if (flag === "CategorySection") {
      this.selectedCategoryName = cName;
    } else if (flag === "SubCategorySection") {
      this.selectedSubCategoryName = cName;
    } else {
      this.selectedProductsName = cName;
    }
  }

  updateProduct() {
    let category_products: ids[] = [];
    let finalCatList: finalCat[] = [];
    let catalog_id = '';
    this.catalogData.map((cat: any) => {
      if (cat.checked) {
        catalog_id = cat.id;
        cat.categories.map((subcat: any) => {
          if (subcat.checked) {
            subcat.categories.map((micro: any) => {
              if (micro.checked) {
                finalCatList.push({
                  cat: cat.name,
                  subcat: subcat.name,
                  micro: micro.name,
                });
                let ids: ids = {
                  catalog_id: catalog_id,
                  category_mapping_id: micro.id
                }
                category_products.push(ids);
              }
            })
          }
        })
      }
    })
    let text = 'Selected Category are:<br>';
    finalCatList.map((res: any, i: number) => {
      text = text + (i + 1) + '.&nbsp;' + res.cat + '>' + res.subcat + '>' + res.micro + '<br>';
    })
    Swal.fire({
      title: 'Are you sure want to add Selected Categories?',
      html: text,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.catalogService.addproductMapping(this.productcatalogData.id, { category_products: category_products }).subscribe((res: any) => {
          this.router.navigate(['./product-list'])
          this.productFormdata.reset();
          this.productcatalogData = null;
        })
      }
    })
  }




  updateProductData(id: any) {
    console.log(id);
    this.catalogService.uploadCatalog(this.presignedUrl, this.selecteFile).subscribe(res => {
      this.productFormdata.patchValue({
        image: this.remoteimageUrl
      });
    })
    this.productFormdata.value.image = this.remoteimageUrl;
    this.isSubmitted = true;
    if (this.productFormdata.value.image == null)
      this.productFormdata.value.image = ""
    if (this.productFormdata.value.hsn == null)
      this.productFormdata.value.hsn = "";
    if (this.productFormdata.value.place_of_origin == null || this.productFormdata.value.place_of_origin == "")
      this.productFormdata.value.place_of_origin = 0;
    if (this.productFormdata.value.return_option == null)
      this.productFormdata.value.return_option = "";
    if (this.productFormdata.value.tax_status == null)
      this.productFormdata.value.tax_status = "";

    if (this.productFormdata.value.description == null)
      this.productFormdata.value.description = "";
    if (this.productFormdata.value.min_oq == null)
      this.productFormdata.value.min_oq = "";
    if (this.productFormdata.value.max_oq == null || this.productFormdata.value.max_oq == "")
      this.productFormdata.value.max_oq = 0;
    if (this.productFormdata.value.min_ppo == null || this.productFormdata.value.min_ppo == "")
      this.productFormdata.value.min_ppo = 0;
    if (this.productFormdata.value.weight_per_piece == null || this.productFormdata.value.weight_per_piece == "")
      this.productFormdata.value.weight_per_piece = 0;
    if (this.productFormdata.value.rp == null || this.productFormdata.value.rp == "")
      this.productFormdata.value.rp = 0;
    if (this.productFormdata.value.mrp == null || this.productFormdata.value.mrp == "")
      this.productFormdata.value.mrp = 0;
    if (this.productFormdata.value.sp == null || this.productFormdata.value.sp == "")
      this.productFormdata.value.sp = 0;
    if (this.productFormdata.value.tax == null || this.productFormdata.value.tax == "")
      this.productFormdata.value.tax = 0;
    if (this.productFormdata.value.min_price == null || this.productFormdata.value.min_price == "")
      this.productFormdata.value.min_price = 0;
    if (this.productFormdata.value.max_price == null || this.productFormdata.value.max_price == "")
      this.productFormdata.value.max_price = 0;
    if (this.productFormdata.value.veg == "veg" || this.productFormdata.value.veg == "") {
      this.productFormdata.value.veg = "veg";
    } 


    console.log(this.productFormdata.value);
    this.catalogService.updateProductById(id, this.productFormdata.value).subscribe((res: any) => {
      let data = { id: id }
      this.productcatalogData = data;
    });
    // this.router.navigate(['./product-list'])
  }
  onFileSelected(event: any) {
    this.selecteFile = <File>event.target.files[0];
    this.getPresignedUrl(this.body);
  }
  getPresignedUrl(event: any) {
    this.catalogService.getPresignedUrl().subscribe((res: any) => {
      this.presignedUrl = res.data.preSignedUrl
      this.remoteimageUrl = res.data.url;
      this.selecteFile = <File>event.target.files[0];
      this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selecteFile))
      this.imageUrl = this.imagePreview;
      this.productFormdata.patchValue({
        image: null
      });

    })
  }

  fileReader(theEvent: any) {
    this.getPresignedUrl(theEvent);
  }
  async onUpload() {
    console.log('1. SelecteFile: ', this.selecteFile);

    this.body = { fileName: this.selectedFile.name }
    const preSignedimgUrl = await this.http.post(this.presignedUrl, this.body).toPromise();
    console.log('2. PreSignedURL: ', preSignedimgUrl)
    console.log('3. Upoloading File (binary) to S3')

    const upload = this.http.put(this.presignedUrl, this.selecteFile).toPromise();
    upload.then(data => {
      console.log('=> ', data)
    }).catch(err => console.log('error: ', err))

  }
  onCreateProduct(productFormdata: any) {
    this.catalogService.uploadCatalog(this.presignedUrl, this.selecteFile).subscribe(res => {
      console.log(res);
      this.productFormdata.patchValue({
        image: this.remoteimageUrl
      });
    })
    this.productFormdata.value.image = this.remoteimageUrl;
    this.isSubmitted = true;
    this.toggleButton = false;
    if (this.productFormdata.value.image == null)

      this.productFormdata.value.image = ""

    if (this.productFormdata.value.hsn == null)
      this.productFormdata.value.hsn = "";
    if (this.productFormdata.value.place_of_origin == null || this.productFormdata.value.place_of_origin == "")
      this.productFormdata.value.place_of_origin = 0;
    if (this.productFormdata.value.return_option == null)
      this.productFormdata.value.return_option = "";
    if (this.productFormdata.value.tax_status == null)
      this.productFormdata.value.tax_status = "";
    if (this.productFormdata.value.description == null)
      this.productFormdata.value.description = "";
    if (this.productFormdata.value.min_oq == null)
      this.productFormdata.value.min_oq = "";
    if (this.productFormdata.value.max_oq == null || this.productFormdata.value.max_oq == "")
      this.productFormdata.value.max_oq = 0;
    if (this.productFormdata.value.min_ppo == null || this.productFormdata.value.min_ppo == "")
      this.productFormdata.value.min_ppo = 0;
    if (this.productFormdata.value.weight_per_piece == null || this.productFormdata.value.weight_per_piece == "")
      this.productFormdata.value.weight_per_piece = 0;
    if (this.productFormdata.value.rp == null || this.productFormdata.value.rp == "")
      this.productFormdata.value.rp = 0;
    if (this.productFormdata.value.mrp == null || this.productFormdata.value.mrp == "")
      this.productFormdata.value.mrp = 0;
    if (this.productFormdata.value.sp == null || this.productFormdata.value.sp == "")
      this.productFormdata.value.sp = 0;
    if (this.productFormdata.value.tax == null || this.productFormdata.value.tax == "")
      this.productFormdata.value.tax = 0;
    if (this.productFormdata.value.min_price == null || this.productFormdata.value.min_price == "")
      this.productFormdata.value.min_price = 0;
    if (this.productFormdata.value.max_price == null || this.productFormdata.value.max_price == "")
      this.productFormdata.value.max_price = 0;
    if (this.productFormdata.value.veg == "veg" || this.productFormdata.value.veg == "") {
      this.productFormdata.value.veg = "veg";
    } 
    console.log(this.productFormdata.value);
    console.log(this.productFormdata.getRawValue());


    this.catalogService.addProduct(this.productFormdata.value).subscribe((res: any) => {
      // alert("Product Added in Database")
      this.productcatalogData = res.data;
      // this.router.navigate(['./product-list'])
    })
  }


  onFileChanged(event: any) {
    console.log(this.productFormdata.get('image').value)
    this.selectedFile = event.target.files[0]
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    this.catalogService.upload(event.target.files[0], this.presignedUrl).subscribe((res: any) => {
      this.productFormdata.patchValue({
        image: this.remoteimageUrl
      });
    })

    reader.onload = (_productFormdata) => {
      this.msg = "";
      this.url = reader.result;
    }
  }



  //tree code
  onFilterChange(value: string): void {
  }
  //tree code

  checkValue(event: any) {
    if (event.target.value < 0) {
      event.target.value = '';
      Swal.fire({
        title: 'You must enter a positive number. Please try again',
      })
    }
  }


}
