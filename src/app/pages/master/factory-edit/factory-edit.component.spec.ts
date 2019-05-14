import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryEditComponent } from './factory-edit.component';

describe('FactoryEditComponent', () => {
  let component: FactoryEditComponent;
  let fixture: ComponentFixture<FactoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
