import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';


@Component({
  selector: 'app-profile-photo-option',
  templateUrl: './profile-photo-option.component.html',
  styleUrls: ['./profile-photo-option.component.scss'],
})
export class ProfilePhotoOptionComponent implements OnInit {

  constructor( public modelCtrl: ModalController,
    public commonService: CommonService,) { }

  ngOnInit() {}

  closeModal() {
    this.modelCtrl.dismiss(null, 'backdrop');
  }
  startCapture(type) {
    this.modelCtrl.dismiss(type, 'select');
  }

}
