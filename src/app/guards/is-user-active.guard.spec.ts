import { TestBed } from '@angular/core/testing';

import { IsUserActiveGuard } from './is-user-active.guard';

describe('IsUserActiveGuard', () => {
  let guard: IsUserActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsUserActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
