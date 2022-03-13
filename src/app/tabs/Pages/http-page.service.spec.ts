import { TestBed } from '@angular/core/testing';

import { HttpPageService } from './http-page.service';

describe('HttpPageService', () => {
  let service: HttpPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
