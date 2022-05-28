import { TestBed } from '@angular/core/testing';

import { SportObjectsService } from './sport-objects.service';

describe('SportObjectsService', () => {
  let service: SportObjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportObjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
