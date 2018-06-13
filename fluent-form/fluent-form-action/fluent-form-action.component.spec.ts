import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluentFormActionComponent } from './fluent-form-action.component';

describe('FluentFormActionComponent', () => {
  let component: FluentFormActionComponent;
  let fixture: ComponentFixture<FluentFormActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluentFormActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluentFormActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
