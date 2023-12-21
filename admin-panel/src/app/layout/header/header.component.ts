import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "src/app/lib/services/auth.service";
import { StorageService } from 'src/app/component/storage.service';
import { Constants } from 'src/app/config/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showMenu = true
  constructor(
    private auth: AuthService,
    private router: Router,
    private storage: StorageService
  ) { }


  logout(){
    this.showMenu=false;
    this.storage.remove(Constants.AUTH_TOKEN);
    this.router.navigate(['/login'])
  }



  ngOnInit(): void {

    const token = this.storage.getItem(Constants.AUTH_TOKEN) ? true : false;

    if(token){
      console.log(token)
      this.showMenu = true
    }
    else{
      console.log(token)
      this.showMenu = false
    }

  }


}
