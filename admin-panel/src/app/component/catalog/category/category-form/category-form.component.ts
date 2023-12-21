import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogService } from 'src/app/lib/services/catalog.service';
import { Subscription } from 'rxjs';
// import { TemporaryService } from 'src/app/lib/services/temporary.service';
// import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { HttpClient } from '@angular/common/http';
import { selectedItems } from 'src/app/config/constants';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})

export class CategoryFormComponent implements OnInit {
  //tree code

dropdownEnabled = true;
 

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
  url: any;
	msg = "";
  selectedFile: any;
  data:any
  event:any;
  file:any;
  imageUrl='../../../../assets/vegetablesImage/vegetables.png';
  presignedUrl = '';
  remoteimageUrl = '';
  catalog_id!: string | null;
  categoryData: any;
  subscription?: Subscription;
  toggleButton: boolean=false;
  parentList:any;
  showAdditionalFields?: boolean=false;
  showItem1:boolean=false;
  showItem2:boolean=false;
  showItem3:any;
  showSubMenu = false;
  selectedItems:any=[];
  // items: any;
  items1: any ;
  data1:any;

  catalog:any;
  categories:any;
  subCatagoriers:any;
  product:any;
  checkedCatalog:any;
  checkedCategory:any;
  checkedSubCategory:any;
 visibleLevel1:number=-1;
 visibleLevel2:number=-1;
 visibleLevel3:number=-1;
dataTreeUrl:any;

 constructor(private router: Router,
  private catalogService:CatalogService,
  private route: ActivatedRoute,
  private fb:FormBuilder,
  private http:HttpClient) {
    this.catalogService.onGetDataTree().subscribe((res:any)=>{
      console.log(res);
         this.dataTreeUrl=res.data;
         console.log(this.dataTreeUrl);
         this.getdata()
      })

  }

ngOnInit() {
  this.getPresignedUrlcategory();
//tree code

// this.getCategoryDataTree();
//tree code
// console.log(this.items)
  this.data = new FormGroup({

    image:new FormControl('' , [Validators.required]),
    name:new FormControl('',[Validators.required]),
    id:new FormControl('',[Validators.required]),
    region:new FormControl('',[Validators.required]),
    isParent:new FormControl('',[Validators.required]),
    parent_id:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    hsn:new FormControl('',[Validators.required]),
    tax_status:new FormControl('',[Validators.required]),
  })
  this.subscription = this.data.get('isParent').valueChanges.subscribe((val: string) => {
    this.showAdditionalFields = val === 'true';
  });
  this.route.paramMap.subscribe((params) => {
    // console.log(params.get('username'));
    console.log(params);
    // this.shop_id = params.get('id');
    // console.log(this.shop_id);
    this.catalog_id=params.get('id');
    this.onCallData(this.catalog_id);
    // debugger;
  });
this.onParentDataCall();


}

  getdata(){
    console.log(this.dataTreeUrl);
    this.http.get<any>('./assets/tmpJson/categoryData1.json')
    .subscribe(response => {
      this.catalog = response.catalog;
      console.log(this.catalog);
    });

    this.http.get<any>(`${this.dataTreeUrl}`)
    .subscribe(response => {
     console.log(response);
    });
  }


  getId(val:any,i:any){
    //find Index
    this.subCatagoriers=[];
    this.product=[];
    this.checkedCatalog=val;
    var eleId="down"+i;
    if (this.visibleLevel1 === i) {
      this.visibleLevel1 = -1;
      this.categories=[];
      return;
    } else {
      this.visibleLevel1 = i;
      this.visibleLevel3=-1;
      this.visibleLevel2=-1;
    }
    this.catalog.forEach((element:any) => {
    if(element.name==val)
    {
      this.selectedItems.push(element);
      console.log(this.selectedItems);
    }

    });
    this.categories = this.catalog[i].categories;
  }

  getsubId(val:any,i:any){
    this.checkedCategory=val;
    this.product=[];
    if (this.visibleLevel2 === i) {
      this.visibleLevel2 = -1;
      this.subCatagoriers=[];
      return;
    } else {
      this.visibleLevel2 = i;
      this.visibleLevel3=-1;
    }
    this.categories.forEach((element:any) => {
      if(element.name==val)
      {
        this.selectedItems.push(element);
        console.log(this.selectedItems);
      }

      });
    this.subCatagoriers = this.categories[i].categories;
  }

