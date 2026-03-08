import { TestBed } from '@angular/core/testing';

import { Ubdate } from './ubdate';

describe('Ubdate', () => {
  let service: Ubdate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ubdate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
