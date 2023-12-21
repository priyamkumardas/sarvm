import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PhotoService } from 'src/app/lib/services/photo.service';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DashboardComponent } from 'src/app/referal/dashboard/dashboard.component';
import { Constants } from 'src/app/config/constants';

import { CommonService } from '../../../lib/services/common.service';
import { AuthService } from '../../../lib/services/auth.service';

import { ReferralService } from 'src/app/referal/referral.service';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/lib/services/cart.service';
import { UserService } from 'src/app/lib/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileURL: string;
  @ViewChild(IonModal) modal: IonModal;
  userData: any;
  ionVersionNumber: string;
  appEnvirorment = environment.production
  wantToDelete;
  that = this;
  flag: boolean = false;
  order: any;
  limit = 3;
  offset = 0;
  orderSet= [
    {
      type: 'activeOrders',
      defaultValue: 'Active Orders',
      value: null
    },
    {
      type: 'pastOrders',
      defaultValue: 'Past Orders',
      value: null
    },
  ]

  @Output() orderStateChange: EventEmitter<any> = new EventEmitter<any>();
  deliveryDate= 'ALL';

  constructor(
    private router: Router,
    private photoService: PhotoService,
    public commonservice: CommonService,
    public refferalservice: ReferralService,
    private platform: Platform,
    private cartService: CartService,
    private alertCtrl: AlertController,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is("android") || (this.platform.is("ios"))) {
        this.commonservice.appCheckUpdate()
      }
    });
  }

  ngOnInit() {
    this.userData = this.commonservice.userData;
  }

  ionViewWillEnter(){
    let statusSegmentActive = 'NEW,PROCESSING,READY,ACCEPTED,DISPATCHED,DELIVERED';
    this.getActiveOrders(statusSegmentActive); 
    let statusSegmentPast = 'COMPLETED,CANCELLED,REJECTED,NO_SHOW'
    this.getPastOrders(statusSegmentPast)
  }

  getActiveOrders(order_type) {
    this.cartService.getOrders(order_type,this.limit,this.offset, this.deliveryDate).subscribe(res => {
      this.flag = true
      this.orderSet[0].value = res['data'];
    }, error => {
      this.flag = true
      this.commonservice.toast(error.error.error.message)
    })
  }

  getPastOrders(order_type) {
    this.cartService.getOrders(order_type,this.limit,this.offset, this.deliveryDate).subscribe(res => {
      this.flag = true
      this.orderSet[1].value = res['data'];
    }, error => {
      this.flag = true
      this.commonservice.toast(error.error.error.message)
    })
  }

  addPhotoToGallery(source) {
    this.photoService.takePhoto(source).then((img) => {
      this.profileURL = img;
    });
  }

  refferalModule() {
    this.router.navigate['/referal']
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  logout(){
    this.commonservice.customeAlert('Log Out','Are You Sure?',()=>{this.authService.logOutUser()},()=>{});
  }

  editProfile() {
    this.router.navigate(['/user-edit-profile'])
  }
  moveToStoreListing() {
    let url = '/tabs/favourites' 
    this.router.navigateByUrl(url, { state: { page: "favourites" } });
  }
}
