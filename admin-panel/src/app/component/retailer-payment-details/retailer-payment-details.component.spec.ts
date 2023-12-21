import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerPaymentDetailsComponent } from './retailer-payment-details.component';

describe('RetailerPaymentDetailsComponent', () => {
  let component: RetailerPaymentDetailsComponent;
  let fixture: ComponentFixture<RetailerPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
