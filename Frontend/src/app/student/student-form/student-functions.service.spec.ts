/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentFunctionsService } from './student-functions.service';

describe('Service: StudentFunctions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentFunctionsService]
    });
  });

  it('should ...', inject([StudentFunctionsService], (service: StudentFunctionsService) => {
    expect(service).toBeTruthy();
  }));
});
