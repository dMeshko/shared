import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoderaSharedComponent } from './codera-shared.component';

describe('CoderaSharedComponent', () => {
  let component: CoderaSharedComponent;
  let fixture: ComponentFixture<CoderaSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoderaSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoderaSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
