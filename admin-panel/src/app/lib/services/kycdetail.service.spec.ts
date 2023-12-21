import { TestBed } from '@angular/core/testing';

import { KycdetailService } from './kycdetail.service';

describe('KycdetailService', () => {
  let service: KycdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
