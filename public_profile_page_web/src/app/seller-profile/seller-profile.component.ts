import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements OnInit {

  retailerData: any;
  lat: any;
  long: any;
  created_at: any;
  mobileNumber: any;
  retailerID: any;
  shopQR = ''
  pageDes = 'Mission is to Reduce the Food Wastage across India';
  shopDetails: any
  base64Url: any
  responseSuccess: any
  @ViewChild('content') content: any;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private meta: Meta,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.route.paramMap.subscribe((params) => {
      // console.log(params.get('username'));
      console.log(params);
      this.retailerID = params.get('id');
      console.log(this.retailerID);
      this.shopQR = window.location.href;
      console.log(this.shopQR);
    });
    this.addTag();
  }

  ngAfterViewInit() {
    this.openModal();
  }

  async openModal() {
    this.modalService.open(this.content, { centered: true });
  }

  addTag() {
    // for other
    this.meta.addTag({ property: 'og:type', content: "website" });
    this.meta.addTag({ property: 'og:url', content: "https://sarvm.ai/" });
    this.meta.addTag({ property: 'og:title', content: "Digitalizing the Food Chain By SarvM.ai" });
    this.meta.addTag({ property: 'og:description', content: `SarvM.AI is the business place for perishable and non-perishable items.${this.pageDes}` });
    this.meta.addTag({ property: 'og:image', content: "https://sarvm.ai/images/webmetapreview.png" });

    // for twitter
    this.meta.addTag({ property: 'twitter:card', content: "summary_large_image" });
    this.meta.addTag({ property: 'twitter:url', content: "https://sarvm.ai/" });
    this.meta.addTag({ property: 'twitter:title', content: "Digitalizing the Food Chain By SarvM.ai" });
    this.meta.addTag({ property: 'twitter:description', content: `SarvM.AI is the business place for perishable and non-perishable items.${this.pageDes}` });
    this.meta.addTag({ property: 'twitter:image', content: "https://sarvm.ai/images/webmetapreview.png" });
    // this.meta.updateTag({ property: 'og:description', content: ` We connect millions of buyers and ${this.pageTitle}` });
  }

  ngOnInit(): void {
    this.commonService.getStoreDetails(this.retailerID).subscribe((res: any) => {
      console.log(res);
      this.retailerData = res;
      this.lat = res?.shop.location.lat;
      this.long = res?.shop.location.lon;
      this.mobileNumber = res?.retailer.mobileNumber;
      this.created_at = this.retailerData?.shop[0]?.created_at.substr(0, 10);
      console.log(this.lat, this.long, this.mobileNumber);
    }, err => {
      console.log(err)
       this.router.navigate(['/error-page']);
    })
  }

  openShopAddress(lat:any,lon:any){
    let url = `https://maps.google.com/?q=${lat},${lon}`
    window.open(url, "_blank");
  }
}
