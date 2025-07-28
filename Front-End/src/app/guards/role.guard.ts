import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authState: AuthStateService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      const rol = decoded.rol;

      if (rol === 'proveedor') {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    } catch (error) {
      console.error('Token inválido', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
