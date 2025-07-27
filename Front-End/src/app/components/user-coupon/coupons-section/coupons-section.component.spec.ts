import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsSectionComponent } from './coupons-section.component';

describe('CouponsSectionComponent', () => {
  let component: CouponsSectionComponent;
  let fixture: ComponentFixture<CouponsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
