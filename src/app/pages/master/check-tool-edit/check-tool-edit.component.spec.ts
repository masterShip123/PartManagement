import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckToolEditComponent } from './check-tool-edit.component';

describe('CheckToolEditComponent', () => {
  let component: CheckToolEditComponent;
  let fixture: ComponentFixture<CheckToolEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckToolEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckToolEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
