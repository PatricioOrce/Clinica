import { TestBed } from '@angular/core/testing';

import { CuentaHabilitadaGuard } from './cuenta-habilitada.guard';

describe('CuentaHabilitadaGuard', () => {
  let guard: CuentaHabilitadaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CuentaHabilitadaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
