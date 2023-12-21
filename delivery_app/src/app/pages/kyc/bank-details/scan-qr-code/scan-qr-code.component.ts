import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Capacitor } from '@capacitor/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { DeleteQrComponent } from 'src/app/components/delete-qr/delete-qr.component';
import { CommonService } from 'src/app/lib/services/common.service';
import { OnboardService } from 'src/app/lib/services/onboard.service';
import { PhotoService } from 'src/app/lib/services/photo.service';
import { UserService } from 'src/app/lib/services/user.service';

@Component({
  selector: 'app-scan-qr-code',
  templateUrl: './scan-qr-code.component.html',
  styleUrls: ['./scan-qr-code.component.scss'],
})
export class ScanQrCodeComponent implements OnInit {

  @Input() isOrder: boolean
  upiInfo: any = [];
  form = {
    deliveryData: {
      payment: {

      }
    }
  };
  uploadUpiData: any;
  QRimage: any;
  upiId: any;
  qrCodeURL: string;
  userUpiData: any;
  userId: any;
  userPaymentInfo: any;
  displayUserPaymentInfo: any;
  displayUserUpiIcon: any;
  displayUserName: any;
  displayUserMobile: any;
  displayUserUpi: any;

  getIndex: any;
  upiFormData: any;
  deliveryId: any;
  paymentInfoId: any;
  segment = 'myUPI';
  retailerPaymentInfo: any;
  displayRetailerPaymentInfo: any;
  @Input() orderTripDetail: any;
  isPayment = false;

  constructor(public commonService: CommonService,
    private router: Router,
    private userService: UserService,
    private photoService: PhotoService,
    private camera: Camera,
    private transfer: FileTransfer,
    private actionSheetController: ActionSheetController,
    private onboardService: OnboardService,
    private activatedRoute: ActivatedRoute,
    public modalCtrl: ModalController) { 
    }

  ngOnInit() {
    let data = this.activatedRoute.snapshot.paramMap.get('data') ?
      this.activatedRoute.snapshot.paramMap.get('data') : '0'; //if data is null then it will take 0 by default
    if (data) {
      this.getIndex = JSON.parse(data);
      console.log("Got index of UPI: ", this.getIndex);
      this.getUserData();
    }

    //for own delivery person
    if(this.orderTripDetail?.expectedEarning == "N/A") {
      this.segment = 'shopUPI';
    }
    // call this function when the trip delivery
    this.getRetailerData();
  }

  ionViewWillEnter() {
    this.getUserData();
  }

  // Get user's existing details from backend
  getUserData() {
    this.userId =
      this.commonService.getUserData() && this.commonService.getUserData().userId;
    //userDetails api call
    this.commonService.presentProgressBarLoading()
    this.userService.getUPI(this.userId ? this.userId : null).subscribe((upiDetails: any) => {
      this.commonService.closeProgressBarLoading()
      this.userPaymentInfo = upiDetails.data;
      console.log(this.userPaymentInfo);
      if (!isNaN(this.getIndex)) {
        // this.displayUserPaymentInfo = this.userPaymentInfo[this.getIndex].qrImage;
        this.displayUserPaymentInfo = this.userPaymentInfo[this.getIndex]?.QRimage ? this.userPaymentInfo[this.getIndex]?.QRimage : './assets/banking/not-found.png';
        // Display User name, mobile, UPI icon and UPI id after page load
        this.displayUserUpiIcon = this.userPaymentInfo[this.getIndex]?.app;
        this.displayUserName = this.userPaymentInfo[this.getIndex]?.name;
        this.displayUserMobile = this.userPaymentInfo[this.getIndex]?.mobile;
        this.displayUserUpi = this.userPaymentInfo[this.getIndex]?.upi;

        this.deliveryId = this.userPaymentInfo[this.getIndex]?.r_id;
        this.paymentInfoId = this.userPaymentInfo[this.getIndex]?._id;
      }
    }, err => {
      this.commonService.closeProgressBarLoading()
      console.log(err);
    });
  }

