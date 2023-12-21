import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/lib/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-document',
  templateUrl: './vehicle-document.page.html',
  styleUrls: ['./vehicle-document.page.scss'],
})
export class VehicleDocumentPage implements OnInit {

  segment = 'drivingLicense';
  othersSegment = 'dewormingCertificate';
  isProfile: boolean = false;
  
  constructor(
    private router: Router,
    private ngLocation: Location,
    public commonService: CommonService,
    private platform: Platform
  ) { 
    this.isProfile = this.router.getCurrentNavigation()?.extras?.state?.isProfile;
    /* this.platform.backButton.subscribeWithPriority(101, () => {
      console.log('Handler was called!');
      this.onBack();
    }); */
  }

  ngOnInit() {
    this.commonService.currentSegmentStageStatus.subscribe((value) => {
      if(value != ""){
        if (value == 'drivingLicense') {
          this.segment = "rcLicense";
          return;
        }
       else if (value == 'rcLicense') {
          this.segment = "othersLicense";
          this.othersSegment = "dewormingCertificate";
          return;
        }
      } else {
        this.segment = "drivingLicense";
      }
    });
  }

  segmentChanged(e) {
    this.segment = e.detail.value;
    console.log(this.segment);
  }

  othersSegmentChanged(e) {
    this.othersSegment = e.detail.value;
    console.log(this.othersSegment);
  }

  onBack() {
    if (this.isProfile == true) {
      this.router.navigate(['/select-vehicle']);
    } else {
      this.router.navigate(['/kyc-status']);
    }
  }
  
}
