import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
})
export class DateTimePickerComponent implements OnInit {

  @ViewChild(IonDatetime) datetime: IonDatetime;
  @Input() type = 'date';
  @Input() contenerType = 'date';
  @Input() min;
  @Input() max;
  @Input() date_format;
  @Input() isDisabled: boolean = false;  
  //@Input() value = new Date(Date.now()).toISOString();
  @Input() value;
  @Output() datePickerValue: EventEmitter<any> = new EventEmitter<any>();
  dateValue = '';
  today;
  dateSelected;
  constructor() { }

  ngOnInit() {
    //console.log(this.date_format);
    this.value = this.getCurrentDate(); 
    //this.min = this.getCurrentDate();

    this.dateSelected = 0;
    this.today = this.getCurrentDate();
  }

  getCurrentDate(format: string = 'YYYY-MM-DD') {
    if (this.date_format) {
      return moment().format(this.date_format);
    } else {
      return moment().format(format);
    }
  }

  /*  confirm() {
     this.datetime.confirm(true);
   }
   
   reset() {
     this.datetime.cancel(true);
   } */

  change(value, type) {
    this.datePickerValue.emit({ "value": value, "type": type });
    //console.log(value)
    this.dateSelected = 1;
  }

  cancel() {
    this.datetime.cancel(true);
  }

  done(value, type) {
    this.datePickerValue.emit({ "value": value, "type": type });
    this.datetime.confirm(true);
  }
}
