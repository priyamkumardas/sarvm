import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
import { EmployeeService } from 'src/app/lib/services/employee.service';
import { EmployeeRoleFilterComponent } from '../employee-role-filter/employee-role-filter.component';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss'],
})
export class EmployeeListPage implements OnInit {	

  employees = [];
  filterData = [];
  searchData = [];
  roleFilter:string = '';
  searchInput:string = '';
  nameIncOrder:boolean = false;
  @Input() isModel:boolean;
  forModel:boolean;
  userData: any;
  flag: any;

  constructor(private router:Router,public modalCtrl: ModalController, private empService:EmployeeService, private commonservice:CommonService) { }

  ngOnInit() {
    this.userData = this.commonservice.userData;
    // console.log(this.userData)
    this.forModel = this.isModel?true:false;
    console.log('this.isModel',this.forModel)
   
  }

  ionViewWillEnter(){
    this.getAllEmployee();
  }

  getAllEmployee(){
    this.commonservice.presentLoading();
    this.empService.getAllEmployee(this.forModel).subscribe(res => {
      this.commonservice.dissmiss_loading();
      console.log(res)
      this.employees = res['data']?res['data']:[];
      this.employees.length == 0 ? this.flag = true : this.flag = false; 
      let empId = [];
      this.employees.map(res => {
        empId.push(res.employeeId);
      })
      localStorage.setItem('employees', JSON.stringify(empId))
      this.filterByName(false);
    },err=>{
      this.commonservice.presentToast('Something Went Wrong !!')
      this.commonservice.dissmiss_loading();
    })
    
  }

  async openFilterModal(){
    const model = await this.modalCtrl.create({
      component: EmployeeRoleFilterComponent,
      cssClass: 'OtpBox-AddMember',
      componentProps: {
        active: this.roleFilter,
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.filterByRole(data);
  }

  filterByName(order){
    this.nameIncOrder = order;
    let data = this.searchInput?this.searchData:this.roleFilter?this.filterData:this.employees;
    data.sort(function (a, b) {
      return (a.fullName.toLowerCase()  >  b.fullName.toLowerCase()?1:((a.fullName.toLowerCase() < b.fullName.toLowerCase()) ? -1 : 0));
    });
    if(order){
      data.reverse();
    }
    this.searchInput?this.searchData = data:this.roleFilter?this.filterData = data:this.employees = data;
  }

  filterByRole(role){
    this.roleFilter = role;
    // console.log(this.roleFilter)
    this.filterData = this.employees.filter(data => data.role == this.roleFilter);
  }

  redirectToProfile(id){
     this.router.navigate(['/employee-profile',id]);
  }

  searchEmp(){
    // console.log(this.searchInput);
    let tempdata = this.roleFilter?this.filterData:this.employees;
    if(this.searchInput){
      this.forModel = false;
      if(isNaN(parseInt(this.searchInput))){
        this.searchData = tempdata.filter(res=>res.fullName.toLowerCase().includes(this.searchInput.toLowerCase()))
      }else{
        this.searchData = tempdata.filter(res=>res.mobileNumber.includes(this.searchInput))
      }
      // console.log(this.searchData)
    }else{
      this.forModel = true;
      this.searchData = [];
    }
  }

}
