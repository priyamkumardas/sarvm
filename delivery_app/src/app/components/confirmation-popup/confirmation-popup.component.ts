import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController,IonicModule } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss'],
})
export class ConfirmationPopupComponent implements OnInit {

  @Input() confirmPopupStatus: any;

  constructor(private modalCtrl: ModalController,
    public commonService: CommonService,
    private router: Router) { }

  ngOnInit() {}

  // viewYes() {
  //   if(this.confirmPopupStatus == 'Log Out') {
  //     this.logOut();
  //   } else {
  //     this.deActivate();
  //   }
  //   this.viewNo();
  // }

  viewYes() {
    this.modalCtrl.dismiss({"status":"Yes", confirmPopupStatus : this.confirmPopupStatus});
  }

  viewNo() {
    this.modalCtrl.dismiss({"status":"No"});
  }

  // logOut() {
  //   localStorage.clear();
  //   this.router.navigate(['/login']);
  // }

  // deActivate() {
  //   this.modalCtrl.dismiss();
  // }

}
