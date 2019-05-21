import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartStockEditComponent } from './part-stock-edit.component';

describe('PartStockEditComponent', () => {
  let component: PartStockEditComponent;
  let fixture: ComponentFixture<PartStockEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartStockEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartStockEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
