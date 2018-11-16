import { TestBed, inject } from '@angular/core/testing';

import { NewsfeedDataService } from './newsfeed-data.service';

describe('NewsfeedDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsfeedDataService]
    });
  });

  it('should be created', inject([NewsfeedDataService], (service: NewsfeedDataService) => {
    expect(service).toBeTruthy();
  }));
});
