import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {

  @Input() date:any;
  minDate:any;
  maxDate:any;

  constructor(public modelCtrl:ModalController) { }

  ngOnInit() {
    this.minDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
    this.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
    console.log(this.maxDate)
    console.log(this.minDate)
  }

}
