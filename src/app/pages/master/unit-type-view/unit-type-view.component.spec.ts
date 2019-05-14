import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTypeViewComponent } from './unit-type-view.component';

describe('UnitTypeViewComponent', () => {
  let component: UnitTypeViewComponent;
  let fixture: ComponentFixture<UnitTypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitTypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
