import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-employee-role-filter',
  templateUrl: './employee-role-filter.component.html',
  styleUrls: ['./employee-role-filter.component.scss'],
})
export class EmployeeRoleFilterComponent implements OnInit {

  @Input() active:string;

  constructor(public modelCtrl:ModalController) { }

  ngOnInit() {
    console.log(this.active == 'State Head')
  }

}
