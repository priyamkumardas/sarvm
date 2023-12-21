import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReferralService } from '../referral.service';

@Component({
  selector: 'app-invite-category',
  templateUrl: './invite-category.component.html',
  styleUrls: ['./invite-category.component.scss'],
})
export class InviteCategoryComponent implements OnInit {

  refCategory= [
    {
      name: "Consumer",
      value: 'INDIVIDUAL',
      languageKey: "Consumer",
      image:"/assets/InvitePageImg2/person.png"
    },
    { 
      name: 'Retailer',
      value: 'RETAILER',
      languageKey: "RETAILER",
      image: '/assets/InvitePageImg2/storefront.png'
    },
    { 
      name: "Delivery Valet",
      value: 'LOGISTICS_DELIVERY',
      languageKey: "Deliveryvalet",
      image:"assets/InvitePageImg2/Group 7737.png"
    },
    { 
      name: "Wholesaler",
      value: 'Wholesaler',
      languageKey: "wholesaler",
      image:"/assets/InvitePageImg/bi_shop.png"
    },
    { 
      name: "Farmer",
      value: 'Farmer',
      languageKey: "farmer",
      image:"/assets/InvitePageImg/Farmer.png"
    },
    { 
      name: "Trader/Broker",
      value: 'Trader/Broker',
      languageKey: "Trader/Broker",
      image:"/assets/InvitePageImg/broker.png"
    },
    { 
      name: "Delivery Partner",
      value: 'Delivery Partner',
      languageKey: "Deliverypartner",
      image:"/assets/InvitePageImg/Truck.png"
    },
    { 
      name: "Other",
      value: 'Other',
      languageKey: "other",
      image:"/assets/InvitePageImg/Other.png"
    },
  ]

  constructor(
    private modalCtrl: ModalController,
    private referralService: ReferralService
  ) {}

  ngOnInit() {}

  action(arg,idx:any, type?) {
    console.log(idx)
    this.referralService.setInviteeData(type);
    // return this.modalCtrl.dismiss(arg);
    if (idx > 2) this.notAvailable();
    else
    this.referralService.openReferralForm();
  }

  notAvailable(){
    this.referralService.showToast();
  }

  refferalclose() {
    this.referralService.closeReferralModal();
  }

  close(arg) {
    return this.modalCtrl.dismiss(arg);
  }

  // openMyRewardsModal() {
  //   this.referralService.openMyRewardsModal();
  // }
}
