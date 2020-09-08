import { TestBed } from '@angular/core/testing';

import { HasCurrentBookingGuard } from './has-current-booking.guard';

describe('HasCurrentBookingGuard', () => {
  let guard: HasCurrentBookingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasCurrentBookingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
