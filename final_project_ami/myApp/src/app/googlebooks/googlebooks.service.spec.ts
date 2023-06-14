import { TestBed } from '@angular/core/testing';

import { GooglebooksService } from './googlebooks.service';

describe('GooglebooksService', () => {
  let service: GooglebooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GooglebooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
