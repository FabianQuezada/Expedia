import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coupon } from 'src/app/models/coupon.model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private coupons: Coupon[] = [
    new Coupon(1, '10% Descuento', 'DESC10', '01/06/2025', '10/06/2025', 10, 'Descuento del 10% en toda la tienda'),
    new Coupon(2, '20% en electrónica', 'ELEC20', '05/06/2025', '15/06/2025', 20, 'Solo para productos electrónicos', 100),
    new Coupon(3, '2% en electrónica', 'ELEC20', '05/06/2025', '15/06/2025', 20, 'Solo para productos electrónicos', 100),
    new Coupon(4, '10% en electrónica', 'ELEC20', '05/06/2025', '15/06/2025', 20, 'Solo para productos electrónicos', 100),
    new Coupon(2, '20% en electrónica', 'ELEC20', '05/06/2025', '15/06/2025', 20, 'Solo para productos electrónicos', 100),
    new Coupon(2, '20% en electrónica', 'ELEC20', '05/06/2025', '15/06/2025', 20, 'Solo para productos electrónicos', 100),
  ];
  private companyCoupons: Coupon[] = [
    new Coupon(1, '10% Descuento', 'DESC10', '01/06/2025', '10/06/2025', 10, 'Descuento del 10% en toda la tienda'),
    new Coupon(2, '20% en electrónica', 'ELEC20', '05/06/2025', '15/06/2025', 20, 'Solo para productos electrónicos', 100),
    new Coupon(3, '5% en tienda', 'TIENDA5', '01/06/2025', '10/06/2025', 5, 'Descuento en toda la tienda'),
    new Coupon(4, '10% en electrónica', 'ELEC30', '05/06/2025', '15/06/2025', 10, 'Solo para productos electrónicos', 100),
  ];
  
  private coupons$ = new BehaviorSubject<Coupon[]>(this.coupons);
  constructor() {}

  getCoupons(): Observable<Coupon[]> {
    return this.coupons$.asObservable();
  }
}
