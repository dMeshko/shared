import { TestBed, inject } from '@angular/core/testing';

import { FluentFormService } from './fluent-form.service';

describe('FluentFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FluentFormService]
    });
  });

  it('should be created', inject([FluentFormService], (service: FluentFormService) => {
    expect(service).toBeTruthy();
  }));
});
