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
import * as moment from 'moment';
import { PackageListPage } from 'src/app/pages/payment/package-list/package-list.page';


@Component({
  selector: 'app-vehicle-others-permit',
  templateUrl: './vehicle-others-permit.component.html',
  styleUrls: ['./vehicle-others-permit.component.scss'],
})
export class VehicleOthersPermitComponent implements OnInit {
  @Input() isProfilePage;
  vehiclePermitDocForm: FormGroup;
  isSubmittedVehiclePermit = false;

  othersVehiclePermitURLs: any;
  vehiclePermitIsUpload = false;
  vehiclePermitImage = '';

  stateList = environment.stateList;
  vehicleDocInfo: any = [];

  checkVehiclePrOption: any = 'AllIndia';

  constructor(private router: Router,
    private camera: Camera,
    private ngLocation: Location,
    private transfer: FileTransfer,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,

    private photoService: PhotoService,
    public commonService: CommonService,
    private onboardService: OnboardService,
    public actionSheetController: ActionSheetController) { 

    }

  ngOnInit() {
    this.vehiclePermitDocForm = this.formBuilder.group({
      documentType: ['', [Validators.required]],
      permitType: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
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
        this.vehiclePermitDocForm.controls['permitType'].setValue(this.vehicleDocInfo.permit_type);
        this.vehiclePermitDocForm.controls['imageUrl'].setValue(this.vehicleDocInfo.permit_document);
        if (this.vehicleDocInfo.permit_document !== null && this.vehicleDocInfo.permit_document !== undefined && this.vehicleDocInfo.permit_document !== "") {
          this.vehiclePermitIsUpload = true;
          this.vehiclePermitImage = this.vehicleDocInfo.permit_document;
        } else {
          this.vehiclePermitIsUpload = false;
        }

      } else {
        this.commonService.danger(docRes?.message);
      }
    }, (error) => {
      //this.commonService.dismiss();
      this.commonService.danger(error?.message);
    });
  }

  checkVehiclePermitOption(event) {
    this.checkVehiclePrOption = event.detail.value;
  }

  chooseImage(type: any) {
    /* let queryParams = new HttpParams();
    queryParams = queryParams.append("documentType", type);

    this.commonService.present();
    this.onboardService.getPresignedUrlForVehicleDocument(queryParams).subscribe((verifidDoc: any) => {
      this.commonService.dismiss();
      if (verifidDoc?.isVehicleDoc.success) {
        console.log(type + " : ", verifidDoc?.isVehicleDoc.data);
        if (type === 'vehiclePermit') {
          this.othersVehiclePermitURLs = verifidDoc?.isVehicleDoc.data;
          this.selectImage(type);
        }
      } else {
        this.commonService.dismiss();
      }
    }, (error) => {
      this.commonService.dismiss();
      this.commonService.danger(error);
    }); */
    this.commonService.featureNotAvailable();
  }

  removeImage(type) {
    if (type === 'vehiclePermit') {
      this.vehiclePermitImage = '';
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
          if (docType === 'vehiclePermit') {
            this.vehiclePermitImage = fileNm.replace(/file:\/\//gi, "http://localhost/_capacitor_file_");
          }

          const options: FileUploadOptions = {
            fileKey: 'file',
            fileName: fileNm.substring(fileNm.lastIndexOf('/') + 1),
            headers: { 'Content-Type': 'image/jpg' },
            chunkedMode: false,
            httpMethod: 'PUT',
            mimeType: 'image/jpg',
          };
          if (docType === 'vehiclePermit') {
            fileTransfer.upload(fileNm, this.othersVehiclePermitURLs.url, options).then((data) => {
              if (data.responseCode == 200) {
                this.vehiclePermitIsUpload = true;
                console.log(data + " others Vehicle PermitURLs Uploaded Successfully");
                // change from responce --> this.vehicleDocInfo.imageUrl = this.othersVehiclePermitURLs.key;
                this.vehiclePermitDocForm.get('imageUrl').setValue(this.othersVehiclePermitURLs.key);
                this.vehicleDocInfo.permit_document = this.othersVehiclePermitURLs.key;
              }
            },
              (err) => {
                this.vehiclePermitIsUpload = false;
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

  /* Vehicle Permit Doc Save and Update */
  saveVehiclePermitDocDetails() {
    this.isSubmittedVehiclePermit = true;
    this.vehiclePermitDocForm.controls['documentType'].setValue("vehiclePermit");
    console.log("Vehicle Permit save: ", this.vehiclePermitDocForm.value);

    if (!this.vehiclePermitDocForm.valid) {
      this.commonService.danger('Please provide all the required values!');
      return false;
    } else {
      if (!this.vehiclePermitIsUpload) {
        this.commonService.danger('Please Upload A Vehicle Permit Document');
        this.vehiclePermitIsUpload = false;
        return;
      }
      /* let documentKeys;
      if (this.vehiclePermitIsUpload) {
        documentKeys = Object.assign(this.vehiclePermitDocForm.value, { "imageUrl": this.othersVehiclePermitURLs?.key ? this.othersVehiclePermitURLs?.key : "" })
      } */
      //this.commonService.present();
      this.onboardService.postAllVehicleDocuments(this.vehiclePermitDocForm.value).subscribe((vehiclePermitDoc: any) => {
        //this.commonService.dismiss();
        console.log("successfull Vehicle Permit :", vehiclePermitDoc);
        this.commonService.success("Your Vehicle Permit Data Updated");
      }, (error) => {
        //this.commonService.dismiss();
        this.commonService.danger(error?.message);
      });
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
}
