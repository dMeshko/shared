import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluentTableComponent } from './fluent-table.component';

describe('FluentTableComponent', () => {
  let component: FluentTableComponent;
  let fixture: ComponentFixture<FluentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
