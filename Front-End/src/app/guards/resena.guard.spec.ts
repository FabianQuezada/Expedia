import { TestBed } from '@angular/core/testing';

import { ResenaGuard } from './resena.guard';

describe('ResenaGuard', () => {
  let guard: ResenaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResenaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
