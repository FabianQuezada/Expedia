import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: number; // ID del usuario (viene como "sub" por convención JWT)
  nombre: string;
  correo: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private nombreSubject = new BehaviorSubject<string | null>(
    this.getNombreFromToken()
  );

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get nombreUsuario$(): Observable<string | null> {
    return this.nombreSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private getNombreFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.nombre || null;
    } catch (e) {
      return null;
    }
  }

  loginSuccess(token: string): void {
    localStorage.setItem('token', token);
    const nombre = this.getNombreFromToken();
    this.nombreSubject.next(nombre);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.nombreSubject.next(null);
  }
  getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      console.log('ID extraído del token:', decoded.id);
      return decoded.id;
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }
}
