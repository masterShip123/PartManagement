import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoldTypeViewComponent } from './mold-type-view.component';

describe('MoldTypeViewComponent', () => {
  let component: MoldTypeViewComponent;
  let fixture: ComponentFixture<MoldTypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoldTypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoldTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
