import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-medium-card',
  templateUrl: './img-medium-card.component.html',
  styleUrls: ['./img-medium-card.component.scss'],
})
export class ImgMediumCardComponent implements OnInit {

  @Input() content;
  
  constructor() { }

  ngOnInit() {}

}
