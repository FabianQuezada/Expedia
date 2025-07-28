import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from '../services/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authState: AuthStateService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!this.authState.isAuthenticated()) {
      return this.router.createUrlTree(['/login']);
    }

    const userRole = this.authState.getUserRole();

    const rutasRestringidasParaProveedor = [
      '/perfil',
      '/historialExperiencia',
      '/pago'
    ];

    // Si el proveedor intenta acceder a una ruta restringida -> redirigir
    if (userRole === 'proveedor') {
      const intento = rutasRestringidasParaProveedor.some((ruta) =>
        state.url.startsWith(ruta)
      );
      if (intento) {
        return this.router.createUrlTree(['/home']);
      }
    }

    return true;
  }
  
}
