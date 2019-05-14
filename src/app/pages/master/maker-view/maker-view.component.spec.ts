import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerViewComponent } from './maker-view.component';

describe('MakerViewComponent', () => {
  let component: MakerViewComponent;
  let fixture: ComponentFixture<MakerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
