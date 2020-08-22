import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstNameFormComponent } from './firstNameForm.component';

describe('FirstNameFormComponent', () => {
  let component: FirstNameFormComponent;
  let fixture: ComponentFixture<FirstNameFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstNameFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
