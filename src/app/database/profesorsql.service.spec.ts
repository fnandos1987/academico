import { TestBed, inject } from '@angular/core/testing';

import { ProfesorsqlService } from './profesorsql.service';

describe('ProfesorsqlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfesorsqlService]
    });
  });

  it('should be created', inject([ProfesorsqlService], (service: ProfesorsqlService) => {
    expect(service).toBeTruthy();
  }));
});
