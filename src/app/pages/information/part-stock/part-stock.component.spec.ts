import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartStockComponent } from './part-stock.component';

describe('PartStockComponent', () => {
  let component: PartStockComponent;
  let fixture: ComponentFixture<PartStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
