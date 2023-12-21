import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {

  constructor(
    private sms: SMS
  ) { }

  async checkIfNetworkConnected() {
    let networkStatus = await Network.getStatus();
    console.log(networkStatus);
    return networkStatus.connected;
   }

   sendSms(message, phone) {
    this.sms.send(phone, message);
   }
}
