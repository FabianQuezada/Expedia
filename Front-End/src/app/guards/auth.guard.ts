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

    // Bloquear acceso a /perfil si es proveedor
    if (state.url.startsWith('/perfil') && userRole === 'proveedor') {
      return this.router.createUrlTree(['/perfil-proveedor']);
    }

    return true;
  }
  
}
