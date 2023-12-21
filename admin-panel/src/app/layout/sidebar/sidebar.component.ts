import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "src/app/lib/services/auth.service";
import { StorageService } from 'src/app/component/storage.service';
import { Constants } from 'src/app/config/constants';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']

})
export class SidebarComponent implements OnInit {
  @Input() sideNavStatus: boolean = true;


  // @Input() sideNavStatus: boolean = false;
 list = [
  {
    number:'1',
    name:'home',
    icon:'fa-solid fa-house',
   },
   {
    number:'1',
    name:'Analytics',
    icon:'fa-solid fa-house',
   },
   {
    number:'1',
    name:'Products',
    icon:'fa-solid fa-house',
   },
   {
    number:'1',
    name:'Order',
    icon:'fa-solid fa-house',
   }
 ]

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
  }
  emplist(){
    //alert("under development");
    this.router.navigate(['/app-emplist']);
  }
  addproductdetails(){
    this.router.navigate(['/add-product-details']);
  }
  productform(){
    this.router.navigate(['/product-form'])
  }
  productlist(){
    this.router.navigate(['/product-list'])
  }
  product(){
    this.router.navigate(['/product-form'])
  }

  category(){
    this.router.navigate(['/category-form'])
  }

}
