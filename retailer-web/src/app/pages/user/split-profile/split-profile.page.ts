import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-split-profile',
  templateUrl: './split-profile.page.html',
  styleUrls: ['./split-profile.page.scss'],
})
export class SplitProfilePage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  editProfile(){
    this.router.navigate(['/edit-profile']);

  }
}
