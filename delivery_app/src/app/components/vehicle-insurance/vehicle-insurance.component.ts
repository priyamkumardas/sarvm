import { Component, OnInit } from '@angular/core';
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
import { PackageListPage } from 'src/app/pages/payment/package-list/package-list.page';

@Component({
  selector: 'app-vehicle-insurance',
  templateUrl: './vehicle-insurance.component.html',
  styleUrls: ['./vehicle-insurance.component.scss'],
})
export class VehicleInsuranceComponent implements OnInit {

  vehicleInsuranceDocForm: FormGroup;
  isSubmittedVehicleInsurance = false;

  vehicleInsuranceURLs: any;
  vehicleInsuranceIsUpload = false;
  vehicleInsuranceImage = '';

  stateList = environment.stateList;
  vehicleDocInfo: any = [];
  previousUrl: any = '';

  insuranceValidFrom = moment().format('YYYY-MM-DD');
  insuranceValidUpto = moment().format('YYYY-MM-DD');
  format = 'YYYY-MM-DD';
  dateCondition = {
    max: '5050',
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

      this.previousUrl = this.router.getCurrentNavigation()?.extras?.state?.previousUrl;
    }

  ngOnInit() {
    this.vehicleInsuranceDocForm = this.formBuilder.group({
      documentType: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      insuranceNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      vehicleNumber: ['', [Validators.required]],
      insuranceValidFrom: ['', [Validators.required]],
      insuranceValidUpto: ['', [Validators.required]],
    });
    this.getAllVehicleDocDetails();
  }

  getAllVehicleDocDetails() {
    //this.commonService.present();
    this.onboardService.getAllVehicleDocuments().subscribe((docRes: any) => {
      //this.commonService.dismiss();
      if (docRes?.isVehicleDoc.success && docRes?.isVehicleDoc.data != undefined) {
        console.log('Vehicle Doc', docRes);
        this.vehicleDocInfo = docRes.isVehicleDoc.data.data;
  
        /* For vehicle Insurance */
        this.vehicleInsuranceDocForm.controls['imageUrl'].setValue(this.vehicleDocInfo.insurance_document);
        this.vehicleInsuranceDocForm.controls['insuranceNumber'].setValue(this.vehicleDocInfo.insurance_number);
        this.vehicleInsuranceDocForm.controls['name'].setValue(this.vehicleDocInfo.name);
        this.vehicleInsuranceDocForm.controls['vehicleNumber'].setValue(this.vehicleDocInfo.vehicle_number);
        this.vehicleInsuranceDocForm.controls['insuranceValidFrom'].setValue(this.vehicleDocInfo.insurance_from);
        this.vehicleInsuranceDocForm.controls['insuranceValidUpto'].setValue(this.vehicleDocInfo.insurance_upto);
        if (this.vehicleDocInfo.insurance_document !== null && this.vehicleDocInfo.insurance_document !== undefined && this.vehicleDocInfo.insurance_document !== "") {
          this.vehicleInsuranceIsUpload = true;
          this.vehicleInsuranceImage = this.vehicleDocInfo.insurance_document;
        } else {
          this.vehicleInsuranceIsUpload = false;
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
    debugger;
    const modal = await this.modalCtrl.create({
      component: DateTimePickerComponent,
      cssClass: 'gst-modal-css',
      componentProps: { isModal: false, type: selectType, date_format: "YYYY-MM-DD" }
    });
    await modal.present();
    await modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        console.log('Modal Data : ' + modelData);
        // vehicleInsuranceDocForm
        if (selectType === 'insuranceValidFrom') {
          this.vehicleInsuranceDocForm.get('insuranceValidFrom').setValue(moment(modelData.data.value).format('DD/MM/YYYY'), {
            onlyself: true,
          });
        }
        if (selectType === 'insuranceValidUpto') {
          this.vehicleInsuranceDocForm.get('insuranceValidUpto').setValue(moment(modelData.data.value).format('DD/MM/YYYY'), {
            onlyself: true,
          });
        }
      }
    });    
  } */

  async openDateSelectModal(selectType, selectDate) {
    if (selectDate !== null && selectDate !== undefined && selectDate !== "") {
      console.log('Modal Data : ' + selectDate);
      /* vehicleInsuranceDocForm */
      if (selectType === 'insuranceValidFrom') {
        this.vehicleInsuranceDocForm.get('insuranceValidFrom').setValue(moment(selectDate.value).format('DD/MM/YYYY'), {
          onlyself: true,
        });
      }
      if (selectType === 'insuranceValidUpto') {
        this.vehicleInsuranceDocForm.get('insuranceValidUpto').setValue(moment(selectDate.value).format('DD/MM/YYYY'), {
          onlyself: true,
        });
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
        if (type === 'vehicleInsurance') {
          this.vehicleInsuranceURLs = verifidDoc?.isVehicleDoc.data;
          this.selectImage(type);
        }
      }
    }, (error) => {
      //this.commonService.dismiss();
      this.commonService.danger(error);
    });
  }

