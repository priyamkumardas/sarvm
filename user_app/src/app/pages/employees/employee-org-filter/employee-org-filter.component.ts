import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmployeeService } from 'src/app/lib/services/employee.service';

@Component({
  selector: 'app-employee-org-filter',
  templateUrl: './employee-org-filter.component.html',
  styleUrls: ['./employee-org-filter.component.scss'],
})
export class EmployeeOrgFilterComponent implements OnInit {
  @Input() active: string;
  @Input() myResponce: any;
  organizationId: any;
 

  constructor(public modelCtrl: ModalController,private empService:EmployeeService) { }

  ngOnInit() {
    console.log(this.active == 'Sarvm')
    
  }
 

}
