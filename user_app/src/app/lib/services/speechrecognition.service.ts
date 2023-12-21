import { Injectable } from '@angular/core';
import { SpeechRecognition, SpeechRecognitionListeningOptions } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { NativepermissionsService } from './nativepermissions.service';

@Injectable({
  providedIn: 'root'
})
export class SpeechrecognitionService {

  constructor(private speechRecognition: SpeechRecognition,
    private NativepermissionsService: NativepermissionsService,) { }

  checkPermission() {
    /* this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      if (!hasPermission) {
        this.speechRecognition.requestPermission().then(() =>
          console.log('Granted'), () => console.log('Denied'));
      }
    }); */
  }

  // startRecognition() {
  //   debugger;
  //   return new Promise((resolve, reject) => {
  //     this.NativepermissionsService.checkRecordAudioPermission().then((res) => {
  //       if (res && res?.status) {
  //         this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
  //           console.log(available);
  //           if (available) {
  //             //this.recording = true;
  //             let options: SpeechRecognitionListeningOptions = {
  //               language: "en-US",
  //               matches: 2,
  //               prompt: "Say something",
  //               showPartial: true,
  //               showPopup: true,
  //             };
  //             this.speechRecognition.startListening(options).subscribe((matches: string[]) => {
  //               console.log(matches);
  //               resolve({"data":matches, "status": true});
  //             }, (onerror) => {
  //               console.log('errorMsg:', onerror)
  //               reject({"errorMsg":onerror, "status": false});
  //             })
  //           }
  //         });
  //       } else {
  //         reject({"errorMsg": res?.errorMsg, "status": false});
  //       }
  //     }).catch((err) => {
  //       console.log(err);
  //       reject(err);
  //     });
  //   });
  // }

  // stopRecognition() {
  //   //this.recording = false;
  //   return this.speechRecognition.stopListening();
  // }

}
