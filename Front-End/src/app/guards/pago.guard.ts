// src/app/guards/pago.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PagoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const navigation = this.router.getCurrentNavigation();
    const datos = navigation?.extras?.state;

    const camposRequeridos = [
      'titulo',
      'fecha',
      'total',
      'adultos',
      'ninos',
      'ciudad',
      'idExperiencia',
    ];

    const tieneDatos = datos && camposRequeridos.every((key) => key in datos);

    if (!tieneDatos) {
      return this.router.createUrlTree(['/']);
    }

    return true;
  }
}
