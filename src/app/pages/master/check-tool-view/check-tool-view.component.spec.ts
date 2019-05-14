import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckToolViewComponent } from './check-tool-view.component';

describe('CheckToolViewComponent', () => {
  let component: CheckToolViewComponent;
  let fixture: ComponentFixture<CheckToolViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckToolViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckToolViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
