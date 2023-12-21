import { TestBed } from '@angular/core/testing';

import { UserpreferenceGuard } from './userpreference.guard';

describe('UserpreferenceGuard', () => {
  let guard: UserpreferenceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserpreferenceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
