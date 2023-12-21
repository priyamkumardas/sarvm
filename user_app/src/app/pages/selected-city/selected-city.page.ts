import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { Location } from '@angular/common';




@Component({
  selector: 'app-selected-city',
  templateUrl: './selected-city.page.html',
  styleUrls: ['./selected-city.page.scss'],
})
export class SelectedCityPage implements OnInit {

  searchCity;
  localListOfCity;
  ListFromApi = [
    {
      id: 1,
      title: 'delhiborder',
      cityUrl: '../../../assets/images/delhicity.svg',
      subname: 'Delhi',
    },
    {
      id: 2,
      title: 'mumbaiborder',
      cityUrl: '../../../assets/images/Rectangle 40.svg',
      subname: 'Mumbai',
    },
    {
      id: 3,
      title: 'hyderabadborder',
      cityUrl: '../../../assets/images/Rectangle 41.svg',
      subname: 'Hyderabad',
    },
    {
      id: 4,
      title: 'kolkataborder',
      cityUrl: '../../../assets/images/Rectangle 42.svg',
      subname: 'Kolkata',
    },
    {
      id: 5,
      title: 'noidaborder',
      cityUrl: '../../../assets/images/Rectangle 43.svg',
      subname: 'Noida',
    },
    {
      id: 6,
      title: 'chennaiborder',
      cityUrl: '../../../assets/images/Rectangle 44.svg',
      subname: 'Chennai',
    },
    {
      id: 7,
      title: 'lucknowborder',
      cityUrl: '../../../assets/images/Rectangle 45.svg',
      subname: 'Lucknow',
    },
    {
      id: 8,
      title: 'agraborder',
      cityUrl: '../../../assets/images/Rectangle 46.svg',
      subname: 'Agra',
    },
    {
      id: 9,
      title: 'puneborder',
      cityUrl: '../../../assets/images/Rectangle 47.svg',
      subname: 'Pune',
    },
    {
      id: 10,
      title: 'amritsarborder',
      cityUrl: '../../../assets/images/Rectangle 48.svg',
      subname: 'Amritsar',
    },
    {
      id: 11,
      title: 'gurgaonborder',
      cityUrl: '../../../assets/images/Rectangle 49.svg',
      subname: 'Gurgaon',
    },
    {
      id: 12,
      title: 'kochiborder',
      cityUrl: '../../../assets/images/Rectangle 50.svg',
      subname: 'Kochi',
    },
  ];

  selctedCityId = 0;
  s: number;
  isCity: any;
  constructor(private router: Router) {

    this.localListOfCity = this.ListFromApi;
  }

  searchFunction(){
     
    this.localListOfCity = this.ListFromApi.filter((city) =>{

       if( city.subname.toLowerCase().includes(this.searchCity.toLowerCase())){
          return city ;
       }
    })
  }
  ngOnInit(): void {}

  /**
   * @name onSelect
   * @type Event - On click select screen
   * **/
  // onSelect(selctedCId: number): void {
  //   this.selctedCityId = selctedCId;
  // }

  onSelect(isCity: any){
    this.isCity = isCity;
    this.s=1;

  }

  selectCity(){
    if(this.s===1)
    {
      this.router.navigate(['/tabs/home']);
    }

  }
  
}
