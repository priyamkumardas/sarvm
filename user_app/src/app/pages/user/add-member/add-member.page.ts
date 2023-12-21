import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { OtpComponent } from './otp/otp.component';
import { ModalController} from '@ionic/angular';
import { ProfilePhotoOptionComponent } from 'src/app/components/profile-photo-option/profile-photo-option.component';
@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

  photo ;
  form: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private modalCtrl : ModalController,
    public fb: FormBuilder,) {

    this.form = fb.group({
      mobileNumber: ['', [Validators.required , Validators.pattern ("^((\\+91-?)|0)?[0-9]{10}$")]],
      name :      ['', [Validators.required , Validators.pattern ("[a-zA-Z][a-zA-Z ]+")]],
      relation:     ['', [Validators.required , Validators.pattern ("[a-zA-Z][a-zA-Z ]+")]],
    })
    this.flag = true;
  }

  ngOnInit() { }
  get f(){
    return this.form.controls;
  }
  url;
  flag ;
  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event.target.result;
        this.flag = false ;
      };
    }
  }


  async otpBoxModal(){
    const model = await this.modalCtrl.create({
      component : OtpComponent,
      cssClass : 'OtpBox-AddMember',
    })
     return await model.present();
  }

  async openSelectImageModal(){
    const model = await this.modalCtrl.create({
      component: ProfilePhotoOptionComponent,
      cssClass: 'bottomModal',
    });
    model.onDidDismiss()
    .then(res => {
      console.log(res);
      if (res.role !== 'backdrop') {
        this.takePicture(res.data);
      }
    });
    return await model.present(); 
  }
  async takePicture(type)  {
   //  const image = await Camera.getPhoto({
   //    quality: 90,
   //    allowEditing: false,
   //    resultType: CameraResultType.Uri,
   //    source:CameraSource[type]
   //  });

   // this.photo = image.webPath;
  };
}