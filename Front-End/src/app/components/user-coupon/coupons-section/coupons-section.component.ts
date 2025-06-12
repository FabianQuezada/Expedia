import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponService } from 'src/app/services/coupon/coupon.service';

@Component({
  selector: 'app-coupons-section',
  templateUrl: './coupons-section.component.html'
})
export class CouponsSectionComponent implements OnInit {
  selectTab: 'vigentes' | 'expirados' = 'vigentes';
  nuevoCodigo: string = '';
  couponActive: Coupon[] = [];
  couponInactive: Coupon[] = [];

  constructor(private couponsService: CouponService) {}

  ngOnInit(): void {
    this.couponsService.getCoupons().subscribe((coupons) => {
      this.couponActive = coupons.filter(cou => cou.esActiva());
      this.couponInactive = coupons.filter(cou => !cou.esActiva());
    });
  }
}
