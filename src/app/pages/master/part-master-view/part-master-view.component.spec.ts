import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartMasterViewComponent } from './part-master-view.component';

describe('PartMasterViewComponent', () => {
  let component: PartMasterViewComponent;
  let fixture: ComponentFixture<PartMasterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartMasterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
