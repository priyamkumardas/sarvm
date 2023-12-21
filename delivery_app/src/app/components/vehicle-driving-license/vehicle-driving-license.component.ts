import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/lib/services/common.service';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { PhotoService } from 'src/app/lib/services/photo.service';
import { Location } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { environment } from 'src/environments/environment';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from '@awesome-cordova-plugins/file-transfer/ngx';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { DateTimePickerComponent } from 'src/app/components/date-time-picker/date-time-picker.component';
import * as moment from 'moment';
import { VehicleRcComponent } from '../vehicle-rc/vehicle-rc.component';
import { PackageListPage } from 'src/app/pages/payment/package-list/package-list.page';
@Component({
  selector: 'app-vehicle-driving-license',
  templateUrl: './vehicle-driving-license.component.html',
  styleUrls: ['./vehicle-driving-license.component.scss'],
})
export class VehicleDrivingLicenseComponent implements OnInit {

  drivingLicenseDocForm: FormGroup;
  isSubmittedDrivingLicense = false;

  dLicenseURLs: any;
  drivingLicenseIsUpload = false;
  dLicenseImage = '';

  
  vehicleDocInfo: any = [];
  stateList = environment.stateList;
  
  today;
  dateCondition = {
    max: '',
    min: ''
  };

  defaultDate = moment().format('YYYY-MM-DD');
  format = 'YYYY-MM-DD';
  @Input() isProfilePage;

  constructor(
    private router: Router,
    private camera: Camera,
    private ngLocation: Location,
    private transfer: FileTransfer,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,

    private photoService: PhotoService,
    private commonService: CommonService,
    private onboardService: OnboardService,
    public actionSheetController: ActionSheetController
  ) {  
  }

  ngOnInit() {
    this.drivingLicenseDocForm = this.formBuilder.group({
      documentType: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      dlNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      licenseType: ['', [Validators.required]],
      dlValidUpto: ['', [Validators.required]],
      issuingState: ['', [Validators.required]],
    });
    this.getAllVehicleDocDetails();

    this.today = this.getCurrentDate();
    this.dateCondition.min = this.today;
  }

  getCurrentDate(format: string = 'YYYY-MM-DD') {
    return moment().format(format);
  }

  getAllVehicleDocDetails() {
    // this.commonService.present();
    this.onboardService.getAllVehicleDocuments().subscribe((docRes: any) => {
      // this.commonService.dismiss();
      if (docRes?.isVehicleDoc.success && docRes?.isVehicleDoc.data != undefined) {
        console.log('Vehicle Doc', docRes);
        this.vehicleDocInfo = docRes.isVehicleDoc.data.data;

        /* For DL */
        this.drivingLicenseDocForm.controls['imageUrl'].setValue(this.vehicleDocInfo.dl_document);
        this.drivingLicenseDocForm.controls['dlNumber'].setValue(this.vehicleDocInfo.dl_number);
        this.drivingLicenseDocForm.controls['name'].setValue(this.vehicleDocInfo.name);
        this.drivingLicenseDocForm.controls['licenseType'].setValue(this.vehicleDocInfo.license_type);
        this.drivingLicenseDocForm.controls['dlValidUpto'].setValue(this.vehicleDocInfo.dl_valid_upto);
        this.drivingLicenseDocForm.controls['issuingState'].setValue(this.vehicleDocInfo.issuing_state);

        if (this.vehicleDocInfo.dl_document !== null && this.vehicleDocInfo.dl_document !== undefined && this.vehicleDocInfo.dl_document !== "") {
          this.drivingLicenseIsUpload = true;
          this.dLicenseImage = this.vehicleDocInfo.dl_document;
        } else {
          this.drivingLicenseIsUpload = false;
        }
      } else {
        this.commonService.danger(docRes?.message);
      }
    }, (error) => {
      // this.commonService.dismiss();
      this.commonService.danger(error?.message);
    });
  }

  chooseImage(type: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("documentType", type);

    //this.commonService.present();
    this.onboardService.getPresignedUrlForVehicleDocument(queryParams).subscribe((verifidDoc: any) => {
      //this.commonService.dismiss();
      if (verifidDoc?.isVehicleDoc.success) {
        console.log(type + " : ", verifidDoc?.isVehicleDoc.data);
        if (type === 'DL') {
          this.dLicenseURLs = verifidDoc?.isVehicleDoc.data;
          this.selectImage(type);
        }
      }
    }, (error) => {
      //this.commonService.dismiss();
      this.commonService.danger(error);
    });
  }

