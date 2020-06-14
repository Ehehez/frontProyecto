import { TestBed } from '@angular/core/testing';

import { AccesodbService } from './accesodb.service';

describe('AccesodbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccesodbService = TestBed.get(AccesodbService);
    expect(service).toBeTruthy();
  });
});
