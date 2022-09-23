import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyListComponent } from './emergency-list.component';

describe('EmergencyListComponent', () => {
  let component: EmergencyListComponent;
  let fixture: ComponentFixture<EmergencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