  async selectImage(uploadId: any,) {
    const actionSheet = await this.actionSheetController.create({
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

  uploadResource(docType: any, typeAction: any) {
    console.log("type : " + docType, "action : " + typeAction);
    if (Capacitor.isNativePlatform()) {
      this.photoService.takePhoto(typeAction).then((res) => {
        if (res !== 'No Image Selected') {
          console.log("res==>", res.mediaPath);
          const fileNm = res.mediaPath;
          const fileTransfer: FileTransferObject = this.transfer.create();
          if (docType === 'DL') {
            this.dLicenseImage = fileNm.replace(/file:\/\//gi, "http://localhost/_capacitor_file_");
          }

          const options: FileUploadOptions = {
            fileKey: 'file',
            fileName: fileNm.substring(fileNm.lastIndexOf('/') + 1),
            headers: { 'Content-Type': 'image/jpg' },
            chunkedMode: false,
            httpMethod: 'PUT',
            mimeType: 'image/jpg',
          };

          if (docType === 'DL') {
            fileTransfer.upload(fileNm, this.dLicenseURLs.url, options).then((data) => {
              if (data.responseCode == 200) {
                this.drivingLicenseIsUpload = true;
                console.log(data + " DL Uploaded Successfully");
                // change from responce --> this.vehicleDocInfo.dl_document = this.dLicenseURLs.key;
                this.drivingLicenseDocForm.get('imageUrl').setValue(this.dLicenseURLs.key);
                this.vehicleDocInfo.dl_document = this.dLicenseURLs.key;
              }
            }, (err) => {
              this.drivingLicenseIsUpload = false;
              console.log(err);
              this.commonService.danger(JSON.stringify(err));
            }
            );
          }
        } else {
          this.commonService.danger(res);
        }
      }, (err) => {
        console.log(err);
        this.commonService.danger(JSON.stringify(err));
      });
    } else {
      this.commonService.danger("Doc uplod on only native device");
    }
  }

  removeImage(type) {
    if (type === 'DL') {
      this.dLicenseImage = '';
    }
  }


  /* async openDateSelectModal(selectType) {
    const modal = await this.modalCtrl.create({
      component: DateTimePickerComponent,
      cssClass: 'gst-modal-css',
      componentProps: { isModal: false, date_info: this.dateCondition, type: selectType, date_format: "YYYY-MM-DD" }
    });
    await modal.present();
    await modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        console.log('Modal Data : ' + modelData);
        if (selectType === 'dlValidUpto') {
          this.drivingLicenseDocForm.get('dlValidUpto').setValue(moment(modelData.data.value).format('DD/MM/YYYY'), {
            onlyself: true,
          });
        }
      }
    });    
  } */

  async openDateSelectModal(selectType) {
    if (selectType !== null && selectType !== undefined && selectType !== "" && selectType.value) {
      console.log('Modal Data : ' + selectType);
      this.drivingLicenseDocForm.get('dlValidUpto').setValue(moment(selectType.value).format('DD/MM/YYYY'), {
        onlyself: true,
      });
    } else {
      this.drivingLicenseDocForm.controls['dlValidUpto'].setValue('');
    }   
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

  restrictSpecialCharacters(event) {
    if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || event.keyCode == 8 || event.keyCode == 32 || (event.keyCode >= 48 && event.keyCode <= 57)) {
      return true;
    }
    else {
      return false;
    }
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  skipVehicleDocument() {
    if(this.isProfilePage == true) {
      this.router.navigate(['/select-vehicle']);
    } else {
      this.openPackageListPageModal();
    }
  }

  async openPackageListPageModal() {
    //this.modalCtrl.dismiss()
    const model = await this.modalCtrl.create({
      component: PackageListPage,
      cssClass: 'bottomModal',
      componentProps: {
        isModal: true,
      },
    });
    await model.present();
  }

  
  saveDrivingLicenseDocDetails() {
    this.isSubmittedDrivingLicense = true;
    this.drivingLicenseDocForm.controls['documentType'].setValue("DL");
    console.log("dl save: ", this.drivingLicenseDocForm.value);

    if (!this.drivingLicenseDocForm.valid) {
      this.commonService.danger('Please provide all the required values!');
      return false;
    } else {
      if (!this.drivingLicenseIsUpload) {
        this.commonService.danger('Please Upload A Driving License Document');
        this.drivingLicenseIsUpload = false;
        return;
      }

      //this.commonService.present();
      this.onboardService.postAllVehicleDocuments(this.drivingLicenseDocForm.value).subscribe((dlDoc: any) => {
        //this.commonService.dismiss();
        console.log("successfull dl :", dlDoc);
        this.commonService.success("Your Driving License Data Updated");
        this.onSelectedVehicleDocSegment("drivingLicense");
      }, (error) => {
        //this.commonService.dismiss();
        this.commonService.danger(error?.message);
      });
    }
  }

  onSelectedVehicleDocSegment(product) {
    this.commonService.updateVehicleDocSegmentStatus(product);
  }
}
