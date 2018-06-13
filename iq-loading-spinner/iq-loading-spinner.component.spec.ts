import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqLoadingSpinnerComponent } from './iq-loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: IqLoadingSpinnerComponent;
  let fixture: ComponentFixture<IqLoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqLoadingSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
