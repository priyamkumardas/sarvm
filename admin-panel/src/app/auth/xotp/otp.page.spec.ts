import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OtpPage } from './otp.page';

describe('OtpPage', () => {
  let component: OtpPage;
  let fixture: ComponentFixture<OtpPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpPage ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(OtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
