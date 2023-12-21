import { Injectable } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ActionPerformed, Channel, PushNotificationSchema, PushNotifications, Token, } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { OrderNewComponent } from 'src/app/components/order-new/order-new.component';
import { CommonService } from 'src/app/lib/services/common.service';
import { LocationService } from '../../lib/services/location.service';
import { OrderAcceptedComponent } from 'src/app/components/order-accepted/order-accepted.component';
import { OrderPickupPage } from 'src/app/pages/orders/order-pickup/order-pickup.page';
import { OrderDeliveryPage } from 'src/app/pages/orders/order-delivery/order-delivery.page';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  fcmToken: string;
  notifyInfo: any;
  location = {
    lat: null,
    lon: null,
  }
  sound;
  constructor(private modalCtrl: ModalController,
    private router: Router,
    public commonService: CommonService,
    private locationService: LocationService,
    private toastController: ToastController) {

  }

  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }

  private async registerPush() {
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
      this.fcmToken = token.value;
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      //alert('Error on registration: ' + JSON.stringify(error));
      console.log('Error on registration: ' + JSON.stringify(error))
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      //alert('Push received: ' + JSON.stringify(notification));
      console.log('Push received: ' + JSON.stringify(notification))
      this.notifyInfo = notification;
      if (this.notifyInfo && this.notifyInfo?.data?.trip && JSON.parse(this.notifyInfo?.data?.trip).status === 'NEW') {
        this.showToastWithCloseButton(JSON.parse(this.notifyInfo?.data?.trip));
      }
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      //alert('Push action performed: ' + JSON.stringify(notification));
      console.log('Push action performed: ' + JSON.stringify(notification))
      this.notifyInfo = notification;
      if (this.notifyInfo && this.notifyInfo?.notification && this.notifyInfo?.notification?.data?.trip && JSON.parse(this.notifyInfo?.notification?.data?.trip).status === 'NEW') {
        this.showToastWithCloseButton(JSON.parse(this.notifyInfo.notification.data.trip));
      }
    });
  }

  getLocation() {
    return this.locationService.getLocation().then(res => {
      this.commonService.hasCurrentLocation = false;
      return this.location = {
        lat: res.coords.latitude,
        lon: res.coords.longitude
      }
      //console.log(this.location)
      //this.getAddress(this.location)
    }).catch(err => {
      return this.commonService.alert('Location permission', 'Location is needed for the app to work properly, kindly go to settings and provide location permission to app.', 'Ok', 'Cancel', () => this.getLocation(), () => history.back());
    });
  }

  async newOrderScreenPopUp(newOrderInfo: any) {
    const cLocation = await this.getLocation().then(result => result);
    const model = await this.modalCtrl.create({
      component: newOrderInfo.status == "NEW" ? OrderNewComponent : null,
      // newOrderInfo.status == "ACCEPTED" ? OrderAcceptedComponent : 
      // newOrderInfo.status == "REJECTED" ? OrderNewComponent : null,
      componentProps: { isModal: false, newOrderData: newOrderInfo, currentLocation: cLocation }
    });
    this.modalCtrl.dismiss();
    await model.present();
    const { data } = await model.onWillDismiss();
  }

  async showToastWithCloseButton(notification) {
    if (this.sound) {
      this.sound?.pause()
    }
    this.sound = new Howl({
      src: ['assets/sound/notificationsound.wav'],
      loop: true
    });
    this.sound.play();
    const toast = await this.toastController.create({
      message: notification.status == "NEW" ? 'New Trip Received' : 'New notification received.',
      position: 'top',
      mode: 'ios',
      icon: 'happy-outline',
      color: 'primary',
      buttons: [
        {
          side: 'end',
          text: 'Details',
          handler: () => {
            this.newOrderScreenPopUp(notification)
            this.sound.pause();
          }
        }, {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.sound.pause();
          }
        }
      ]
    });
    toast.present();
  }

}