  removeImage(type) {
    if (type === 'vehicleInsurance') {
      this.vehicleInsuranceImage = '';
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
          if (docType === 'vehicleInsurance') {
            this.vehicleInsuranceImage = fileNm.replace(/file:\/\//gi, "http://localhost/_capacitor_file_");
          } 

          const options: FileUploadOptions = {
            fileKey: 'file',
            fileName: fileNm.substring(fileNm.lastIndexOf('/') + 1),
            headers: { 'Content-Type': 'image/jpg' },
            chunkedMode: false,
            httpMethod: 'PUT',
            mimeType: 'image/jpg',
          };

          if (docType === 'vehicleInsurance') {
            fileTransfer.upload(fileNm, this.vehicleInsuranceURLs.url, options).then((data) => {
              if (data.responseCode == 200) {
                this.vehicleInsuranceIsUpload = true;
                console.log(data + " vehicle Insurance Uploaded Successfully");
                // change from responce --> this.vehicleDocInfo.imageUrl = this.vehicleInsuranceURLs.key;
                this.vehicleInsuranceDocForm.get('imageUrl').setValue(this.vehicleInsuranceURLs.key);
                this.vehicleDocInfo.insurance_document = this.vehicleInsuranceURLs.key;
              }
            }, (err) => {
              this.vehicleInsuranceIsUpload = false;
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
    if(this.previousUrl == "/profile") {
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

  /* Vehicle Insurance Doc Save and Update */
  saveVehicleInsuranceDocDetails() {
    this.isSubmittedVehicleInsurance = true;
    this.vehicleInsuranceDocForm.controls['documentType'].setValue("vehicleInsurance");
    console.log("vehicle Insurance save: ", this.vehicleInsuranceDocForm.value);

    if (!this.vehicleInsuranceDocForm.valid) {
      this.commonService.danger('Please provide all the required values!');
      return false;
    } else {
      if (!this.vehicleInsuranceIsUpload) {
        this.commonService.danger('Please Upload A vehicle Insurance Document');
        this.vehicleInsuranceIsUpload = false;
        return;
      }
      /* let documentKeys;
      if (this.vehicleInsuranceIsUpload) {
        documentKeys = Object.assign(this.vehicleInsuranceDocForm.value, { "imageUrl": this.vehicleInsuranceURLs?.key ? this.vehicleInsuranceURLs?.key : "" })
      } */
      //this.commonService.present();
      this.onboardService.postAllVehicleDocuments(this.vehicleInsuranceDocForm.value).subscribe((vehicleInsuDoc: any) => {
        //this.commonService.dismiss();
        console.log("successfull vehicle Insurance :", vehicleInsuDoc);
        this.commonService.success("Your Driving License Data Updated");
      }, (error) => {
       // this.commonService.dismiss();
        this.commonService.danger(error?.message);
      });
    }
  }
}
