import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAddDatesComponent } from './service-add-dates.component';

describe('ServiceAddDatesComponent', () => {
  let component: ServiceAddDatesComponent;
  let fixture: ComponentFixture<ServiceAddDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceAddDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceAddDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
