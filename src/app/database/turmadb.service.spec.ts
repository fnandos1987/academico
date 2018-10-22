import { TestBed, inject } from '@angular/core/testing';

import { TurmadbService } from './turmadb.service';

describe('TurmadbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurmadbService]
    });
  });

  it('should be created', inject([TurmadbService], (service: TurmadbService) => {
    expect(service).toBeTruthy();
  }));
});
