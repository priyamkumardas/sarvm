import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  subscripInfo: any;
  invoiceNo: any;
  @Input() isModal: boolean;

  constructor(private router: Router,
    private ngLocation: Location,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    public commonService: CommonService,) {
    this.route.params.subscribe((res) => {
      this.subscripInfo = JSON.parse(atob(res.info));
      console.log(this.subscripInfo);
    });
  }

  ngOnInit() {

  }

  onBack() {
    this.router.navigate(['/subscription']);
  }

}
