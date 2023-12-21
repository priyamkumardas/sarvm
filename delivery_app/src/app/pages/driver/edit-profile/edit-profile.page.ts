import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/lib/services/storage.service';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { PhotoService } from 'src/app/lib/services/photo.service';
import { ActionSheetController, IonRouterOutlet, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { UserService } from 'src/app/lib/services/user.service';
import { Capacitor } from '@capacitor/core';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';
import { Optional } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  profileEditForm: FormGroup;
  editProfileInfo: any = [];
  isSubmitted = false;
  profileURL: any;
  profileImage = '';
  userData: any;
  form = {
    basicInformation: {
      personalDetails: {
        firstName: '',
        mobileNumber: '',
        secondaryMobileNumber: '',
        profileImage: '',
        aboutUs: ''
      }
    }
  };
  userProfileURL: string;
  isenabled = true;
  imageloaded = false;

  constructor(private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageService,
    private onboardService: OnboardService,
    public commonService: CommonService,
    private photoService: PhotoService,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private transfer: FileTransfer,
    private camera: Camera,
    private userService: UserService,
    private modalCtrl: ModalController,
    private ngLocation: Location,
    private platform: Platform) {

      /* this.platform.backButton.subscribeWithPriority(101, () => {
        this.onBack();
      }); */
    }

  ngOnInit() {
    this.userData = this.commonService.userData;
  }

  ionViewWillEnter() {
    this.getUserDetails();
  }

  addUserDetails() {
    this.commonService.presentLoading();
    this.userService.addUserDetails(this.form).subscribe((res: any) => {
      this.commonService.dissmiss_loading();
      if (res.success) {
        this.commonService.success('User Profile Updated')
        this.router.navigateByUrl('/profile');
      } else if (res && res.error) {
        this.commonService.danger(res.error.message);
      }
      this.commonService.dissmiss_loading();
    }, err => {
      this.commonService.dissmiss_loading();
      this.commonService.danger('Something Went Wrong !!')
    })
  }

  getUserDetails() {
    this.commonService.presentLoading();
    this.userService.getUserDetails().subscribe((res: any) => {
      this.form = {
        basicInformation: {
          personalDetails: {
            firstName: res['data'].basicInformation?.personalDetails.firstName,
            mobileNumber: this.userData.phone,
            secondaryMobileNumber: res['data'].basicInformation?.personalDetails.secondaryMobileNumber,
            profileImage: res['data'].basicInformation?.personalDetails.profileImage ? res['data'].basicInformation?.personalDetails.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            aboutUs: res['data'].basicInformation?.personalDetails.aboutUs
          }
        }
      };
      this.commonService.dissmiss_loading();
    }, (error) => {
      this.commonService.dissmiss_loading();
      this.commonService.danger(error);
    });
  }

  async chooseImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [{
        text: 'Camera',
        handler: () => {
          this.addPhotoToGallery(1);
        }
      }, {
        text: 'Gallery',
        handler: () => {
          this.addPhotoToGallery(0);
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }

  addPhotoToGallery(source) {
    this.userService.getUserProfileImageUploadUrl().subscribe((res: any) => {
    
      if (res.data.uploadURL) {
        console.log(res.data.uploadURL);
        this.photoService.takePhoto(source).then((img) => {
          this.imageloaded = true;
          console.log(img)
          console.log(Capacitor.convertFileSrc(img.mediaPath))
          if (img?.success) {
            this.userProfileURL = Capacitor.convertFileSrc(img.mediaPath);
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
                //this.form.basicInformation.personalDetails.profileImage = res.data.url;
                this.form.basicInformation.personalDetails.profileImage  = res.data.url;
                this.imageloaded = false;
              }
            }, (err) => {
              this.commonService.danger(JSON.stringify(err));
            });
          }
        });
      }
      
    });
  }

  restrictSpecialCharacters(event) {
    if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || event.keyCode == 8 || event.keyCode == 32 || (event.keyCode >= 48 && event.keyCode <= 57)) {
      return true;
    }
    else {
      return false;
    }
  }

  changeVerifyOtpBtn() {
    this.isenabled = false;
  }

  async openVerifyOtpModal() {
    const modal = await this.modalCtrl.create({
      component: VerifyOtpComponent,
      cssClass: 'gst-modal-css',
      componentProps: {isModal : false,}
    });
    await modal.present();
  }

  onBack() {
    this.router.navigate(['/profile']);
  }

}
