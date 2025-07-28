import { TestBed } from '@angular/core/testing';

import { ProfileProveedorService } from './profile-proveedor.service';

describe('ProfileProveedorService', () => {
  let service: ProfileProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
