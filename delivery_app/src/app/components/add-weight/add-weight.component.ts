import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-add-weight',
  templateUrl: './add-weight.component.html',
  styleUrls: ['./add-weight.component.scss'],
})
export class AddWeightComponent implements OnInit {

  @Input() selectKM: any = 0;
  weightTo: number;
  weightFrom: number;
  weightCharge: number;

  constructor(private modalCtrl: ModalController,
    public commonService: CommonService,) { }

  ngOnInit() {
    //console.log(JSON.stringify(this.selectKM));
  }

  isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
    } else {
      return true;
    }
  }
  
  saveWeight() {
    if ((this.weightTo != 0 && this.weightFrom != 0 && this.weightCharge != 0) &&
    (this.weightTo != undefined && this.weightFrom != undefined && this.weightCharge != undefined) && 
    (this.weightTo != null && this.weightFrom != null && this.weightCharge != null)) {
      let weightItem = Object.assign({
        "wTo": this.weightTo,
        "wFrom": this.weightFrom,
        "wCharge": this.weightCharge,
      });
      this.modalCtrl.dismiss({ "weightItem": weightItem });
    } else {
      this.commonService.danger("Please input valid number");
    }
  }

  closeAddWeightModal() {
    this.modalCtrl.dismiss();
  }
}
