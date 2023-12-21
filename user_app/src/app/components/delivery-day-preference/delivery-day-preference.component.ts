import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-delivery-day-preference',
  templateUrl: './delivery-day-preference.component.html',
  styleUrls: ['./delivery-day-preference.component.scss'],
})
export class DeliveryDayPreferenceComponent implements OnInit {
  @Input() scheduleTime = false;
  openCalendar;
  todayDate: String = new Date().toISOString();
  selectedDate:any;
  dateSelected;
  data = [
    new Date(new Date().getTime() + 19800000).toJSON().split('T')[0],
    new Date(new Date().getTime() + 19800000 + 86400000).toJSON().split('T')[0],
    new Date(new Date().getTime() + 19800000 + (86400000 * 2)).toJSON().split('T')[0],
    new Date(new Date().getTime() + 19800000 + (86400000 * 3)).toJSON().split('T')[0],
    new Date(new Date().getTime() + 19800000 + (86400000 * 4)).toJSON().split('T')[0],
    // new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
    // new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()+1),
    // new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()+2),
    // new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()+3),
    // new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()+5),
  ];

  constructor(private modalCtrl: ModalController) {
    this.openCalendar = 1;
  }

  ngOnInit() {
    console.log(new Date().toLocaleString().split(',')[0].split('/').reverse().join('-'),new Date().getFullYear()+'-'+(new Date().getMonth()<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1)+'-'+new Date().getDate())
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  hide() {
    this.openCalendar = 0;
  }

  setDeliveryDate(date: any): void {
    this.setDeliverySlot(date);
  }

  setDeliverySlot(date): void {
    console.log(date)
    this.modalCtrl.dismiss({
      date: date
    });
  }
}
