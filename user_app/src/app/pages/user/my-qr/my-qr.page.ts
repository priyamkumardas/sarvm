import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { CommonService } from 'src/app/lib/services/common.service';
import { InviteModalComponent } from 'src/app/referal/invite-modal/invite-modal.component';
import { UserService } from 'src/app/lib/services/user.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-qr',
  templateUrl: './my-qr.page.html',
  styleUrls: ['./my-qr.page.scss'],
})
export class MyQrPage implements OnInit {
  userData: any;
  base64Url: any
  profileUrl: any;
  addDisable : boolean= false;

  constructor(public commonservice: CommonService, private userService:UserService,private modalCtrl: ModalController,private storageservice: StorageService,) { }

  ngOnInit() {
    this.getUserDetails()
    this.profileUrl = this.storageservice.getItem(Constants.PROFILE_URL)  ? this.storageservice.getItem(Constants.PROFILE_URL) : 'sarvm.ai'
  }

  getUserDetails() {
    this.commonservice.presentLoading();
    this.userService.getUserDetails().subscribe(res => {
      this.commonservice.dissmiss_loading();
      this.userData = res['data'];
    }, err => {
      this.commonservice.dissmiss_loading();
    })
  }

  async shareQr() {
    this.addDisable = true;
   let appLink = environment.sarvmAllApps.publicPage
    let Userapplink = 'https://play.google.com/store/apps/details?id=com.sarvm.hh&hl=en-US&ah=uI6maScqUW8bclH7s_fV8-tJw58';
    // const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    // this.base64Url = canvas.toDataURL('image/jpeg')
    let message = `Hey! Check out SarvM.AI, an app digitizing the food supply chain. Download the app now  ${appLink}. Use my QR code for referal.  'My Contact number : ${this.commonservice.userData.phone}`
    let link = this.profileUrl
    this.commonservice.shareQr(message, link, true).then(res=>{
      this.addDisable = false;
    })
    console.log(message)
    console.log(link)
  }


  downloadQr() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg')
    console.log(imageData);
    this.commonservice.savePicture(imageData, this.userData.phone)
  }
}
