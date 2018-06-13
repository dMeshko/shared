import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IqUploaderComponent } from './iq-uploader.component';

describe('IqUploaderComponent', () => {
  let component: IqUploaderComponent;
  let fixture: ComponentFixture<IqUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
