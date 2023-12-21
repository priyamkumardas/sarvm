import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatalogService } from 'src/app/lib/services/catalog.service';

@Component({
  selector: 'app-catalog-form',
  templateUrl: './catalog-form.component.html',
  styleUrls: ['./catalog-form.component.scss']
})
export class CatalogFormComponent implements OnInit {
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
  constructor(private router: Router,
    private catalogService:CatalogService,
    private route: ActivatedRoute,
    private fb:FormBuilder) { }

  ngOnInit() {
    this.getPresignedUrlcategory();

    this.data = new FormGroup({

      image:new FormControl('' , [Validators.required]),
      name:new FormControl('',[Validators.required]),
      id:new FormControl('',[Validators.required]),
      region:new FormControl('',[Validators.required]),
      isParent:new FormControl('',[Validators.required]),
      parent_id:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      hsn:new FormControl('',[Validators.required]),
      tax_status:new FormControl('',[Validators.required]),
    })
    this.subscription = this.data.get('isParent').valueChanges.subscribe((val: string) => {
      this.showAdditionalFields = val === 'true';
    });
    this.route.paramMap.subscribe((params: { get: (arg0: string) => string | null; }) => {
      // console.log(params.get('username'));
      console.log(params);
      // this.shop_id = params.get('id');
      // console.log(this.shop_id);
      this.catalog_id=params.get('id');

      this.onCallData(this.catalog_id);
    });
  this.onParentDataCall();


}
onParentDataCall()
{
  this.catalogService.onParentsCall().subscribe((res:any)=>{
    console.log(res);
    var tmp=Object.values(res);
    this.parentList=tmp[1];
    console.log(this.parentList)
  })
}
updateCatalogData(id:any)
{
  if(this.data.image==null)
  this.data.image=""
  if(this.data.parent_id==null)
  this.data.parent_id=""
  console.log(this.data.value);
  this.catalogService.updateCatalogById(id, this.data.getRawValue()).subscribe();
  this.router.navigate(['/catalog-list']);
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
    this.catalogService.getCatalogById(id).subscribe((res:any)=>{
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

 onCreateCatalog(data:any)
 {
   console.log('Catalog:',data);
   if(data.image==null)
   data.image="";
   if(data.id==null)
   data.id="";
   if(data.parent_id==null)
   data.parent_id="";
   console.log(data.image);
   this.catalogService.onCreateCatalog(data).subscribe((res:any)=>{
   console.log('catalog:',res);
   this.router.navigate(['/catalog-list']);
      },
      (err: any)=>{

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
}
