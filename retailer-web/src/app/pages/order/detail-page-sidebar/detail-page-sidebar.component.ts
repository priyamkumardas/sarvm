import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export enum OrderStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  PROCESSING = 'PROCESSING',
  READY = 'READY',
  DELIVERY = 'DELIVERY',
  DISPATCHED = 'DISPATCHED',
  IN_TRANSIT = 'IN_TRANSIT',
  PICKEDUP = 'PICKEDUP',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
}

@Component({
  selector: 'app-detail-page-sidebar',
  templateUrl: './detail-page-sidebar.component.html',
  styleUrls: ['./detail-page-sidebar.component.scss'],
})
export class DetailPageSidebarComponent implements OnInit {
  @Input('orders1') orders;
  @Input() id:any;
  @Input('selected-tab') selectedTab = OrderStatus.NEW;
  @Output() orderStateChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router) { }
  ngOnInit() {}
  gotoOrderDetails(orders1) {
    this.id = orders1.orderID;
    // this.router.navigate(['/order-details', orders1.orderID, orders1.status]);
    console.log('order',orders1.orderID,"status",orders1.status)
    this.router.navigate(['/order-details', orders1.orderID, orders1.status]);
  }
  
}