import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerEditComponent } from './maker-edit.component';

describe('MakerEditComponent', () => {
  let component: MakerEditComponent;
  let fixture: ComponentFixture<MakerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
