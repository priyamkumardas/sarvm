import { Component, OnInit } from '@angular/core';
import { ModalController,IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-save-changes',
  templateUrl: './save-changes.component.html',
  styleUrls: ['./save-changes.component.scss'],
})
export class SaveChangesComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  viewYes() {
    this.modalCtrl.dismiss({"status":"Yes"});
  }

  viewNo() {
    this.modalCtrl.dismiss({"status":"No"});
    }
}
