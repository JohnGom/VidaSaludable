import { TestBed, inject } from '@angular/core/testing';

import { BenefitedService } from './benefited.service';

describe('BenefitedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BenefitedService]
    });
  });

  it('should be created', inject([BenefitedService], (service: BenefitedService) => {
    expect(service).toBeTruthy();
  }));
});