  segmentChanged(e) {
    this.segment = e.detail.value;
    this.getIndex = 0;
    if (this.segment == 'myUPI') {
      this.getUserData();
    } else {
      this.getRetailerData();
    }
  }

  changeQR(index) {
    this.getIndex = index
    if (this.segment == 'shopUPI') {
      this.displayRetailerPaymentInfo = this.retailerPaymentInfo[this.getIndex]?.qr_image ? this.retailerPaymentInfo[this.getIndex]?.qr_image : './assets/banking/not-found.png';
    } else {
      this.displayUserPaymentInfo = this.userPaymentInfo[this.getIndex]?.QRimage ? this.userPaymentInfo[this.getIndex]?.QRimage : './assets/banking/not-found.png';
    }
    this.displayUserUpiIcon = this.userPaymentInfo[this.getIndex]?.app;
    this.displayUserName = this.userPaymentInfo[this.getIndex]?.name;
    this.displayUserMobile = this.userPaymentInfo[this.getIndex]?.mobile;
    this.displayUserUpi = this.userPaymentInfo[this.getIndex]?.upi;

    this.deliveryId = this.userPaymentInfo[this.getIndex]?.r_id;
    this.paymentInfoId = this.userPaymentInfo[this.getIndex]?._id;

    console.log(this.displayUserUpiIcon);
  }

  async openDeleteModal(pInfoId) {
    const model = await this.modalCtrl.create({
      component: DeleteQrComponent,
      cssClass: 'delete-qr'
    })
    await model.present()
    const { data } = await model.onWillDismiss()
    model.onDidDismiss().then(() => {
      if (data.status == 'Yes') {
        this.deleteUpi(pInfoId);
      }
    })
  }

  deleteUpi(paymentInfoId) {
    this.commonService.presentProgressBarLoading()
    this.userService.deleteUPI(paymentInfoId).subscribe((res: any) => {
      console.log(res.success);
      this.commonService.closeProgressBarLoading()
      if (res.success) {
        this.commonService.success('Removed Successfully !');
        console.log(this.userPaymentInfo.length);
        if (this.userPaymentInfo.length > 1) {
          if (this.getIndex == 0) {
            this.forwardQR('next');
            this.getUserData();
            this.getIndex = 0;
          } else {
            this.getIndex = this.getIndex - 1;
            this.getUserData();
          }
        } else {
          this.getUserData();
          this.router.navigateByUrl('/bank-details');
        }
      }
      this.commonService.closeProgressBarLoading();
    });
  }

  forwardQR(isBackorNext) {
    let length;
    if (this.segment == 'shopUPI') {
      length = this.retailerPaymentInfo.length
    } else {
      length = this.userPaymentInfo.length
    }
    //let length = this.userPaymentInfo.length
    console.log(length, 'length')
    console.log(this.getIndex, 'getIndex');

    if (isBackorNext == 'next') {
      if (this.getIndex == length - 1) {
        this.getIndex = 0;
        this.changeQR(this.getIndex)
      } else {
        this.getIndex = this.getIndex + 1
        this.changeQR(this.getIndex)
      }
    } else {
      if (this.getIndex == 0) {
        this.getIndex = length - 1
        this.changeQR(this.getIndex)
      } else {
        this.getIndex = this.getIndex - 1
        this.changeQR(this.getIndex)
      }
    }
  }

