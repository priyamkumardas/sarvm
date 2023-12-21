import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddressPageComponent } from './shop-address-page.component';

describe('ShopAddressPageComponent', () => {
  let component: ShopAddressPageComponent;
  let fixture: ComponentFixture<ShopAddressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopAddressPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopAddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
