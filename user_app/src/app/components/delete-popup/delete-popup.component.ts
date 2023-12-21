import { Component, OnInit } from '@angular/core';
import { ModalController,IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss'],
})
export class DeletePopupComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  viewYes() {
    this.modalCtrl.dismiss({"status":"Yes"});
  }

  viewNo() {
    this.modalCtrl.dismiss({"status":"No"});
    }
}
