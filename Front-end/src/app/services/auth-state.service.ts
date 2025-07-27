import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: number;
  correo: string;
  rol: string;
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
      return decoded.correo || null; // <- usa el campo correcto
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
      const decoded: DecodedToken = jwtDecode(token);
      console.log('ID extraído del token:', decoded.sub); // ✅ CAMBIO AQUÍ
      return decoded.sub;
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }
}
