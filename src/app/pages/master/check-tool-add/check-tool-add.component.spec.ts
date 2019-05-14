import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckToolAddComponent } from './check-tool-add.component';

describe('CheckToolAddComponent', () => {
  let component: CheckToolAddComponent;
  let fixture: ComponentFixture<CheckToolAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckToolAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckToolAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
