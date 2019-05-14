import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducyionEditComponent } from './producyion-edit.component';

describe('ProducyionEditComponent', () => {
  let component: ProducyionEditComponent;
  let fixture: ComponentFixture<ProducyionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducyionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducyionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
