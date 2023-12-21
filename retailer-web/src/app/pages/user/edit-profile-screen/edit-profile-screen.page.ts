import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/lib/services/common.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { ActivatedRoute } from '@angular/router';

import { PhotoService } from 'src/app/lib/services/photo.service';

import { UserService } from 'src/app/lib/services/user.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-edit-profile-screen',
  templateUrl: './edit-profile-screen.page.html',
  styleUrls: ['./edit-profile-screen.page.scss'],
})
export class EditProfileScreenPage implements OnInit {
  userProfileURL: string;
  profileImage: string;
  segment;
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
  customAlertOptions = {
    header: 'user name',
    translucent: true,
  };
  id: any;

  constructor(
    public commonService: CommonService,
    private actionSheetController: ActionSheetController,
    private file: File,
    private transfer: FileTransfer,
    private aroute: ActivatedRoute,
    private photoService: PhotoService,
    private modalCtrl: ModalController,
    private userService: UserService

  ) { }

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
        this.commonService.success('User Data Updated !!')
        history.back();
      } else if (res && res.error) {
        this.commonService.danger(res.error.message);
      }
    }, err => {
      this.commonService.dissmiss_loading();
      this.commonService.danger('Something Went Wrong !!')
    })
  }


  getUserDetails() {
    this.commonService.presentLoading();
    this.userService.getUserDetails().subscribe(res => {
      
      // this.commonService.presentLoading();
      this.commonService.dissmiss_loading();

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
    }, err => {
      this.commonService.dissmiss_loading();
    })
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
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
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  addPhotoToGallery(source) {
    this.commonService.presentLoading();
    this.userService.getUserProfileImageUploadUrl().subscribe((res: any) => {
    
      if (res.data.uploadURL) {
        console.log(res.data.uploadURL);
        this.photoService.takePhoto(source).then((img) => {
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
              console.log(res.data.url);
              if (data.responseCode == 200) {
                this.form.basicInformation.personalDetails.profileImage = res.data.url;
              }
            }, (err) => {              
              this.commonService.danger(JSON.stringify(err));
            });
          }
        });
      }      
      this.commonService.dissmiss_loading();
    },err => {
      this.commonService.dissmiss_loading();
    });
  }



}
