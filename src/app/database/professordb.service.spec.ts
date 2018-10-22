import { TestBed, inject } from '@angular/core/testing';

import { ProfessordbService } from './professordb.service';

describe('ProfessordbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessordbService]
    });
  });

  it('should be created', inject([ProfessordbService], (service: ProfessordbService) => {
    expect(service).toBeTruthy();
  }));
});
