import { TestBed } from '@angular/core/testing';

import { PaymentdoneGuard } from './paymentdone.guard';

describe('PaymentdoneGuard', () => {
  let guard: PaymentdoneGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaymentdoneGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
