import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeViewComponent } from './user-type-view.component';

describe('UserTypeViewComponent', () => {
  let component: UserTypeViewComponent;
  let fixture: ComponentFixture<UserTypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
