import { TestBed } from '@angular/core/testing';

import { SigninFacade } from './signin-facade.service';

describe('SigninFacadeService', () => {
  let service: SigninFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
