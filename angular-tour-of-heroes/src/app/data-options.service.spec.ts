import { TestBed, inject } from '@angular/core/testing';

import { DataOptionsService } from './data-options.service';

describe('DataOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataOptionsService]
    });
  });

  it('should be created', inject([DataOptionsService], (service: DataOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
