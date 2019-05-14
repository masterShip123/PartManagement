import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryAddComponent } from './factory-add.component';

describe('FactoryAddComponent', () => {
  let component: FactoryAddComponent;
  let fixture: ComponentFixture<FactoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
