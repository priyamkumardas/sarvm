import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/lib/services/user.service';
import { CommonService } from 'src/app/lib/services/common.service';
import { StorageService } from 'src/app/lib/services/storage.service';
import { LocationService } from 'src/app/lib/services/location.service';
import { Constants } from 'src/app/config/constants';
import { DeletePopupComponent } from 'src/app/components/delete-popup/delete-popup.component';
import { ModalController } from '@ionic/angular'; 
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-saved-address',
  templateUrl: './saved-address.page.html',
  styleUrls: ['./saved-address.page.scss'],
})
export class SavedAddressPage implements OnInit {

  address: any;
  isLoading: boolean;

  constructor(private userService: UserService,  public commonService: CommonService, private storageService: StorageService, private modalCtrl: ModalController, private alertController: AlertController, private locationService: LocationService,) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAllAddress();    
  }

  getAllAddress(data?) {
    // this.commonService.presentLoading();
    this.commonService.presentProgressBarLoading()
    this.userService.getAllAddress().subscribe(res => {
      // this.commonService.dissmiss_loading()
      this.commonService.closeProgressBarLoading()
      console.log(res);
      this.address = res['data'];
      if(data && data.location.latitude == this.storageService.getItem(Constants.USER_LOCATION)?.lat && data.location.longitude == this.storageService.getItem(Constants.USER_LOCATION)?.lon){
        let address = {
          display_name: this.address[0].streetAddress + ' near ' + this.address[0].landmark + ' ' + this.address[0].region + ' ' + this.address[0].city + ' ' + this.address[0].state + ' ' + this.address[0].country + ' ' + this.address[0].pincode,
          lat: this.address[0].location.latitude,
          lon: this.address[0].location.longitude,
          addressType: this.address[0].addressType
        }
        this.locationService.currentLatLong = {
          lat: this.address[0].location.latitude,
          lon: this.address[0].location.longitude
        };
        this.storageService.setItem(Constants.USER_LOCATION, address)
        this.locationService.locationGot.next(true);
      }
      this.storageService.setItem(Constants.USER_SAVED_LOCATION, res['data']);
    },err=>{
      // this.commonService.dissmiss_loading()
      this.commonService.closeProgressBarLoading()
    })
  }

  async deletePopup(aid) {
    const model = await this.modalCtrl.create({
      component: DeletePopupComponent,
      cssClass: 'DeliveryDayPreference-component-css',
    });
    await model.present();
    const { data } = await model.onWillDismiss();
    console.log(data);
    if (data.status == 'Yes') {
      this.deleteAddress(aid)
    }
  }

  deleteAddress(data) {
    // this.commonService.presentLoading();
    console.log(data)
    this.commonService.presentProgressBarLoading()
    this.userService.deleteAddress(data._id).subscribe(res => {
      // this.commonService.dissmiss_loading()
      this.commonService.closeProgressBarLoading()
      this.commonService.success('Address Deleted !!');
      if (this.address.length == 1) {
        localStorage.removeItem(Constants.USER_SAVED_LOCATION);
        if(data.location.latitude == this.storageService.getItem(Constants.USER_LOCATION)?.lat && data.location.longitude == this.storageService.getItem(Constants.USER_LOCATION)?.lon){
          localStorage.removeItem(Constants.USER_LOCATION);
          this.locationService.locationGot.next(true);
        }
      }
      this.getAllAddress(data);
    },err=>{
      console.log(err);
      // this.commonService.dissmiss_loading()
      // this.commonService.success();
        this.commonService.closeProgressBarLoading()
    })
  }

}
