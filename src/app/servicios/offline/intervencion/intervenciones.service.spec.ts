import { TestBed, inject } from '@angular/core/testing';

import { IntervencionesService } from './intervenciones.service';

describe('IntervencionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntervencionesService]
    });
  });

  it('should be created', inject([IntervencionesService], (service: IntervencionesService) => {
    expect(service).toBeTruthy();
  }));
});
