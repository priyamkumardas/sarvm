import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PhotoService } from 'src/app/lib/services/photo.service';
import { EmployeeService } from 'src/app/lib/services/employee.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { EmployeeRoleFilterComponent } from '../employee-role-filter/employee-role-filter.component';
import { EmployeeOrgFilterComponent } from '../employee-org-filter/employee-org-filter.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { CommonService } from 'src/app/lib/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeListPage } from '../employee-list/employee-list.page';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { DatePipe } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { ProfilePhotoOptionComponent } from 'src/app/components/profile-photo-option/profile-photo-option.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  src = 'https://www.holidify.com/images/bgImages/AHMEDABAD.jpg';

  employeeProfileURL:string;

  segment;
  categories = [
    'seosonal',
    'ripen',
    'tropical',
    'grimm',
    'seosonal',
    'ripen',
    'tropical',
    'grimm',
    'ripen',
    'tropical',
    'grimm',
  ];
  form = {
    employeeId:'',
    managerId:'',
    mobileNumber:'',
    role:'',
    fullName:'',
    dateofJoining:'1-11-11',
    profilePhotoURL:'',
    email: '',
    pincode: '',
    org_id: null,
    organization:null
  };
  customAlertOptions = {
    header: 'Manager Id',
    translucent: true,
  };
  id:any;
  date: any;
  myOrg: any;
  employees = JSON.parse(localStorage.getItem('employees'));
  disablePopup: boolean;
  constructor(private actionSheetController:ActionSheetController,private datePipe:DatePipe,private file: File,private transfer: FileTransfer,private aroute:ActivatedRoute, private photoService: PhotoService, private commonService:CommonService, private empService:EmployeeService, private modalCtrl:ModalController) {}

  ngOnInit() {
    this.segment = '0';
    this.aroute.params.subscribe(res => {
      this.id = res.id;
      if(res.id && res.id != '0'){
        this.getEmployee();
      }
    })
    this.empService.getOrganization().subscribe(org => { 
      this.myOrg = org['data']
      if(this.id && this.id == '0'){
        this.form.organization = this.myOrg[0].name;
        this.form.org_id = this.myOrg[0]._id;
      }
    })
  }

  noWhitespaceValidator(event) {
    const isWhitespace = (event.value || '').trim().length === 0;
    if(isWhitespace){
      event.value='';
    }
    //const isValid = !isWhitespace;
    //return isValid ? null : { 'whitespace': true };
}

  addEmployee(){
    this.commonService.presentLoading();
    this.empService.addEmployee(this.form).subscribe((res: any) => {
      if (res.success) {
        this.commonService.success('Employee Added !!')
        history.back();
        this.commonService.dissmiss_loading();
      } else if (res && res.error) {
        this.commonService.danger(res.error.message);
        this.commonService.dissmiss_loading();
      }
    }, err => {
      this.commonService.danger(err.error.error.message?err.error.error.message:'Something Went Wrong !!')
      this.commonService.dissmiss_loading();
    })
   
  }

  editEmployee(){
    this.commonService.presentLoading();
    this.empService.editEmployee(this.id, this.form).subscribe(res => {
      this.commonService.success('Employee Updated !!')
      this.commonService.dissmiss_loading();
      history.back();
    },err=>{
      this.commonService.danger(err.error.error.message?err.error.error.message:'Something Went Wrong !!')
      this.commonService.dissmiss_loading();
    })
    
  }

  async openFilterModal(){
    this.disablePopup = true
    const model = await this.modalCtrl.create({
      component: EmployeeRoleFilterComponent,
      cssClass: 'bottomModal',
      componentProps: {
        active: this.form.role,
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.disablePopup= false
    this.form.role = data;
  }

  async openFilterModalOrg() {
    this.disablePopup = true
    const model = await this.modalCtrl.create({
      component: EmployeeOrgFilterComponent,
      cssClass: 'bottomModal',
      componentProps: {
        active: this.form.org_id,
        myResponce : this.myOrg
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.disablePopup = false
    if(data){
      this.form.organization = data.name
      this.form.org_id = data.id;
    }else{
      this.form.organization = null;
      this.form.org_id = null;
    }
  }

  async openDateModal(){
    this.disablePopup= true
    const model = await this.modalCtrl.create({
      component: DatePickerComponent,
      cssClass: 'bottomModal',
      componentProps: {
        date: this.date,
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.disablePopup = false
    if (!data) {
      this.form.dateofJoining = '1-11-11';
    } else {
      this.date = data;
      this.form.dateofJoining = this.datePipe.transform(
        data.split('T')[0],
        'dd-MMM-yyyy'
      );
    }
  }

  async openManagerModal(){
    this.disablePopup = true
    const model = await this.modalCtrl.create({
      component: EmployeeListPage,
      cssClass: 'bottomModal',
      componentProps: {
        isModel: true,
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    this.disablePopup = false
    this.form.managerId = data;
  }

  getEmployee(){
    this.commonService.presentLoading();
    this.empService.getEmployee(this.id).subscribe(res => {
      this.form = {
        employeeId:res['data'].employeeId,
        managerId:res['data'].managerId,
        mobileNumber:res['data'].mobileNumber,
        role:res['data'].role,
        fullName:res['data'].fullName,
        dateofJoining:res['data'].dateofJoining,
        profilePhotoURL:res['data'].profilePhotoURL?res['data'].profilePhotoURL:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        email:res['data'].email,
        pincode:res['data'].pincode,
        org_id: res['data'].org_id,
        organization:res['data']?.organization
      };
      this.commonService.dissmiss_loading();
    },err=>{
      this.commonService.dissmiss_loading();
    })
   
  }

  async presentActionSheet() {
    const model = await this.modalCtrl.create({
      component: ProfilePhotoOptionComponent,
      cssClass: 'bottomModal',
    
    });
    await model.present();
    model.onDidDismiss().then(res => {
      console.log(res);
      if (res.role !== 'backdrop') {
        this.addPhotoToGallery(res.data);
      }
    });
  }

  addPhotoToGallery(source){
    this.empService.getImageUploadUrl().subscribe((res: any) => {
      this.commonService.presentLoading();
      if (res.data.uploadURL) {
        this.photoService.takePhoto(source).then((img) => {
          if (img?.success) {
            this.employeeProfileURL = Capacitor.convertFileSrc(img.mediaPath);
            let fileNm = img.mediaPath;
            const fileTransfer: FileTransferObject = this.transfer.create();

            let options: FileUploadOptions = {
              fileKey: 'file',
              fileName: fileNm.substring(fileNm.lastIndexOf('/') + 1),
              headers: { 'Content-Type': 'image/jpg' },
              chunkedMode: false,
              httpMethod: 'PUT',
              mimeType: "image/jpg",
            }
            fileTransfer.upload(img.mediaPath, res.data.uploadURL, options).then((data) => {
              if (data.responseCode == 200) {
                this.form.profilePhotoURL = res.data.url;
              }
            }, (err) => {
              this.commonService.dissmiss_loading();
              this.commonService.danger(JSON.stringify(err));
            });
          }
        });
      }
      this.commonService.dissmiss_loading();
    });  

  }

  segmentChanged(ev: any) {
  }

}
