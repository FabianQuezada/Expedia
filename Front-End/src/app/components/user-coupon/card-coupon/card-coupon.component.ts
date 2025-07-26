import { Component, Input } from '@angular/core';
import { Cupon } from 'src/app/models/cupon.model';

@Component({
  selector: 'app-card-coupon',
  templateUrl: './card-coupon.component.html',
  styleUrls: ['./card-coupon.component.css']
})
export class CardCouponComponent {
  @Input() cupon!: Cupon;

  buttonText: string = 'Usar';
  copied: boolean = false;

  copyCode(): void {
    if (this.cupon?.code) {
      navigator.clipboard.writeText(this.cupon.code).then(() => {
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
