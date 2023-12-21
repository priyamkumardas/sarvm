import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehiclePollutionCertificateComponent } from './vehicle-pollution-certificate.component';

describe('VehiclePollutionCertificateComponent', () => {
  let component: VehiclePollutionCertificateComponent;
  let fixture: ComponentFixture<VehiclePollutionCertificateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclePollutionCertificateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclePollutionCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
