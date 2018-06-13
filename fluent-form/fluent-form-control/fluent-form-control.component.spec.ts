import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluentFormControlComponent } from './fluent-form-control.component';

describe('FluentFormControlComponent', () => {
  let component: FluentFormControlComponent;
  let fixture: ComponentFixture<FluentFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluentFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluentFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
