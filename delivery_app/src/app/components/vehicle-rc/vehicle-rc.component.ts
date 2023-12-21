import { Component, Input, OnInit } from '@angular/core';
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
import { VehicleOthersDewormingCertiComponent } from '../vehicle-others-deworming-certi/vehicle-others-deworming-certi.component';
import { PackageListPage } from 'src/app/pages/payment/package-list/package-list.page';

@Component({
  selector: 'app-vehicle-rc',
  templateUrl: './vehicle-rc.component.html',
  styleUrls: ['./vehicle-rc.component.scss'],
})
export class VehicleRcComponent implements OnInit {
  @Input() isProfilePage;
  rcDocForm: FormGroup;
  isSubmittedRc = false;

  rcLicenseURLs: any;
  rcIsUpload = false;
  rcLicenseImage = '';

  vehicleDocInfo: any = [];
  stateList = environment.stateList;

  rcValidFrom = moment().format('YYYY-MM-DD');
  rcValidUpto = moment().format('YYYY-MM-DD');
  format = 'YYYY-MM-DD';
  dateCondition = {
    max: '',
    min: ''
  };

  constructor(private router: Router,
    private camera: Camera,
    private ngLocation: Location,
    private transfer: FileTransfer,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,

    private photoService: PhotoService,
    private commonService: CommonService,
    private onboardService: OnboardService,
    public actionSheetController: ActionSheetController) { 
    }

  ngOnInit() {
    this.rcDocForm = this.formBuilder.group({
      documentType: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      rcNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      vehicleNumber: ['', [Validators.required]],
      rcValidFrom: ['', [Validators.required]],
      rcValidUpto: ['', [Validators.required]],

    });
    this.getAllVehicleDocDetails();
  }

  getCurrentDate(format: string = 'YYYY-MM-DD') {
    return moment().format(format);
  }


