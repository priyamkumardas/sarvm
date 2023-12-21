import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  @ViewChild('content') content: any;
  pageDes = 'Mission is to Reduce the Food Wastage across India';
  constructor( private modalService: NgbModal, private meta: Meta,) {
    this.addTag();
   }

  addTag() {
    // for other
    this.meta.addTag({ property: 'og:type', content: "website" });
    this.meta.addTag({ property: 'og:url', content: "https://sarvm.ai/" });
    this.meta.addTag({ property: 'og:title', content: "Digitalizing the Food Chain By SarvM.ai" });
    this.meta.addTag({ property: 'og:description', content: `SarvM.AI is the business place for perishable and non-perishable items.${this.pageDes}` });
    this.meta.addTag({ property: 'og:image', content: "https://sarvm.ai/images/sarvmallplatform.png" });

    // for twitter
    this.meta.addTag({ property: 'twitter:card', content: "summary_large_image" });
    this.meta.addTag({ property: 'twitter:url', content: "https://sarvm.ai/" });
    this.meta.addTag({ property: 'twitter:title', content: "Digitalizing the Food Chain By SarvM.ai" });
    this.meta.addTag({ property: 'twitter:description', content: `SarvM.AI is the business place for perishable and non-perishable items.${this.pageDes}` });
    this.meta.addTag({ property: 'twitter:image', content: "https://sarvm.ai/images/sarvmallplatform.png" });
    // this.meta.updateTag({ property: 'og:description', content: ` We connect millions of buyers and ${this.pageTitle}` });
  }

  ngOnInit(): void {
  }

  // ngAfterViewInit() {
  //   this.openModal();
  // }

  async openModal() {


    this.modalService.open(this.content, { centered: true });
  }
}
