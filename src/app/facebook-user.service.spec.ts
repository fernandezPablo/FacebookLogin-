import { TestBed } from '@angular/core/testing';

import { FacebookUserService } from './facebook-user.service';

describe('FacebookUserService', () => {
  let service: FacebookUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
