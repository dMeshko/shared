import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqSelectPickerComponent } from './iq-select-picker.component';

describe('IqSelectPickerComponent', () => {
  let component: IqSelectPickerComponent;
  let fixture: ComponentFixture<IqSelectPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqSelectPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqSelectPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
