import { TestBed } from '@angular/core/testing';

import { ApiComponentsService } from './api-components.service';

describe('ApiComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiComponentsService = TestBed.get(ApiComponentsService);
    expect(service).toBeTruthy();
  });
});
