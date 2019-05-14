import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTypeAddComponent } from './request-type-add.component';

describe('RequestTypeAddComponent', () => {
  let component: RequestTypeAddComponent;
  let fixture: ComponentFixture<RequestTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
