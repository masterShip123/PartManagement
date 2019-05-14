import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoldTypeAddComponent } from './mold-type-add.component';

describe('MoldTypeAddComponent', () => {
  let component: MoldTypeAddComponent;
  let fixture: ComponentFixture<MoldTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoldTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoldTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
