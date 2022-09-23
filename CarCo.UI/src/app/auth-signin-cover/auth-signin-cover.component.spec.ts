import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSigninCoverComponent } from './auth-signin-cover.component';

describe('AuthSigninCoverComponent', () => {
  let component: AuthSigninCoverComponent;
  let fixture: ComponentFixture<AuthSigninCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSigninCoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSigninCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
