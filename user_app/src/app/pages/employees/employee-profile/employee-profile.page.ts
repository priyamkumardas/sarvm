import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/lib/services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.page.html',
  styleUrls: ['./employee-profile.page.scss'],
})
export class EmployeeProfilePage implements OnInit {
  id: any;
  status: any;
  empData: any;
  userData: any;
  constructor(private empService: EmployeeService, private aroute: ActivatedRoute, private commonService: CommonService, private alertCtrl: AlertController,) {
  }

  ngOnInit() {
    this.userData = this.commonService.userData;
    // console.log(this.userData);
  }

  

  ionViewWillEnter() {
    this.aroute.params.subscribe(res => {
      this.id = res.id;
    });
    this.getEmployee();
  }

  getEmployee() {
    this.commonService.presentLoading();
    this.empService.getEmployee(this.id).subscribe(res => {
      this.empData = res['data'];
      this.status = this.empData.status;
      this.commonService.dissmiss_loading();
     }, err => {
      this.commonService.dissmiss_loading();
      this.commonService.danger(err.error.error.message)
    })
    
  }
  editEmployeeStatus(){
    this.commonService.customeAlert(`${this.empData.status ? 'Deactivate' : 'Activate'}`,'Are you Sure?',()=>{this.empService.editEmployeeStatus(this.id, { status: !this.empData.status }).subscribe(res => {
      this.commonService.dissmiss_loading();
      this.empData.status = !this.empData.status;
      this.commonService.success('Employee Status Updated !!');
    }, err => {
      this.commonService.dissmiss_loading();
      this.commonService.danger('Something Went Wrong !!')
    })
  },() => { }
);
  }
 
  deleteAlert() {
    //this.commonService.alert('ALERT !!','Are you sure you want to delete.','Ok','Cancel',()=>this.deleteEmployee(),() => console.log('cancel pressed'));
    this.commonService.featureNotAvailable()
  }

  deleteEmployee() {
    this.commonService.presentLoading();
    this.empService.deleteEmployee(this.id).subscribe(res => {
      this.commonService.dissmiss_loading()
      this.empData.status = this.status;
      this.commonService.success('Employee Deleted !!')
      history.back();
    }, err => {
      this.commonService.dissmiss_loading()
      this.commonService.danger('Something Went Wrong !!')

    })
  }

  approveEmployee(){
    this.commonService.presentLoading();
    this.empService.editEmployeeStatus(this.id, { status: !this.empData.status }).subscribe(res => {
      this.commonService.dissmiss_loading();
      this.empData.status == false ? this.empData.status == true : this.empData.status == this.empData.status;
      this.commonService.success('Employee Approved !!')
    },err=>{
      this.commonService.dissmiss_loading();
      this.commonService.danger('Something Went Wrong !!')
    })
  }
}
