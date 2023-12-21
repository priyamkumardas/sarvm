import { Component,  Input,OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-months-picker',
  templateUrl: './months-picker.component.html',
  styleUrls: ['./months-picker.component.scss'],
})
export class MonthsPickerComponent implements OnInit {
  @Input() month:any;
  @Input() active: string;
  minMonth:any;
  maxMonth:any;
  monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  Month: any;
  year: any = 2023;
  constructor(public modelCtrl:ModalController, private modalCtrl: ModalController) { }

  ngOnInit() {
    // this.minMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
    // this.maxMonth = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
    // console.log(this.minMonth)
    // console.log(this.maxMonth)
    // const thisMonth = monthNames[(new Date()).getMonth()];
    // const nextMonth = monthNames[(new Date()).getMonth() + 1];
    // console.log(thisMonth)
    // console.log(nextMonth)
  }
  clickhere(month){
    this.Month = month  
  }

  incDec(val){
    if(val == 'inc'){
      this.year++;
    }
    if(val == 'dec'){
      this.year--;
    }
  }

  apply(){
    return this.modalCtrl.dismiss(this.Month);
  }

}
