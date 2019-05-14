import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerAddComponent } from './maker-add.component';

describe('MakerAddComponent', () => {
  let component: MakerAddComponent;
  let fixture: ComponentFixture<MakerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
