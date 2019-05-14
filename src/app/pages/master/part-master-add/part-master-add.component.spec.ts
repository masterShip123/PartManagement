import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartMasterAddComponent } from './part-master-add.component';

describe('PartMasterAddComponent', () => {
  let component: PartMasterAddComponent;
  let fixture: ComponentFixture<PartMasterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
