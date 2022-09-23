import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeDetailsComponent } from './vehicle-type-details.component';

describe('VehicleTypeDetailsComponent', () => {
  let component: VehicleTypeDetailsComponent;
  let fixture: ComponentFixture<VehicleTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTypeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
