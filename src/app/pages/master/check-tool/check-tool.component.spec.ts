import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckToolComponent } from './check-tool.component';

describe('CheckToolComponent', () => {
  let component: CheckToolComponent;
  let fixture: ComponentFixture<CheckToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