  getproduct(val:any,i:any){
    this.checkedSubCategory=val;
    if (this.visibleLevel3 === i) {
      this.visibleLevel3 = -1;
      this.product=[];
      return;
    } else {
      this.visibleLevel3 = i;
    }
    this.categories.forEach((element:any) => {
      if(element.name==val)
      {
        this.selectedItems.push(element);
        console.log(this.selectedItems);
      }

      });
    this.product = this.subCatagoriers[i].products;
  }





// getCategoryDataTree()
// {
//   this.tempService.getCategoryData().subscribe((res:any)=>{

//     this.items = this.tempService.getBooks(res);
//     console.log(this.items);
//   })
// }
onParentDataCall()
{
  this.catalogService.onParentsCall().subscribe((res:any)=>{
    console.log(res);
    var tmp=Object.values(res);
    this.parentList=tmp[1];
    console.log(this.parentList)
  })
}
updateCategoryData(id:any)
{
  if(this.data.image==null)
  this.data.image=""
  if(this.data.parent_id==null)
  this.data.parent_id=""
  console.log(this.data.value);
  this.catalogService.updateCategoryById(id, this.data.getRawValue()).subscribe();
  this.router.navigate(['/category-list']);
}
  onCallData(id:any)
  {
    if(id==='0')
   {
   this.data.reset();
   this.toggleButton=false;
  //  this.showAdditionalFields=true;
  //  document.getElementById("parent1").checked = true;
     return;
    }

    this.toggleButton=true;
    this.catalogService.getCategoryById(id).subscribe((res:any)=>{
      // console.log(res);
      var data=Object.values(res);
      this.categoryData=data[1];
      console.log(this.categoryData);
      // this.data?.patchValue({
      //   ...this.categoryData,
      // });
      this.data.patchValue({
     name:this.categoryData.name,
     id:this.categoryData.categoryId,
     isParent:this.categoryData.isParent,
     parent_id:this.categoryData.parentId,
     region:this.categoryData.region,
     hsn:this.categoryData.hsn,
     tax_status:this.categoryData.tax_status,
    //  image:this.categoryData.image,
     description:this.categoryData.description
      });
      if(this.categoryData.parent_id!="")
      {
        this.data.get('parent_id').setValue(this.categoryData.parent_id);
      }
      var taxRadio=this.categoryData.tax_status;
      var parentRadio=this.categoryData.isParent;
      console.log(parentRadio)
      if(parentRadio==true)
      {
        this.data.get('isParent').patchValue('true');
      }
      else
      this.data.get('isParent').patchValue('false');
      if(taxRadio=="TAXABLE")
      {
        this.data.get('tax_status').patchValue('TAXABLE');
      }
      else
      this.data.get('tax_status').patchValue('NON_TAXABLE');

    })
    // this.router.navigate(['/category-list']);
  }
   getPresignedUrlcategory(){
    this.catalogService.getPresignedUrlcategory().subscribe((res:any)=>{
    console.log(res);
    this.presignedUrl = res.data.preSignedUrl
    this.remoteimageUrl = res.data.url
      })
 }

 onCreateCategory(data:any){
   console.log('Category:',data);
   if(data.image==null)
   data.image="";
   if(data.id==null)
   data.id="";
   if(data.parent_id==null)
   data.parent_id="";
   console.log(data.image);
   this.catalogService.onCreateCategory(data).subscribe((res:any)=>{
   console.log('category:',res);
   this.router.navigate(['/category-list']);
      },
      (err)=>{

      }
      )

      const categoryObj={
        name:data.name,
        description:data.description
      }
      // this.catalogService.addCategory(categoryObj).subscribe((res:any)=>{
      //   alert("Category Added in Database");
      //   this.router.navigate(['./category-list'])
      //   console.log(res);
      // })

 }
  onFileChanged(event:any) {
   console.log(event);
   this.selectedFile =event.target.files[0]
   if(!event.target.files[0] || event.target.files[0].length == 0) {
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
 console.log(event.target.files[0]);
 console.log(this.presignedUrl);
   this.catalogService.uploadCategory(event.target.files[0],this.presignedUrl).subscribe((res:any)=>{
   console.log(res);
      })

 reader.onload = (_data) => {
   this.msg = "";
   this.url = reader.result;
  }
 }

 getValueParentId(e:any)
 {
   console.log(e);
   console.log(this.data.get('parent_id'));
 }
//tree code
onFilterChange(value: string): void {
  console.log('filter:', value);
}
 //tree code
}


