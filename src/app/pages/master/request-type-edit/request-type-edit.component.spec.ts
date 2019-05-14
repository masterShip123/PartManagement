import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTypeEditComponent } from './request-type-edit.component';

describe('RequestTypeEditComponent', () => {
  let component: RequestTypeEditComponent;
  let fixture: ComponentFixture<RequestTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
