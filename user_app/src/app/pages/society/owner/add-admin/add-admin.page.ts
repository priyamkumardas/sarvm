import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.page.html',
  styleUrls: ['./add-admin.page.scss'],
})
export class AddAdminPage implements OnInit {
  name = 'Dynamic add fields';
  values = [];

  public addadminform: FormGroup;
  private admincount: number = 1;

  // count = 1;
  // incrementCount() {
  //   this.count++;
  // }

  count = 0;
  textValue = "Value";

  ngOnInit() {
  }

  constructor(private formBuilder: FormBuilder) { 
    this.addadminform = formBuilder.group({
      admin1: ['', Validators.required]
    });
  }

  //  addbutton function 
  addAdmin(){
    this.admincount++;
    this.addadminform.addControl('admin' + this.admincount, new FormControl('', Validators.required));
  }

}
