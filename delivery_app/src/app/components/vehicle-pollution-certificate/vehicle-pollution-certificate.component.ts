import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { PhotoService } from 'src/app/lib/services/photo.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
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
  selector: 'app-vehicle-pollution-certificate',
  templateUrl: './vehicle-pollution-certificate.component.html',
  styleUrls: ['./vehicle-pollution-certificate.component.scss'],
})
export class VehiclePollutionCertificateComponent implements OnInit {

  pollutionCertificateDocForm: FormGroup;
  isSubmittedPollutionCertificate = false;

  pollutionCertificateURLs: any;
  pollutionCertificateIsUpload = false;
  pollutionCertificateImage = '';

  stateList = environment.stateList;
  vehicleDocInfo: any = [];
  previousUrl: any = '';

  pollutionCertificateValidFrom = moment().format('YYYY-MM-DD');
  pollutionCertificateUpto = moment().format('YYYY-MM-DD');
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
    this.pollutionCertificateDocForm = this.formBuilder.group({
      documentType: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      pollutionCertificateNumber: ['', [Validators.required]],
      vehicleNumber: ['', [Validators.required]],
      pollutionCertificateValidFrom: ['', [Validators.required]],
      pollutionCertificateUpto: ['', [Validators.required]],
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

        /* For pollution Certificate */
        this.pollutionCertificateDocForm.controls['imageUrl'].setValue(this.vehicleDocInfo.pollution_document);
        this.pollutionCertificateDocForm.controls['pollutionCertificateNumber'].setValue(this.vehicleDocInfo.pollution_certificate_number);
        this.pollutionCertificateDocForm.controls['vehicleNumber'].setValue(this.vehicleDocInfo.vehicle_number);
        this.pollutionCertificateDocForm.controls['pollutionCertificateValidFrom'].setValue(this.vehicleDocInfo.pollution_certificate_valid_from);
        this.pollutionCertificateDocForm.controls['pollutionCertificateUpto'].setValue(this.vehicleDocInfo.pollution_certificate_valid_upto);
        if (this.vehicleDocInfo.pollution_document !== null && this.vehicleDocInfo.pollution_document !== undefined && this.vehicleDocInfo.pollution_document !== "") {
          this.pollutionCertificateIsUpload = true;
          this.pollutionCertificateImage = this.vehicleDocInfo.pollution_document;
        } else {
          this.pollutionCertificateIsUpload = false;
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
      componentProps: { isModal: false, type: selectType, date_format: "YYYY-MM-DD" }
    });
    await modal.present();
    await modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        console.log('Modal Data : ' + modelData);
        // pollutionCertificateDocForm
        if (selectType === 'pollutionCertificateValidFrom') {
          this.pollutionCertificateDocForm.get('pollutionCertificateValidFrom').setValue(moment(modelData.data.value).format('DD/MM/YYYY'), {
            onlyself: true,
          });
        }
        if (selectType === 'pollutionCertificateUpto') {
          this.pollutionCertificateDocForm.get('pollutionCertificateUpto').setValue(moment(modelData.data.value).format('DD/MM/YYYY'), {
            onlyself: true,
          });
        }
      }
    });    
  } */

  async openDateSelectModal(selectType, selectDate) {
    if (selectDate !== null && selectDate !== undefined && selectDate !== "") {
      console.log('Modal Data : ' + selectDate);
      if (selectType === 'pollutionCertificateValidFrom') {
        this.pollutionCertificateDocForm.get('pollutionCertificateValidFrom').setValue(moment(selectDate.value).format('DD/MM/YYYY'), {
          onlyself: true,
        });
      }
      if (selectType === 'pollutionCertificateUpto') {
        this.pollutionCertificateDocForm.get('pollutionCertificateUpto').setValue(moment(selectDate.value).format('DD/MM/YYYY'), {
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
        if (type === 'pollutionCertificate') {
          this.pollutionCertificateURLs = verifidDoc?.isVehicleDoc.data;
          this.selectImage(type);
        }
      }
    }, (error) => {
      //this.commonService.dismiss();
      this.commonService.danger(error);
    });
  }

  removeImage(type) {
    if (type === 'pollutionCertificate') {
      this.pollutionCertificateImage = '';
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
          if (docType === 'pollutionCertificate') {
            this.pollutionCertificateImage = fileNm.replace(/file:\/\//gi, "http://localhost/_capacitor_file_");
          }

          const options: FileUploadOptions = {
            fileKey: 'file',
            fileName: fileNm.substring(fileNm.lastIndexOf('/') + 1),
            headers: { 'Content-Type': 'image/jpg' },
            chunkedMode: false,
            httpMethod: 'PUT',
            mimeType: 'image/jpg',
          };

          if (docType === 'pollutionCertificate') {
            fileTransfer.upload(fileNm, this.pollutionCertificateURLs.url, options).then((data) => {
              if (data.responseCode == 200) {
                this.pollutionCertificateIsUpload = true;
                console.log(data + " pollution Certificate Uploaded Successfully");
                // change from responce --> this.vehicleDocInfo.imageUrl = this.pollutionCertificateURLs.key;
                this.pollutionCertificateDocForm.get('imageUrl').setValue(this.pollutionCertificateURLs.key);
                this.vehicleDocInfo.pollution_document = this.pollutionCertificateURLs.key;
              }
            }, (err) => {
              this.pollutionCertificateIsUpload = false;
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
  
  /* Pollution Certificate Doc Save and Update */
  savePollutionCertificateDocDetails() {
    this.isSubmittedPollutionCertificate = true;
    this.pollutionCertificateDocForm.controls['documentType'].setValue("pollutionCertificate");
    console.log("pollution Certificate save: ", this.pollutionCertificateDocForm.value);

    if (!this.pollutionCertificateDocForm.valid) {
      this.commonService.danger('Please provide all the required values!');
      return false;
    } else {
      if (!this.pollutionCertificateIsUpload) {
        this.commonService.danger('Please Upload A Pollution Certificate Document');
        this.pollutionCertificateIsUpload = false;
        return;
      }
      /* let documentKeys;
      if (this.pollutionCertificateIsUpload) {
        documentKeys = Object.assign(this.pollutionCertificateDocForm.value, { "imageUrl": this.pollutionCertificateURLs?.key ? this.pollutionCertificateURLs?.key : "" })
      } */
      //this.commonService.present();
      this.onboardService.postAllVehicleDocuments(this.pollutionCertificateDocForm.value).subscribe((pollutionCertDoc: any) => {
        //this.commonService.dismiss();
        console.log("successfull dl :", pollutionCertDoc);
        this.commonService.success("Your Driving License Data Updated");
      }, (error) => {
        //this.commonService.dismiss();
        this.commonService.danger(error?.message);
      });
    }
  }
}
