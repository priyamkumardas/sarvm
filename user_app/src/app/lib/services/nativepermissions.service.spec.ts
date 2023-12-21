import { TestBed } from '@angular/core/testing';

import { NativepermissionsService } from './nativepermissions.service';

describe('NativepermissionsService', () => {
  let service: NativepermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NativepermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
