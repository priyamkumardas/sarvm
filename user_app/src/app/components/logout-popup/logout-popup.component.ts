import { Component, OnInit, Input } from '@angular/core';
import { ModalController,IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-logout-popup',
  templateUrl: './logout-popup.component.html',
  styleUrls: ['./logout-popup.component.scss'],
})
export class LogoutPopupComponent implements OnInit {

  @Input() header:string;
  @Input() subHeader:string;
  @Input() forBack:string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  viewYes() {
    this.modalCtrl.dismiss({"status":"Yes"});
  }

  viewNo() {
    this.modalCtrl.dismiss({"status":"No"});
    }
}

