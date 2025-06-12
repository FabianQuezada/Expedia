import { Component, Input } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';

@Component({
  selector: 'app-card-coupon',
  templateUrl: './card-coupon.component.html',
  styleUrls: ['./card-coupon.component.css']
})
export class CardCouponComponent {
  @Input() coupon!: Coupon;

  buttonText: string = 'Usar';
  copied: boolean = false;

  copyCode(): void {
    if (this.coupon?.code) {
      navigator.clipboard.writeText(this.coupon.code).then(() => {
        this.buttonText = 'Copiado';
        this.copied = true;

        setTimeout(() => {
          this.buttonText = 'Usar';
          this.copied = false;
        }, 3000);
      });
    }
  }
}
