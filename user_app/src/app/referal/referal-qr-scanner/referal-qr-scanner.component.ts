import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { CommonService } from 'src/app/lib/services/common.service';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { PhotoService } from 'src/app/lib/services/photo.service';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/lib/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-referal-qr-scanner',
  templateUrl: './referal-qr-scanner.component.html',
  styleUrls: ['./referal-qr-scanner.component.scss'],
})
export class ReferalQrScannerComponent implements OnInit {

  phone: any;
  returnUrl: any;
  resultContent: any;
  constructor(public commonService: CommonService, private transfer: FileTransfer, private photoService: PhotoService, private modalCtrl: ModalController, private userService: UserService, private route: ActivatedRoute ,private router : Router) {

  }


  ngOnInit() {
    this.commonService.presentLoading();
    this.route.queryParams.subscribe((res) => {
      this.commonService.dissmiss_loading()
      this.returnUrl = res.returnUrl;
      this.phone = res.phone;
      console.log(res)
    }, err =>{
      this.commonService.dissmiss_loading()
    })
  }

  ionViewWillEnter() {
    this.startScanner();
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = this.checkPermission().then(res=>{
      BarcodeScanner.hideBackground();
      BarcodeScanner.startScan().then(res=>{
        if (res.hasContent) {
          this.resultContent = res.content;
          this.toOtp();
        }else {
          console.log('No Data Found')
          this.stopScanner();
        }
      });
    }).catch(err=>{
        console.log('NOT ALLOWED!')
        this.stopScanner();
        history.back();
    });
    
  }

  toOtp(){
    this.router.navigate(['otp', btoa(JSON.stringify(this.phone))], {
      queryParams: {
        returnUrl: this.returnUrl,
        resultData : this.resultContent
      },
      replaceUrl: true
    });
  }

  stopScanner() {
    BarcodeScanner.stopScan();
  }

  ionViewWillLeave() {
    this.stopScanner();
  }

  goBack() {
    this.ionViewWillLeave()
    this.router.navigate(['/login' ], {
      queryParams: { returnUrl: this.returnUrl }
    });
  }

}