  // Get Retailer details from backend
  getRetailerData() {
    this.commonService.presentProgressBarLoading()
    this.userService.getRetailerUPI(this.orderTripDetail?.retailerId ? this.orderTripDetail?.retailerId : null).subscribe((upiDetails: any) => {
      this.commonService.closeProgressBarLoading()
      this.retailerPaymentInfo = upiDetails.data;
      console.log(this.retailerPaymentInfo);
      if (!isNaN(this.getIndex)) {
        // this.displayUserPaymentInfo = this.userPaymentInfo[this.getIndex].qrImage;
        this.displayRetailerPaymentInfo = this.retailerPaymentInfo[this.getIndex]?.qr_image ? this.retailerPaymentInfo[this.getIndex]?.qr_image : './assets/banking/not-found.png';
        // Display User name, mobile, UPI icon and UPI id after page load
        this.displayUserUpiIcon = this.retailerPaymentInfo[this.getIndex]?.app;
        this.displayUserName = this.retailerPaymentInfo[this.getIndex]?.name;
        this.displayUserMobile = this.retailerPaymentInfo[this.getIndex]?.mobile;
        this.displayUserUpi = this.retailerPaymentInfo[this.getIndex]?.upi;

        //this.retailerId = this.userPaymentInfo[this.getIndex]?.r_id;
        this.paymentInfoId = this.retailerPaymentInfo[this.getIndex]?.payment_info_id;
      }
    }, err => {
      this.commonService.closeProgressBarLoading()
      console.log(err);
    });
  }

  // Upload QR Code Image
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.uploadQrCodeImageFromGallery(1);
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            this.uploadQrCodeImageFromGallery(0);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
            // this.uploadUpiId = [];
          }
        }]
    });
    await actionSheet.present();
  }

  // Upload QR code Image from gallery
  uploadQrCodeImageFromGallery(source) {
    this.userService.getQrCodeImageUploadUrl().subscribe((res: any) => {
      this.commonService.presentLoader().then(presentLoader => {
        presentLoader.present()
        if (res.data.uploadURL) {
          this.photoService.takePhoto(source).then((img) => {
            if (img?.success) {
              this.qrCodeURL = Capacitor.convertFileSrc(img.mediaPath);
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
                  //upi has to be changed
                  console.log("getIndex: ", this.getIndex);
                  console.log("userPaymentInfo: ", this.userPaymentInfo[this.getIndex]);
                  this.upiFormData = {
                    "deliveryBoyId": this.userId,
                    "active": true,
                    "app": this.userPaymentInfo[this.getIndex].app,
                    "mobile": this.userPaymentInfo[this.getIndex].mobile,
                    "name": this.userPaymentInfo[this.getIndex].name ? this.userPaymentInfo[this.getIndex].name : 'sarvm',
                    "QRimage": res.data.url,
                    "upi": this.userPaymentInfo[this.getIndex].upi,
                    "rId": "rId"
                  }
                  console.log("upiFormData: ", this.upiFormData);
                  let paymentInfoId = this.userPaymentInfo[this.getIndex]._id;
                  presentLoader.dismiss()
                  this.updateUpi(paymentInfoId, this.upiFormData, presentLoader);
                  // this.getUserData();
                }
              }, (err) => {
                console.log(err);
                presentLoader.dismiss()
                this.commonService.danger(JSON.stringify(err));
              });
            } else {
              presentLoader.dismiss()
            }
          });
        } else {
          presentLoader.dismiss()
        }
      });
    })
  }

  // ---- Not using for now --- //
  // Update user's details
  updateUpi(paymentInfoId, formData, presentLoader?) {
    this.userService.updateUPI(paymentInfoId, formData).subscribe((res: any) => {
      presentLoader.dismiss()
      if (res.success) {
        this.commonService.success('User UPI Updated !!');
        this.getUserData();
      } else if (res && res.error) {
        this.commonService.danger(res.error.message);
      }
      presentLoader.dismiss()
    }, err => {
      presentLoader.dismiss()
      this.commonService.danger(err.error.error.message)
    })
  }

  viewChange(event) {
    console.log('event clicked' ,event);
  }

  viewYes() {
    if(this.segment == 'myUPI') {
      this.isPayment = true;
      this.segment = 'shopUPI'
    } else {
      if(!this.isPayment && this.orderTripDetail?.expectedEarning !== 'N/A' ) {
        this.segment = 'myUPI'
      } else {
        this.modalCtrl.dismiss({"status":"Yes"});
      }
    }
  }

  viewNo() {
    if(this.segment == 'myUPI') {
      this.isPayment = false;
    }
    this.modalCtrl.dismiss({"status":"No"});
  }

}
