import { TestBed, inject } from '@angular/core/testing';

import { CoderaSharedService } from './codera-shared.service';

describe('CoderaSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoderaSharedService]
    });
  });

  it('should be created', inject([CoderaSharedService], (service: CoderaSharedService) => {
    expect(service).toBeTruthy();
  }));
});
