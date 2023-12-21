import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-blocks',
  templateUrl: './add-blocks.page.html',
  styleUrls: ['./add-blocks.page.scss'],
})
export class AddBlocksPage implements OnInit {
  name = 'Dynamic add fields';
  values = [];

  public addblockform: FormGroup;
  private blockcount: number = 1;  

  count = 0;
  textValue = "Value";

  ngOnInit() {
  }

  constructor(private formBuilder: FormBuilder) { 
    this.addblockform = formBuilder.group({
      block1: ['', Validators.required]
    });
  }

  //  addbutton function 
  addBlock(){
    this.blockcount++;
    this.addblockform.addControl('block' + this.blockcount, new FormControl('', Validators.required));
  }
  

}
