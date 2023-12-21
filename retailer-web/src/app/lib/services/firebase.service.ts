import { Injectable } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token, } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { FullNotificationPage } from 'src/app/support/full-notification/full-notification.page';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  fcmToken: string;

  constructor(private modalCtrl: ModalController,) { }
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
      this.fcmToken=token.value;
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      //alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived',(notification: PushNotificationSchema) => {
        //alert('Push received: ' + JSON.stringify(notification));
        this.openFullScreenPopUp();
      },
    );

    PushNotifications.addListener('pushNotificationActionPerformed',(notification: ActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification));
      },
    );

  }


  async openFullScreenPopUp() {
    const model = await this.modalCtrl.create({
      component: FullNotificationPage,
      cssClass: 'DeliveryDayPreference-component-css',
      componentProps: {
      },
    });
    await model.present();
    const { data } = await model.onWillDismiss();
  }

}
