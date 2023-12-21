import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/lib/services/common.service';
import { ModalController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { PhotoService } from 'src/app/lib/services/photo.service';
import { UserService } from 'src/app/lib/services/user.service';
import { Capacitor } from '@capacitor/core';
import { ProfilePhotoOptionComponent } from '../profile-photo-option/profile-photo-option.component';


@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
})
export class EditUserProfileComponent implements OnInit {
  userProfileURL: string;
  userData: any;
  form = {
    basicInformation: {
      personalDetails: {
        firstName: '',
        mobileNumber: '',
        secondaryMobileNumber: '',
        profileImage: null,
        aboutUs: ''
      }
    }
  };

  constructor( public commonService: CommonService, private transfer: FileTransfer, private photoService: PhotoService,private modalCtrl: ModalController,private userService: UserService) { }

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
    }, err => {
      this.commonService.dissmiss_loading();
    })
  }

  addPhotoToGallery(source) {
    this.userService.getUserProfileImageUploadUrl().subscribe((res: any) => {
      if (res.data.uploadURL) {
        this.photoService.takePhoto(source).then((img) => {
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
            this.commonService.presentLoading();
            fileTransfer.upload(img.mediaPath, res.data.uploadURL, options).then((data) => {
              this.commonService.dissmiss_loading();
              if (data.responseCode == 200) {
                this.form.basicInformation.personalDetails.profileImage = res.data.url;
              }
            }, (err) => {
              this.commonService.dissmiss_loading();
              this.commonService.danger(JSON.stringify(err));
            });
          }
        });
      }
    },err => {
    });
  }

  async openSelectImageModal(){
    const model = await this.modalCtrl.create({
      component: ProfilePhotoOptionComponent,
      cssClass: 'bottomModal',
    
    });
    await model.present();
    model.onDidDismiss().then(res => {
      console.log(res);
      if (res.role !== 'backdrop') {
        this.addPhotoToGallery(res.data);
      }
    });
  }

}
