import { TestBed } from '@angular/core/testing';

import { IdleTimeoutServiceService } from './idle-timeout-service.service';

describe('IdleTimeoutServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdleTimeoutServiceService = TestBed.get(IdleTimeoutServiceService);
    expect(service).toBeTruthy();
  });
});
