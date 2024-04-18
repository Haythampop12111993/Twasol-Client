import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { createProfileGuard } from './create-profile.guard';

describe('createProfileGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => createProfileGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
