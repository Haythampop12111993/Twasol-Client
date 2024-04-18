import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mianGuard } from './mian.guard';

describe('mianGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => mianGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
