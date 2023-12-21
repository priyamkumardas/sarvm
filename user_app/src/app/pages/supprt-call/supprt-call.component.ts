import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-supprt-call',
  templateUrl: './supprt-call.component.html',
  styleUrls: ['./supprt-call.component.scss'],
})
export class SupprtCallComponent implements OnInit {
 @Input() order;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.order)
  }

  dismiss(): void {
    this.modalController.dismiss(
      'confirm'
    );
  }

 

}
