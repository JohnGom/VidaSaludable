import { TestBed, inject } from '@angular/core/testing';

import { ServiceModalService } from './service-modal.service';

describe('ServiceModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceModalService]
    });
  });

  it('should be created', inject([ServiceModalService], (service: ServiceModalService) => {
    expect(service).toBeTruthy();
  }));
});
