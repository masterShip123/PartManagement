import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTypeViewComponent } from './request-type-view.component';

describe('RequestTypeViewComponent', () => {
  let component: RequestTypeViewComponent;
  let fixture: ComponentFixture<RequestTypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
