import { TestBed } from '@angular/core/testing';

import { UserGaurdGuard } from './user-gaurd.guard';

describe('UserGaurdGuard', () => {
  let guard: UserGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
