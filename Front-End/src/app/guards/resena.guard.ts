// resena-id.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ResenaGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const id = route.params['idExperiencia'];

    // Validar si el ID existe y es un número positivo
    if (!id || isNaN(+id) || +id <= 0) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
