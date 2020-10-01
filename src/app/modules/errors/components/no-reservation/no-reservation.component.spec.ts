import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoReservationComponent } from './no-reservation.component';

describe('NoReservationComponent', () => {
  let component: NoReservationComponent;
  let fixture: ComponentFixture<NoReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
