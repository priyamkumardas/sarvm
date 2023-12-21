import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
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
import { Constants } from 'src/app/config/constants';
import { StorageService } from 'src/app/lib/services/storage.service';
import { PackageListPage } from 'src/app/pages/payment/package-list/package-list.page';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-vehicle-others-deworming-certi',
  templateUrl: './vehicle-others-deworming-certi.component.html',
  styleUrls: ['./vehicle-others-deworming-certi.component.scss'],
})
export class VehicleOthersDewormingCertiComponent implements OnInit {
  @Input() isProfilePage;
  dewormingCertDocForm: FormGroup;
  isSubmittedDewormingCert = false;

  othersDewormingCertiURLs: any;
  dewormingCertIsUpload = false;
  dewormingCertiImage = '';

  stateList = environment.stateList;
  vehicleDocInfo: any = [];
  isOnbording: boolean = false;

  constructor(private router: Router,
    private camera: Camera,
    private ngLocation: Location,
    private transfer: FileTransfer,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,

    private photoService: PhotoService,
    private commonService: CommonService,
    private onboardService: OnboardService,
    private storageservice: StorageService,
    public actionSheetController: ActionSheetController) {
    this.isOnbording = this.commonService.getUserData() && this.commonService.getUserData().onbording
      ? this.commonService.getUserData().onbording
      : this.storageservice.getItem(Constants.AUTH_TOKEN)
        ? this.storageservice.getItem(Constants.AUTH_TOKEN)
        : this.commonService.getUserData().onbording;
  }

  ngOnInit() {
    this.dewormingCertDocForm = this.formBuilder.group({
      documentType: ['', [Validators.required]],
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

        /* For Deworming Certificate */
        this.dewormingCertDocForm.controls['imageUrl'].setValue(this.vehicleDocInfo.deworming_document);
        if (this.vehicleDocInfo.deworming_document !== null && this.vehicleDocInfo.deworming_document !== undefined && this.vehicleDocInfo.deworming_document !== "") {
          this.dewormingCertIsUpload = true;
          this.dewormingCertiImage = this.vehicleDocInfo.deworming_document;
        } else {
          this.dewormingCertIsUpload = false;
        }

      } else {
        this.commonService.danger(docRes?.message);
      }
    }, (error) => {
      //this.commonService.dismiss();
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
        if (type === 'dewormingCertificate') {
          this.othersDewormingCertiURLs = verifidDoc?.isVehicleDoc.data;
          this.selectImage(type);
        }
      }
    }, (error) => {
      //this.commonService.dismiss();
      this.commonService.danger(error);
    });
  }

  removeImage(type) {
    if (type === 'dewormingCerti') {
      this.dewormingCertiImage = '';
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
          if (docType === 'dewormingCertificate') {
            this.dewormingCertiImage = fileNm.replace(/file:\/\//gi, "http://localhost/_capacitor_file_");
          }

          const options: FileUploadOptions = {
            fileKey: 'file',
            fileName: fileNm.substring(fileNm.lastIndexOf('/') + 1),
            headers: { 'Content-Type': 'image/jpg' },
            chunkedMode: false,
            httpMethod: 'PUT',
            mimeType: 'image/jpg',
          };
          if (docType === 'dewormingCertificate') {
            fileTransfer.upload(fileNm, this.othersDewormingCertiURLs.url, options).then((data) => {
              if (data.responseCode == 200) {
                this.dewormingCertIsUpload = true;
                console.log(data + " others Deworming CertiURLs Uploaded Successfully");
                // change from responce --> this.vehicleDocInfo.imageUrl = this.othersDewormingCertiURLs.key;
                this.dewormingCertDocForm.get('imageUrl').setValue(this.othersDewormingCertiURLs.key);
                this.vehicleDocInfo.deworming_document = this.othersDewormingCertiURLs.key;
              }
            },
              (err) => {
                this.dewormingCertIsUpload = false;
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


  /* Deworming Certificate Doc Save and Update */
  saveDewormingCertDocDetails() {
    this.isSubmittedDewormingCert = true;
    this.dewormingCertDocForm.controls['documentType'].setValue("dewormingCertificate");
    console.log("Dawarming Certi save: ", this.dewormingCertDocForm.value);

    if (!this.dewormingCertDocForm.valid) {
      this.commonService.danger('Please provide all the required values!');
      return false;
    } else {
      if (!this.dewormingCertIsUpload) {
        this.commonService.danger('Please Upload A deworming Certificate Document');
        this.dewormingCertIsUpload = false;
        return;
      }
      /* let documentKeys;
      if (this.dewormingCertIsUpload) {
        documentKeys = Object.assign(this.dewormingCertDocForm.value, { "imageUrl": this.othersDewormingCertiURLs?.key ? this.othersDewormingCertiURLs?.key : "" })
      } */

      //this.commonService.present();
      this.onboardService.postAllVehicleDocuments(this.dewormingCertDocForm.value).subscribe((dawarmingCertDoc: any) => {
        //this.commonService.dismiss();
        console.log("successfull dl :", dawarmingCertDoc);
        this.commonService.success("Your deworming Certificate Data Updated");
        if (this.isProfilePage == true) {
          this.router.navigate(['/profile']);
        } else {
          this.openPackageListPageModal();
        }
        // this.router.navigate(['/home']);
      }, (error) => {
        //this.commonService.dismiss();
        this.commonService.danger(error?.message);
      });
    }
  }

  skipVehicleDocument() {
    if (this.isProfilePage == true) {
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
