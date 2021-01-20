import { TestBed } from '@angular/core/testing';

import { FixManagerService } from './fix-manager.service';

describe('FixManagerService', () => {
  let service: FixManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
