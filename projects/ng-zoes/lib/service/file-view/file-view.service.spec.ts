import { TestBed } from '@angular/core/testing';

import { FileViewService } from './file-view.service';

describe('FileViewService', () => {
  let service: FileViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
