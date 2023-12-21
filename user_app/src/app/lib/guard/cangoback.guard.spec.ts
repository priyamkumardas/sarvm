import { TestBed } from '@angular/core/testing';

import { CangobackGuard } from './cangoback.guard';

describe('CangobackGuard', () => {
  let guard: CangobackGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CangobackGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
