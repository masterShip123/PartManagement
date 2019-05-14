import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoldTypeComponent } from './mold-type.component';

describe('MoldTypeComponent', () => {
  let component: MoldTypeComponent;
  let fixture: ComponentFixture<MoldTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoldTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoldTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
