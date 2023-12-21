import { Component, Input, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, Platform, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { PhotoService } from 'src/app/lib/services/photo.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { Constants } from 'src/app/config/constants';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/lib/services/common.service';
//import { DateTimePickerComponent } from 'src/app/components/date-time-picker/date-time-picker.component';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { PackageListPage } from '../../payment/package-list/package-list.page';

@Component({
  selector: 'app-kyc-status',
  templateUrl: './kyc-status.page.html',
  styleUrls: ['./kyc-status.page.scss'],
})
export class KycStatusPage implements OnInit {
  kycForm: FormGroup;
  isSubmitted = false;

  segment = 'aadharCard';

  defaultDate = moment().format('YYYY-MM-DD');
  format = 'YYYY-MM-DD';

  aadharKYCURLs: any;
  panKYCURLs: any;
  policeKYCURLs: any;
  aadharDocIsUpload = false;
  panDocIsUpload = false;
  policeDocIsUpload = false;
  aadharImage = '';
  panImage = '';
  policeImage = '';

  kycUserInfo: any = [];
  stateList = environment.stateList;

  updateOrAdd: boolean = false;
  shopId: string;
  @Input() isModal: boolean;
  previousUrl: any = '';
  selectedVehicle: any;
  dateCondition = {
    max: '5050',
    min: ''
  };
  get errorControl() {
    return this.kycForm.controls;
  }
  aadharUploadPercent: number = 0;
  panUploadPercent: number = 0;
  policeUploadPercent: number = 0;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private camera: Camera,
    private ngLocation: Location,
    private transfer: FileTransfer,
    private photoService: PhotoService,
    public commonService: CommonService,
    private onboardService: OnboardService,
    private storageService: StorageService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private ngZone: NgZone
  ) {
    this.previousUrl = this.router.getCurrentNavigation().previousNavigation.finalUrl.toString();
    if(this.previousUrl == "/select-vehicle") {
      this.selectedVehicle = this.router.getCurrentNavigation().extras.state?.selectedVehicle;
    }
    /* this.platform.backButton.subscribeWithPriority(101, () => {
        this.onBack();
    }); */
  }

  ngOnInit() {
    this.kycForm = this.formBuilder.group({
      /* Aadhar Card */
      aadharCardNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      locality: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],

      /* Pan Card */
      panCardNumber: ['', [Validators.required]],

      /* Police Verification */
      policeStationName: [''],
      fullName: [''],
    });
  
    this.dateCondition.min = this.getCurrentDate();
    this.getKYCDetails();
  }
  getCurrentDate(format: string = 'YYYY-MM-DD') {
    return moment().format(format);
  }
  getKYCDetails() {
    // this.commonService.present();
    this.onboardService.getKYCDetail().subscribe((res: any) => {
      // this.commonService.dismiss();
      console.log('kycres', res);
      if (res.success && res.data.data != undefined) {
        this.kycForm.controls['aadharCardNumber'].setValue(res.data.data.aadharCardNumber ? res.data.data.aadharCardNumber?.substring(0,12) : '');
        this.kycForm.controls['name'].setValue(res.data.data.name);
        this.kycForm.controls['dob'].setValue(res.data.data.dob);
        this.kycForm.controls['locality'].setValue(res.data.data.locality);
        this.kycForm.controls['street'].setValue(res.data.data.street);
        this.kycForm.controls['city'].setValue(res.data.data.city);
        this.kycForm.controls['state'].setValue(res.data.data.state);
        this.kycForm.controls['pinCode'].setValue(res.data.data.pinCode);

        this.kycForm.controls['panCardNumber'].setValue(res.data.data.panCardNumber);

        this.kycForm.controls['policeStationName'].setValue(res.data.data.policeStationName);
        this.kycForm.controls['fullName'].setValue(res.data.data.fullName);


        if (res.data.data.aadharCardImage !== null) {
          this.aadharDocIsUpload = true;
          this.aadharImage = res.data.data.aadharCardImage;
        }
        if (res.data.data.panCardImage !== null) {
          this.panDocIsUpload = true;
          this.panImage = res.data.data.panCardImage;
        }
        if (res.data.data.policeVerificationForm !== null) {
          //this.policeDocIsUpload = true;
          this.policeImage = res.data.data.policeVerificationForm;
        }
        if ((res?.success && res?.data?.data != null) && (res?.data?.data?.userId != null && res?.data?.data?.userId != undefined)) {
          this.updateOrAdd = true;
          this.kycUserInfo = res?.data?.data;
          this.kycUserInfo.dob = moment(res?.data?.data.dob).format('YYYY-MM-DD');
          this.defaultDate = this.kycUserInfo.dob;
        } else {
          this.updateOrAdd = false;
        }
      }
    }, (error) => {
      //this.commonService.dismiss();
      this.commonService.danger(error);
    });
  }

  dateValid(input) {
    return moment(input).format('YYYY-MM-DD');
  }

  chooseImage(uploadId: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("documentType", uploadId);
    this.onboardService.getUploadKYCURL(queryParams).subscribe((verifidDoc: any) => {
      if (verifidDoc?.isKYCURLs?.success) {
        console.log(verifidDoc);
        if (verifidDoc?.isKYCURLs?.data && verifidDoc?.isKYCURLs?.data?.key && verifidDoc?.isKYCURLs?.data?.url) {
          if (uploadId === 'AADHAR') {
            this.aadharKYCURLs = verifidDoc.isKYCURLs.data;
            this.selectImage(uploadId);
          } else if (uploadId === 'PAN') {
            this.panKYCURLs = verifidDoc.isKYCURLs.data;
            this.selectImage(uploadId);
          } else {
            this.policeKYCURLs = verifidDoc.isKYCURLs.data;
            this.selectImage(uploadId);
          }
        } else {
          this.commonService.danger("some data are not valid!");
          return;
        }

      }
    }, (err) => {
      console.log(err);
      this.commonService.danger(JSON.stringify(err));
    });
  }

  /* async openDateSelectModal(selectType) {
    const modal = await this.modalCtrl.create({
      component: DateTimePickerComponent,
      cssClass: 'gst-modal-css',
      componentProps: { isModal: false, date_info: this.dateCondition, formType: selectType, date_format: "YYYY-MM-DD" }
    });
    await modal.present();
    await modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        console.log('Modal Data : ' + modelData);
        this.kycForm.get('dob').setValue(moment(modelData.data.value).format('YYYY-MM-DD'), {
          onlyself: true,
        });
      }
    });
  } */

  async openDateSelectModal(selectType) {
    console.log(selectType);
    if(selectType.value) {
      this.kycForm.get('dob').setValue(moment(selectType.value).format('YYYY-MM-DD'), {
        onlyself: true,
      });
    } else {
      this.kycForm.controls['dob'].setValue('');
    }
    

    /* const modal = await this.modalCtrl.create({
      component: DateTimePickerComponent,
      cssClass: 'gst-modal-css',
      componentProps: { isModal: false, date_info: this.dateCondition, formType: selectType, date_format: "YYYY-MM-DD" }
    });
    await modal.present();
    await modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        console.log('Modal Data : ' + modelData);
        this.kycForm.get('dob').setValue(moment(modelData.data.value).format('YYYY-MM-DD'), {
          onlyself: true,
        });
      }
    }); */
  }

  async submitForm() {
    const resultAadhar = await this.checkAadharVerification();
    const resultPan = await this.checkPanVerification();
    //const resultPolice = await this.checkPoliceVerification();

    if (this.segment == "aadharCard") {
      if (resultAadhar == false) {
        this.segment = "panCard";
        return;
      } else if (resultAadhar == true) {
        this.segment = "aadharCard";
        return;
      }
    } else if (this.segment == "panCard") {
      if (resultPan == false) {
        //this.segment = "policeVerification";
        //return;
      } else if (resultPan == true) {
        this.segment = "panCard";
        return;
      }
    } else if (this.segment == "policeVerification") {
      this.segment = "policeVerification";
      //return;
    } if ((this.segment == "panCard" || this.segment == "policeVerification") && resultAadhar == false && resultPan == false) {
      console.log("submitForm", this.kycForm.value);
      this.isSubmitted = true;
      if (!this.kycForm.valid) {
        if(!this.kycForm.controls.aadharCardNumber.valid){
          this.commonService.danger('Please Enter Valid Aadhaar Card Number');
          return false;
        } else if(!this.kycForm.controls.panCardNumber.valid){
          this.commonService.danger('Please Eenter Valid Pan Card Number');
          return false;
        // } else {
        //   this.commonService.danger('Please provide all the required values!');
        //   return false;
        }
      } else {
        if (!this.aadharDocIsUpload) {
          this.commonService.danger('Please Upload A Aadhar Card Document');
          this.aadharDocIsUpload = false;
          return;
        } else if (!this.panDocIsUpload) {
          this.commonService.danger('Please Upload A PAN Card Document');
          this.panDocIsUpload = false;
          return;
        // } else if (!this.policeDocIsUpload) {
        //   this.commonService.danger('Please Upload A Police Verification Card Document');
        //   this.policeDocIsUpload = false;
        //   return;
        }
        let documentKeys;
        this.kycForm.value.pinCode = this.kycForm.value.pinCode + "";
        if(this.kycForm.value.fullName == undefined || this.kycForm.value.fullName == null) {
          this.kycForm.value.fullName = "";
        }
        if(this.kycForm.value.policeStationName == undefined || this.kycForm.value.policeStationName == null) {
          this.kycForm.value.policeStationName = "";
        }
        if(this.kycForm.value.policeVerificationForm == undefined || this.kycForm.value.policeVerificationForm == null) {
          this.kycForm.value.policeVerificationForm = "";
        }
        if (this.aadharDocIsUpload) {
          documentKeys = Object.assign(this.kycForm.value, { "aadharCardImage": this.aadharKYCURLs?.key ? this.aadharKYCURLs?.key : "" })
        }
        if (this.panDocIsUpload) {
          documentKeys = Object.assign(documentKeys, { "panCardImage": this.panKYCURLs?.key ? this.panKYCURLs?.key : "" });
        }
        if (this.policeDocIsUpload) {
          documentKeys = Object.assign(documentKeys, { "policeVerificationForm": this.policeKYCURLs?.key ? this.policeKYCURLs?.key : "" });
        }

        let kycData = Object.assign(documentKeys, { "shop_id": this.storageService.getItem(Constants.SHOP_ID) + "" })
        //this.commonService.present();
        this.onboardService.addUpdateKYCFormDetals(kycData).subscribe((res: any) => {
          //this.commonService.dismiss();
          if (res?.isKYC?.success) {
            this.storageService.setItem(Constants.KYC_DETAILS, {
              kyc: this.kycForm.value,
            });
            if(resultAadhar == false && resultPan == false && this.segment == "policeVerification") {
              if (this.previousUrl == "/select-vehicle") {
                this.ConfirmKYCSkip();
              } else {
                this.router.navigate(['/profile']);
              }
            } else {
              this.segment = "policeVerification";
            }
            this.commonService.success("Your Kyc Saved Successfully");
          }
        }, (error) => {
          //this.commonService.dismiss();
          this.commonService.danger(error);
        });
      }
    }
  }

  async updateKYCDetails() {
    //console.log("segment::" + this.segment);
    const resultAadhar = await this.checkAadharVerification();
    const resultPan = await this.checkPanVerification();
    //const resultPolice = await this.checkPoliceVerification();

    if (this.segment == "aadharCard") {
      if (resultAadhar == false) {
        this.segment = "panCard";
        return;
      } else if (resultAadhar == true) {
        this.segment = "aadharCard";
        return;
      }
    } else if (this.segment == "panCard") {
      if (resultPan == false) {
        //this.segment = "policeVerification";
        //return;
      } else if (resultPan == true) {
        this.segment = "panCard";
        return;
      }
    } else if (this.segment == "policeVerification") {
      this.segment = "policeVerification";
      //return;
    } if ((this.segment == "panCard" || this.segment == "policeVerification") && resultAadhar == false && resultPan == false) {
      console.log("updateKYCDetails ", this.kycForm.value);
      this.isSubmitted = true;
      if (!this.kycForm.valid) {
        if(!this.kycForm.controls.aadharCardNumber.valid){
          this.commonService.danger('Please Enter Valid Aadhaar Card Number');
          return false;
        } else if(!this.kycForm.controls.panCardNumber.valid){
          this.commonService.danger('Please Enter Valid Pan Card Number');
          return false;
        // } else {
        //   this.commonService.danger('Please provide all the required values!');
        //   return false;
        }
      } else {
        if (this.kycUserInfo.aadharCardImage == null || this.kycUserInfo.aadharCardImage == undefined || this.kycUserInfo.aadharCardImage == "") {
          this.commonService.danger('Please Upload A Aadhar Card Document');
          this.aadharDocIsUpload = false;
          return;
        } else if (this.kycUserInfo.panCardImage == null || this.kycUserInfo.panCardImage == undefined || this.kycUserInfo.panCardImage == "") {
          this.commonService.danger('Please Upload A PAN Card Document');
          this.panDocIsUpload = false;
          return;
        // } else if (this.kycUserInfo.policeVerificationForm == null || this.kycUserInfo.policeVerificationForm == undefined || this.kycUserInfo.policeVerificationForm == "") {
        //   this.commonService.danger('Please Upload A Police Verification Card Document');
        //   this.policeDocIsUpload = false;
        //   return;
        }

        //this.commonService.present();
        this.kycForm.value.pinCode = this.kycForm.value.pinCode + "";
        if(this.kycUserInfo.fullName == undefined || this.kycUserInfo.fullName == null) {
          this.kycUserInfo.fullName = "";
        }
        if(this.kycUserInfo.policeStationName == undefined || this.kycUserInfo.policeStationName == null) {
          this.kycUserInfo.policeStationName = "";
        }
        if(this.kycUserInfo?.policeVerificationForm == undefined || this.kycUserInfo?.policeVerificationForm == null) {
          this.kycUserInfo.policeVerificationForm = "";
        }
        this.onboardService.addUpdateKYCFormDetals(this.kycUserInfo).subscribe((res: any) => {
          //this.commonService.dismiss();
          if ((res?.isKYC?.success)) {
            //if (this.storageService.getItem(Constants.SHOP_GST)) {
            //this.router.navigate(['/home']);
            if(resultAadhar == false && resultPan == false && this.segment == "policeVerification"){
              if (this.previousUrl == "/select-vehicle") {
                this.ConfirmKYCSkip();
              } else {
                this.router.navigate(['/profile']);
              }
            } else {
              this.segment = "policeVerification";
            }
            /* } else {
              this.ConfirmKYCSkip();
            } */
            this.commonService.success("Your Kyc Updated Successfully");
          }
        }, (error) => {
          //this.commonService.dismiss();
          this.commonService.danger(error);
        });
      }
    }
  }

  /* uploadImage(event, type) {
    debugger;
    const file = (event.target as HTMLInputElement).files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      const imageURL = reader.result as string;
      if (type === 'pan') {
        this.panImage = imageURL;
      } else {
        this.adharImage = imageURL;
      }
    };
    reader.readAsDataURL(file);
  } */

  checkAadharVerification() {
    return new Promise((resolve) => {
      if (this.aadharDocIsUpload == false) {
        this.commonService.danger('Please Upload A Aadhar Card Document');
        resolve(true);
      } else if (this.kycForm.value.aadharCardNumber == undefined || this.kycForm.value.aadharCardNumber == null || this.kycForm.value.aadharCardNumber == "") {
        this.commonService.danger('Please Input Valid Number');
        resolve(true);
      } else if (Number.isInteger(Number(this.kycForm.value.aadharCardNumber)) == false) {
        this.commonService.danger('Please Enter Valid Aadhaar Card Number');
        resolve(true);
      } else if (this.kycForm.value.name == undefined || this.kycForm.value.name == null || this.kycForm.value.name == "") {
        this.commonService.danger('Please Input Valid Name');
        resolve(true);
      } else if (this.kycForm.value.dob == undefined || this.kycForm.value.dob == null || this.kycForm.value.dob == "") {
        this.commonService.danger('Please Input Valid Date Of Birth');
        resolve(true);
      } else if (this.kycForm.value.locality == undefined || this.kycForm.value.locality == null || this.kycForm.value.locality == "") {
        this.commonService.danger('Please Input Valid Locality');
        resolve(true);
      } else if (this.kycForm.value.street == undefined || this.kycForm.value.street == null || this.kycForm.value.street == "") {
        this.commonService.danger('Please Input Valid Street');
        resolve(true);
      } else if (this.kycForm.value.city == undefined || this.kycForm.value.city == null || this.kycForm.value.city == "") {
        this.commonService.danger('Please Input Valid City');
        resolve(true);
      } else if (this.kycForm.value.state == undefined || this.kycForm.value.state == null || this.kycForm.value.state == "") {
        this.commonService.danger('Please Input Valid State');
        resolve(true);
      } else if (this.kycForm.value.pinCode == undefined || this.kycForm.value.pinCode == null || this.kycForm.value.pinCode == "") {
        this.commonService.danger('Please Input Valid PinCode');
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  checkPanVerification() {
    return new Promise((resolve) => {
      if(this.segment == "panCard") {
        if (this.panDocIsUpload == false) {
          this.commonService.danger('Please Upload A Pan Card Document');
          resolve(true);
        } else if (this.kycForm.value.panCardNumber == undefined || this.kycForm.value.panCardNumber == null || this.kycForm.value.panCardNumber == "") {
          this.commonService.danger('Please Input Valid Number');
          resolve(true);
        } else if (this.kycForm.value.name == undefined || this.kycForm.value.name == null || this.kycForm.value.name == "") {
          this.commonService.danger('Please Input Valid Name');
          resolve(true);
        } else if (this.kycForm.value.dob == undefined || this.kycForm.value.dob == null || this.kycForm.value.dob == "") {
          this.commonService.danger('Please Input Valid Date Of Birth');
          resolve(true);
        } else if (this.kycForm.value.locality == undefined || this.kycForm.value.locality == null || this.kycForm.value.locality == "") {
          this.commonService.danger('Please Input Valid Locality');
          resolve(true);
        } else if (this.kycForm.value.street == undefined || this.kycForm.value.street == null || this.kycForm.value.street == "") {
          this.commonService.danger('Please Input Valid Street');
          resolve(true);
        } else if (this.kycForm.value.city == undefined || this.kycForm.value.city == null || this.kycForm.value.city == "") {
          this.commonService.danger('Please Input Valid City');
          resolve(true);
        } else if (this.kycForm.value.state == undefined || this.kycForm.value.state == null || this.kycForm.value.state == "") {
          this.commonService.danger('Please Input Valid State');
          resolve(true);
        } else if (this.kycForm.value.pinCode == undefined || this.kycForm.value.pinCode == null || this.kycForm.value.pinCode == "") {
          this.commonService.danger('Please Input Valid PinCode');
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  }
  checkPoliceVerification() {
    return new Promise((resolve) => {
      if(this.segment == "policeVerification") {
        if (this.policeDocIsUpload == false) {
          this.commonService.danger('Please Upload A Police Card Document');
          resolve(true);
        } else if (this.kycForm.value.policeStationName == undefined || this.kycForm.value.policeStationName == null || this.kycForm.value.policeStationName == "") {
          this.commonService.danger('Please Input Valid Police Station Number');
          resolve(true);
        } else if (this.kycForm.value.fullName == undefined || this.kycForm.value.fullName == null || this.kycForm.value.fullName == "") {
          this.commonService.danger('Please Input Valid Fullname');
          resolve(true);
        } else if (this.kycForm.value.dob == undefined || this.kycForm.value.dob == null || this.kycForm.value.dob == "") {
          this.commonService.danger('Please Input Valid Date Of Birth');
          resolve(true);
        } else if (this.kycForm.value.locality == undefined || this.kycForm.value.locality == null || this.kycForm.value.locality == "") {
          this.commonService.danger('Please Input Valid Locality');
          resolve(true);
        } else if (this.kycForm.value.street == undefined || this.kycForm.value.street == null || this.kycForm.value.street == "") {
          this.commonService.danger('Please Input Valid Street');
          resolve(true);
        } else if (this.kycForm.value.city == undefined || this.kycForm.value.city == null || this.kycForm.value.city == "") {
          this.commonService.danger('Please Input Valid City');
          resolve(true);
        } else if (this.kycForm.value.state == undefined || this.kycForm.value.state == null || this.kycForm.value.state == "") {
          this.commonService.danger('Please Input Valid State');
          resolve(true);
        } else if (this.kycForm.value.pinCode == undefined || this.kycForm.value.pinCode == null || this.kycForm.value.pinCode == "") {
          this.commonService.danger('Please Input Valid PinCode');
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  }


  removeImage(type) {
    if (type === 'AADHAR') {
      this.aadharImage = '';
    } else if (type === 'PAN') {
      this.panImage = '';
    } else {
      this.policeImage = '';
    }
  }

  skipView() {
    this.router.navigate(['/bank-form']);
  }

  onBack() {
    if (this.previousUrl == "/select-vehicle") {
      this.router.navigate(['/select-vehicle']);
    } else {
      this.router.navigate(['/profile']);
    }
  }

  segmentChanged(e) {
    this.segment = e.detail.value;
  }

  async selectImage(uploadId: any,) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load From Gallery',
        handler: () => {
          this.uploadResource(uploadId, this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.uploadResource(uploadId, this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode === 32 || event.keyCode === 46) {
      return true;
    }
    else {
      return false;
    }
  }

  ConfirmKYCSkip() {
   if(this.selectedVehicle == "PEDESTRIAN" || this.selectedVehicle == "BICYCLE") {
    this.openPackageListPageModal()
   } else {
    if(this.segment == "panCard"){
      if(this.updateOrAdd){
        this.updateKYCDetails();
      } else {
        this.submitForm();
      }
    }
    if(this.previousUrl == "/profile") {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigateByUrl('/vehicle-document', { state: { isProfile: false } });
    }
   }
    
  }

  setFilteredItems(event) {
    this.kycUserInfo.panCardNumber = event.detail.value.toUpperCase();
  }

  restrictSpecialChar(event) {
    if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || event.keyCode == 8 || (event.keyCode >= 48 && event.keyCode <= 57)) {
      return true;
    }
    else {
      return false;
    }
  }

  restrictSpecialCharacters(event) {
    if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || event.keyCode == 8 || event.keyCode == 32 || (event.keyCode >= 48 && event.keyCode <= 57)) {
      return true;
    }
    else {
      return false;
    }
  }

  onlyNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  keyPressNumbers(event): boolean {
    let pattern = /^([0-9])$/;
    let result = pattern.test(event.key);
    return result;
  }

  async openPackageListPageModal() {
    this.modalCtrl.dismiss()
    const model = await this.modalCtrl.create({
      component: PackageListPage,
      cssClass: 'bottomModal',
      componentProps: {
        isModal: true,
      },
    });
    await model.present();
  }
  
  async uploadResource(uploadId: any, typeAction: any) {
    this.photoService.takePhoto(typeAction).then((res) => {
      if (res?.success) {
        //console.log("res==>", res.mediaPath);
        const fileNm = res.mediaPath;
        const fileTransfer: FileTransferObject = this.transfer.create();
        if (uploadId === 'AADHAR') {
          this.aadharImage = fileNm.replace(/file:\/\//gi, "http://localhost/_capacitor_file_");
        } else if (uploadId === 'PAN') {
          this.panImage = fileNm.replace(/file:\/\//gi, "http://localhost/_capacitor_file_");
        } else {
          this.policeImage = fileNm.replace(/file:\/\//gi, "http://localhost/_capacitor_file_");
        }

        const options: FileUploadOptions = {
          fileKey: 'file',
          fileName: fileNm.substring(fileNm.lastIndexOf('/') + 1),
          headers: { 'Content-Type': 'image/jpg' },
          chunkedMode: false,
          httpMethod: 'PUT',
          mimeType: 'image/jpg',
        };

        if (uploadId === 'AADHAR') {
          fileTransfer.upload(fileNm, this.aadharKYCURLs.url, options).then((data) => {
            if (data.responseCode == 200) {
              this.aadharDocIsUpload = true;
              //this.aadharUploadPercent = 100;
              this.kycUserInfo.aadharCardImage = this.aadharKYCURLs.key;
            }
          },(err) => {
              this.aadharDocIsUpload = false;
              //this.aadharUploadPercent = 0;
              this.commonService.danger(JSON.stringify(err));
            }
          ).catch((err)=>{
            this.aadharDocIsUpload = false;
            //this.aadharUploadPercent = 0;
            this.commonService.danger(JSON.stringify(err));
          });
          // fileTransfer.onProgress((data) => {
          //   this.ngZone.run(() => {
          //     this.aadharUploadPercent = Math.round((data.loaded/data.total) * 100);
          //     this.changeDetectorRef.detectChanges();
          //   });
          // });
        } else if (uploadId === 'PAN') {
          fileTransfer.upload(fileNm, this.panKYCURLs.url, options).then((data) => {
            if (data.responseCode == 200) {
              this.panDocIsUpload = true;
              //this.panUploadPercent = 100;
              this.kycUserInfo.panCardImage = this.panKYCURLs.key;
            }
          },(err) => {
              this.panDocIsUpload = false;
              //this.panUploadPercent = 0;
              this.commonService.danger(JSON.stringify(err));
            }
          ).catch((err)=>{
            this.panDocIsUpload = false;
            //this.panUploadPercent = 0;
            this.commonService.danger(JSON.stringify(err));
          });
          // fileTransfer.onProgress((data) => {
          //   this.ngZone.run(() => {
          //     this.panUploadPercent = Math.round((data.loaded/data.total) * 100);
          //     this.changeDetectorRef.detectChanges();
          //   });
          // });
        } else {
          fileTransfer.upload(fileNm, this.policeKYCURLs.url, options).then((data) => {
            if (data.responseCode == 200) {
              this.policeDocIsUpload = true;
              //this.policeUploadPercent = 100;
              this.kycUserInfo.policeVerificationForm = this.policeKYCURLs.key;
            }
          },(err) => {
              this.policeDocIsUpload = false;
              //this.policeUploadPercent = 0;
              this.commonService.danger(JSON.stringify(err));
            }
          ).catch((err)=>{
            this.policeDocIsUpload = false;
            //this.policeUploadPercent = 0;
            this.commonService.danger(JSON.stringify(err));
          });
          // fileTransfer.onProgress((data) => {
          //   this.ngZone.run(() => {
          //     this.policeUploadPercent = Math.round((data.loaded/data.total) * 100);
          //     this.changeDetectorRef.detectChanges();
          //   });
          // });
        }
      }
    }, (err) => {
      console.log(err);
      this.commonService.danger(JSON.stringify(err));
    });
  }
}
