import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoldTypeEditComponent } from './mold-type-edit.component';

describe('MoldTypeEditComponent', () => {
  let component: MoldTypeEditComponent;
  let fixture: ComponentFixture<MoldTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoldTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoldTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
