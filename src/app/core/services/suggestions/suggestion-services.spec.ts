import { TestBed } from '@angular/core/testing';

import { SuggestionServices } from './suggestion-services';

describe('SuggestionServices', () => {
  let service: SuggestionServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestionServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
