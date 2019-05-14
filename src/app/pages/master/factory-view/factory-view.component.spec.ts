import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryViewComponent } from './factory-view.component';

describe('FactoryViewComponent', () => {
  let component: FactoryViewComponent;
  let fixture: ComponentFixture<FactoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
