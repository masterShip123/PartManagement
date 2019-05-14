import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartMasterEditComponent } from './part-master-edit.component';

describe('PartMasterEditComponent', () => {
  let component: PartMasterEditComponent;
  let fixture: ComponentFixture<PartMasterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartMasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
