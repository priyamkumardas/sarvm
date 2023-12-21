import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-distance-covers',
  templateUrl: './distance-covers.component.html',
  styleUrls: ['./distance-covers.component.scss'],
})
export class DistanceCoversComponent implements OnInit {

  @Input() distanceTo: any = 0;
  @Input() distanceFrom: any = 0;
  @Input() lastDistance: any = 0;
  @Input() allDistance: any = [];  
  
  constructor(private modalCtrl: ModalController,
    public commonService: CommonService,) { }

  ngOnInit() {
    if(this.allDistance.length != 0){
      console.log(this.allDistance);
    }
  }

  increment() {
    this.distanceFrom += 1;
  }

  decrement() {
    if (this.distanceFrom > 1) {
      this.distanceFrom -= 1;
    } else {
      this.distanceFrom = 0;
    }
  }

  closeDistanceCoversModal() {
    this.modalCtrl.dismiss();
  }

  saveDistance(){
    if (this.distanceFrom !== 0 && this.distanceFrom !== null && this.distanceFrom !== undefined) {
      let checkDistance = this.allDistance.filter(item => item.from === this.distanceFrom);
      if(checkDistance.length === 0){
        this.modalCtrl.dismiss({
          distanceTo: this.distanceTo,
          distanceFrom: this.distanceFrom,
        });
      } else {
        this.commonService.danger("This distance is already there, select another");
        this.modalCtrl.dismiss();
      }     
    } else {
      this.commonService.danger("Please select valid distance");
      this.modalCtrl.dismiss();
    }
  }
}
