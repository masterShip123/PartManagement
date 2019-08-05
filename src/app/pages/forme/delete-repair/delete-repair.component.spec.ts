import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRepairComponent } from './delete-repair.component';

describe('DeleteRepairComponent', () => {
  let component: DeleteRepairComponent;
  let fixture: ComponentFixture<DeleteRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
