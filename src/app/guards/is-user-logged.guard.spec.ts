import { TestBed } from '@angular/core/testing';

import { IsUserLoggedGuard } from './is-user-logged.guard';

describe('IsUserLoggedGuard', () => {
  let guard: IsUserLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsUserLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
