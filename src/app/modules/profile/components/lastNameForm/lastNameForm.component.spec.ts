import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastNameFormComponent } from './lastNameForm.component';

describe('LastnameFormComponent', () => {
  let component: LastNameFormComponent;
  let fixture: ComponentFixture<LastNameFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastNameFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
