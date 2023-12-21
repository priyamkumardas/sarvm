import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { PhotoService } from 'src/app/lib/services/photo.service';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';

import { HttpParams } from '@angular/common/http';
import { ConfirmationPopupComponent } from 'src/app/components/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.page.html',
  styleUrls: ['./bank-form.page.scss'],
})
export class BankFormPage implements OnInit {
  updateOrAdd: boolean = false;
  bankForm: FormGroup;
  isSubmitted = false;

  bankURLs: any;
  bankDocIsUpload = false;
  bankImage = '';

  bankInfo: any = [];

  shopId: string;
  @Input() isModal: boolean;

  invalidPhone: boolean = false;
  bankImageloaded = false;

  constructor(
    private router: Router,
    private camera: Camera,
    private ngLocation: Location,
    private transfer: FileTransfer,
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    public commonService: CommonService,
    private storageService: StorageService,
    private onboardService: OnboardService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.bankForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      bankName: ['', [Validators.required, Validators.minLength(2)]],
      accountNumber: ['', [Validators.required, Validators.minLength(2)]],
      reAccountNumber: ['', [Validators.required, Validators.minLength(2)]],
      ifscCode: ['', [Validators.required]]
    }, { validators: this.password.bind(this) });

    this.shopId =
      this.commonService.getUserData() &&
        this.commonService.getUserData().shopId
        ? this.commonService.getUserData().shopId
        : this.storageService.getItem(Constants.SHOP_ID);
    if (!this.isModal) {
      this.getBankDetail();
    }
  }

  password(formGroup: FormGroup) {
    const { value: account } = formGroup.get('accountNumber');
    const { value: reaccount } = formGroup.get('reAccountNumber');
    return account === reaccount ? null : { accountnoNotMatch: true };
  }
  
  changeAccountNumber(event){
    const { value: account } = this.bankForm.get('accountNumber');
    const { value: reaccount } = this.bankForm.get('reAccountNumber');
    if(account === reaccount){
      this.invalidPhone = true;
    } else {
      this.invalidPhone = false;
    }
  }

  isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
    } else {
      return true;
    }
  }
  
  getBankDetail() {
    this.commonService.present();
    this.onboardService.getBankDetails().subscribe((res: any) => {
      this.commonService.dismiss();
      this.bankImageloaded = true;
      console.log('bank res ', res);
      if (res.success && res.data.data != undefined) {
        this.bankForm.controls['name'].setValue(res.data.data?.name);
        this.bankForm.controls['bankName'].setValue(res.data.data?.bankName);
        this.bankForm.controls['accountNumber'].setValue(res.data.data?.accountNumber);
        this.bankForm.controls['reAccountNumber'].setValue(res.data.data?.accountNumber);
        this.bankForm.controls['ifscCode'].setValue(res.data.data?.ifscCode);

        if (res.data.data?.passbookImage !== null) {
          this.bankDocIsUpload = true;
          this.bankImage = res.data.data?.passbookImage;
        } else {
          this.bankDocIsUpload = false;
        }
        this.bankImageloaded = false;

        if ((res?.success && res?.data?.data != null) && (res?.data?.data?.userId != null && res?.data?.data?.userId != undefined)) {
          this.updateOrAdd = true;
          this.bankInfo = res?.data?.data;
        } else {
          this.updateOrAdd = false;
        }
      } else {
        this.bankImageloaded = false;
      }
    }, (error) => {
      this.bankImageloaded = false;
      this.commonService.dismiss();
      this.commonService.danger(error);
    });
  }

  onDeleteBankAccount() {
    this.commonService.present();
    this.onboardService.deleteBankDetails().subscribe((res: any) => {
      this.commonService.dismiss();
      console.log('delete res ', res);
      if (res.success && res.data.data != undefined) {
        this.router.navigate(['/profile']);
        this.commonService.success("Bank Account Successfully deleted");
      }
    }, (error) => {
      this.commonService.dismiss();
      this.commonService.danger(error);
    });
  }

  async confirmationPopupComponentModal(status: any) {
    const modal = await this.modalCtrl.create({
      component: ConfirmationPopupComponent,
      cssClass: 'cancel-modal-css',
      componentProps: { isModal: false, confirmPopupStatus: status }
    });
    modal.onDidDismiss().then((modelData: any) => {
      if (modelData !== null && modelData !== undefined && modelData !== "" && modelData.data != undefined) {
        if(modelData.data.status == 'Yes' && modelData.data.confirmPopupStatus == 'Delete') {
          this.onDeleteBankAccount();
        }
      }
    });
    await modal.present();
  }


  chooseImage() {
    this.onboardService.getBankPassbookURL().subscribe((verifidDoc: any) => {
      if (verifidDoc?.isKYCURLs?.success) {
        console.log(verifidDoc);
        if (verifidDoc?.isKYCURLs?.data && verifidDoc?.isKYCURLs?.data?.key && verifidDoc?.isKYCURLs?.data?.url) {
          this.bankURLs = verifidDoc.isKYCURLs.data;
          this.selectImage();           
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

  async selectImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load From Gallery',
        handler: () => {
          this.uploadResource(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.uploadResource(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  uploadResource(typeAction: any) {
    this.photoService.takePhoto(typeAction).then((res) => {
      this.bankImageloaded = true;
      if (res?.success) {
        const fileNm = res.mediaPath;
        const fileTransfer: FileTransferObject = this.transfer.create();
         
        this.bankImage = fileNm.replace(/file:\/\//gi, "http://localhost/_capacitor_file_");

        const options: FileUploadOptions = {
          fileKey: 'file',
          fileName: fileNm.substring(fileNm.lastIndexOf('/') + 1),
          headers: { 'Content-Type': 'image/jpg' },
          chunkedMode: false,
          httpMethod: 'PUT',
          mimeType: 'image/jpg',
        };

        fileTransfer.upload(fileNm, this.bankURLs.url, options).then((data) => {
          if (data.responseCode == 200) {
            this.bankDocIsUpload = true;
            this.bankImageloaded = false;
            //console.log(data + " Uploaded Successfully");
            this.bankInfo.passbookImage = this.bankURLs.key;
          }
        },
          (err) => {
            this.bankDocIsUpload = false;
            console.log(err);
            this.commonService.danger(JSON.stringify(err));
          }
        );
      }
    }, (err) => {
      console.log(err);
      this.commonService.danger(JSON.stringify(err));
    });
  }

  removeImage() {
    this.bankImage = '';
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

  updateBankDetails() {
    console.log("update bank Details ", this.bankForm.value);
    this.isSubmitted = true;
    if (!this.bankForm.valid) {
      this.commonService.danger('Please provide all the required values!');
      return false;
    } else {
      if (this.bankInfo.passbookImage == null || this.bankInfo.passbookImage == undefined || this.bankInfo.passbookImage == "") {
        this.commonService.danger('Please Upload A Bank Passbook Document');
        this.bankDocIsUpload = false;
        return;
      }
      this.commonService.present();
      this.bankForm.value.accountNumber = this.bankForm.value.accountNumber + "";
      this.onboardService.addUpdateBankFormDetals(this.bankInfo).subscribe((res: any) => {
        this.commonService.dismiss();
        if ((res?.isBank?.success)) {
          this.commonService.success("Bank Account Successfully Updated");
          this.router.navigate(['/profile']);
        }
      }, (error) => {
        this.commonService.dismiss();
        this.commonService.danger(error);
      });
    }
  }

  saveBankDetails() {
    console.log("submitForm", this.bankForm.value);
    this.isSubmitted = true;
    if (!this.bankForm.valid) {
      this.commonService.danger('Please provide all the required values!');
      return false;
    } else {
      if (!this.bankDocIsUpload) {
        this.commonService.danger('Please Upload A Bank Passbook Document');
        this.bankDocIsUpload = false;
        return;
      }
      let documentKeys;
      if (this.bankDocIsUpload) {
        documentKeys = Object.assign(this.bankForm.value, { "passbookImage": this.bankURLs?.key ? this.bankURLs?.key : "" })
      }

      this.bankForm.value.accountNumber = this.bankForm.value.accountNumber + "";
      let bankData = Object.assign(documentKeys, { "shop_id": this.storageService.getItem(Constants.SHOP_ID) + "" })
      this.commonService.present();
      this.onboardService.addUpdateBankFormDetals(bankData).subscribe((res: any) => {
        this.commonService.dismiss();
        if (res?.isBank?.success) {
          this.storageService.setItem(Constants.BANK_DETAILS, {
            bank: this.bankForm.value,
          });
          this.commonService.success("Bank Account Successfully Uploaded");
          this.router.navigate(['/profile']);
        }
      }, (error) => {
        this.commonService.dismiss();
        this.commonService.danger(error);
      });
    }
  }

}
