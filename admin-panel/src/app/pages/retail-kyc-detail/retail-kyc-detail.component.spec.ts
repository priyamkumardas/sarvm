import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailKycDetailComponent } from './retail-kyc-detail.component';

describe('RetailKycDetailComponent', () => {
  let component: RetailKycDetailComponent;
  let fixture: ComponentFixture<RetailKycDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailKycDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailKycDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
