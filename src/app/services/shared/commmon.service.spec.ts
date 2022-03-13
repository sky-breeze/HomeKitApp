import { TestBed } from '@angular/core/testing';

import { CommmonService } from './commmon.service';

describe('CommmonService', () => {
  let service: CommmonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommmonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
