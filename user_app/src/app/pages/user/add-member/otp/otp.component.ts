import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PipeModule } from 'src/app/lib/pipe/pipes.module';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {

  constructor(private modalCtrl : ModalController) { }
  cancel() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}

}
