import { TestBed } from '@angular/core/testing';

import { ShopaddressService } from './shopaddress.service';

describe('ShopaddressService', () => {
  let service: ShopaddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopaddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