  getAllVehicleDocDetails() {
    //this.commonService.present();
    this.onboardService.getAllVehicleDocuments().subscribe((docRes: any) => {
      //this.commonService.dismiss();
      if (docRes?.isVehicleDoc.success && docRes?.isVehicleDoc.data != undefined) {
        console.log('Vehicle Rc Doc', docRes);
        this.vehicleDocInfo = docRes.isVehicleDoc.data.data;

        /* For RC */
        this.rcDocForm.controls['imageUrl'].setValue(this.vehicleDocInfo.rc_document);
        this.rcDocForm.controls['rcNumber'].setValue(this.vehicleDocInfo.rc_number);
        this.rcDocForm.controls['name'].setValue(this.vehicleDocInfo.name);
        this.rcDocForm.controls['vehicleNumber'].setValue(this.vehicleDocInfo.vehicle_number);
        this.rcDocForm.controls['rcValidFrom'].setValue(this.vehicleDocInfo.rc_valid_from);
        this.rcDocForm.controls['rcValidUpto'].setValue(this.vehicleDocInfo.rc_valid_upto);

        if (this.vehicleDocInfo.rc_document !== null && this.vehicleDocInfo.rc_document !== undefined && this.vehicleDocInfo.rc_document !== "") {
          this.rcIsUpload = true;
          this.rcLicenseImage = this.vehicleDocInfo.rc_document;
        } else {
          this.rcIsUpload = false;
        }
      } else {
        this.commonService.danger(docRes?.message);
      }
    }, (error) => {
      //this.commonService.dismiss();
      this.commonService.danger(error?.message);
    });
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
        // rcDocForm
        if (selectType === 'rcValidFrom') {
          this.rcDocForm.get('rcValidFrom').setValue(moment(modelData.data.value).format('DD/MM/YYYY'), {
            onlyself: true,
          });
          this.dateCondition.min = moment(modelData.data.value).format('YYYY-MM-DD');
        }
        if (selectType === 'rcValidUpto') {
          this.rcDocForm.get('rcValidUpto').setValue(moment(modelData.data.value).format('DD/MM/YYYY'), {
            onlyself: true,
          });
        }
      }
    });
  } */

  async openDateSelectModal(selectType, selectDate) {
    if (selectDate !== null && selectDate !== undefined && selectDate !== "" && selectDate.value != undefined) {
      console.log('Modal Data : ' + selectDate);
      // rcDocForm
      if(selectDate.value !== "") {
        if (selectType === 'rcValidFrom') {
          this.rcDocForm.get('rcValidFrom').setValue(moment(selectDate.value).format('DD/MM/YYYY'), {
            onlyself: true,
          });
          this.dateCondition.min = moment(selectDate.value).format('YYYY-MM-DD');
        }
      } else {
        this.rcDocForm.controls['rcValidFrom'].setValue('');
      }
      
      if(selectDate.value !== "") {
        if (selectType === 'rcValidUpto') {
          this.rcDocForm.get('rcValidUpto').setValue(moment(selectDate.value).format('DD/MM/YYYY'), {
            onlyself: true,
          });
        }
      } else {
        this.rcDocForm.controls['rcValidUpto'].setValue('');
      }
      
    }   
  }


  chooseImage(type: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("documentType", type);

    //this.commonService.present();
    this.onboardService.getPresignedUrlForVehicleDocument(queryParams).subscribe((verifidDoc: any) => {
      //this.commonService.dismiss();
      if (verifidDoc?.isVehicleDoc.success) {
        console.log(type + " : ", verifidDoc?.isVehicleDoc.data);
        if (type === 'RC') {
          this.rcLicenseURLs = verifidDoc?.isVehicleDoc.data;
          this.selectImage(type);
        }
      }
    }, (error) => {
      //this.commonService.dismiss();
      this.commonService.danger(error);
    });
  }


  removeImage(type) {
    if (type === 'RC') {
      this.rcLicenseImage = '';
    }
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
          if (docType === 'RC') {
            this.rcLicenseImage = fileNm.replace(/file:\/\//gi, "http://localhost/_capacitor_file_");
          }

          const options: FileUploadOptions = {
            fileKey: 'file',
            fileName: fileNm.substring(fileNm.lastIndexOf('/') + 1),
            headers: { 'Content-Type': 'image/jpg' },
            chunkedMode: false,
            httpMethod: 'PUT',
            mimeType: 'image/jpg',
          };

          if (docType === 'RC') {
            fileTransfer.upload(fileNm, this.rcLicenseURLs.url, options).then((data) => {
              if (data.responseCode == 200) {
                this.rcIsUpload = true;
                console.log(data + " RC Uploaded Successfully");
                // change from responce --> this.vehicleDocInfo.imageUrl = this.rcLicenseURLs.key;
                this.rcDocForm.get('imageUrl').setValue(this.rcLicenseURLs.key);
                this.vehicleDocInfo.rc_document = this.rcLicenseURLs.key;
              }
            }, (err) => {
              this.rcIsUpload = false;
              console.log(err);
              this.commonService.danger(JSON.stringify(err));
            });
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

  saveRCDocDetails() {
    this.isSubmittedRc = true;
    this.rcDocForm.controls['documentType'].setValue("RC");
    console.log("rc save: ", this.rcDocForm.value);

    if (!this.rcDocForm.valid) {
      this.commonService.danger('Please provide all the required values!');
      return false;
    } else {
      if (!this.rcIsUpload) {
        this.commonService.danger('Please Upload A RC Document');
        this.rcIsUpload = false;
        return;
      }
      /* let documentKeys;
      if (this.rcIsUpload) {
        documentKeys = Object.assign(this.rcDocForm.value, { "imageUrl": this.rcLicenseURLs?.key ? this.rcLicenseURLs?.key : "" })
      } */
      //this.commonService.present();
      this.onboardService.postAllVehicleDocuments(this.rcDocForm.value).subscribe((rcDoc: any) => {
        //this.commonService.dismiss();
        console.log("successfull rc :", rcDoc);
        this.onSelectedVehicleDocSegment("rcLicense")
        this.commonService.success("Your RC Data Updated");
      }, (error) => {
        //this.commonService.dismiss();
        this.commonService.danger(error?.message);
      });
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

  onSelectedVehicleDocSegment(product) {
    this.commonService.updateVehicleDocSegmentStatus(product);
  }
}
