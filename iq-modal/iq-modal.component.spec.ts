import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqModalComponent } from './iq-modal.component';

describe('IqModalComponent', () => {
  let component: IqModalComponent;
  let fixture: ComponentFixture<IqModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
