import { Component, OnInit } from '@angular/core';
import { Cupon } from 'src/app/models/cupon.model';
import { CuponService } from 'src/app/services/coupon/cupon.service';

@Component({
  selector: 'app-coupons-section',
  templateUrl: './coupons-section.component.html'
})
export class CouponsSectionComponent implements OnInit {
  selectTab: 'vigentes' | 'expirados' = 'vigentes'; 
  mensaje: string = '';
  tipoMensaje: 'success' | 'danger' = 'success';
  nuevoCodigo: string = '';  
  couponActive: Cupon[] = []; 
  couponInactive: Cupon[] = []; 
  cuponesEmpresa: Cupon[] = [];  
  couponStatus: string = ''; 

  constructor(private cuponsService: CuponService) {}

  ngOnInit(): void {
    // empresa
    this.cuponsService.getCuponesEmpresa().subscribe(coupons => {
      this.cuponesEmpresa = coupons; 
    });

    // usuario
    this.cuponsService.getCuponesUsuario().subscribe(coupons => {
      this.couponActive = coupons.filter(cou => cou.esActiva());
      this.couponInactive = coupons.filter(cou => !cou.esActiva());
    });
  }

  // Convierte el código ingresado a mayúsculas
  toUpperCase(event: any): void {
    this.nuevoCodigo = event.target.value.toUpperCase(); 
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'danger' = 'success'): void {
  this.mensaje = texto;
  this.tipoMensaje = tipo;

  // tiempo para oculta notificación
  setTimeout(() => {
    this.mensaje = '';
  }, 3000);
}

  verificarYAgregarCupon(): void {
  const resultadoVerificacion = this.verificarCupon(this.nuevoCodigo);

  switch (resultadoVerificacion) {
    case 'encontrado':
      this.mostrarMensaje(`¡Cupón "${this.nuevoCodigo}" agregado a tu cuenta!`);
      break;
    case 'repetido':
      this.mostrarMensaje(`El cupón "${this.nuevoCodigo}" ya está en tu cuenta.`, 'danger');
      break;
    case 'expirado':
      this.mostrarMensaje(`El cupón "${this.nuevoCodigo}" ha expirado.`, 'danger');
      break;
    case 'inexistente':
      this.mostrarMensaje('El cupón no existe o es inválido.', 'danger');
      break;
    default:
      this.mostrarMensaje('Hubo un error al verificar el cupón.', 'danger');
  }

  this.nuevoCodigo = '';
}


verificarCupon(codigo: string): string {
  const cuponEncontrado = this.cuponesEmpresa.find(coupon => coupon.code === codigo);
  if (cuponEncontrado) {
    const fechaActual = new Date();
    if (fechaActual <= cuponEncontrado.fechaFinal) {
      const cuponRepetido = this.couponActive.some(coupon => coupon.code === codigo);
      if (!cuponRepetido) {
        this.cuponsService.agregarCuponAlUsuario(cuponEncontrado); 
        return 'encontrado'; 
      } else {
        return 'repetido'; 
      }
    } else {
      return 'expirado'; 
    }
  } else {
    return 'inexistente';  
  }
}
}