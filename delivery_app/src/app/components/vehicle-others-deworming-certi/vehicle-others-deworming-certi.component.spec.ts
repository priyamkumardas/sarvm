import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehicleOthersDewormingCertiComponent } from './vehicle-others-deworming-certi.component';

describe('VehicleOthersDewormingCertiComponent', () => {
  let component: VehicleOthersDewormingCertiComponent;
  let fixture: ComponentFixture<VehicleOthersDewormingCertiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleOthersDewormingCertiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleOthersDewormingCertiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
