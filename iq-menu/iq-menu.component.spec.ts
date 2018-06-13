import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqMenuComponent } from './iq-menu.component';

describe('IqMenuComponent', () => {
  let component: IqMenuComponent;
  let fixture: ComponentFixture<IqMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
