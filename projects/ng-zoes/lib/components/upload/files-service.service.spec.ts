import { TestBed } from '@angular/core/testing';

import { FilesServiceService } from './files-service.service';

describe('FilesServiceService', () => {
  let service: FilesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
