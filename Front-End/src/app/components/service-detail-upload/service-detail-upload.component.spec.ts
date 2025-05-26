import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailUploadComponent } from './service-detail-upload.component';

describe('ServiceDetailUploadComponent', () => {
  let component: ServiceDetailUploadComponent;
  let fixture: ComponentFixture<ServiceDetailUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetailUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDetailUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
