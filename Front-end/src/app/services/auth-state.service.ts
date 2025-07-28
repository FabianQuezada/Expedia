import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

// Estructura real de tu token
interface DecodedToken {
  id: number;           // 🔁 Usamos 'id' en lugar de 'sub'
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

  // Observables públicos para componentes
  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get nombreUsuario$(): Observable<string | null> {
    return this.nombreSubject.asObservable();
  }

  // Chequea si hay un token guardado
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Extrae el correo del token (para mostrar en navbar, etc.)
  private getNombreFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.correo || null;
    } catch (e) {
      console.warn('❌ Error al decodificar el token:', e);
      return null;
    }
  }

  // Llamado después de un login exitoso
  loginSuccess(token: string): void {
    localStorage.setItem('token', token);
    const nombre = this.getNombreFromToken();
    this.nombreSubject.next(nombre);
    this.isLoggedInSubject.next(true);
  }

  // Llamado al cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.nombreSubject.next(null);
  }

  // Extrae el ID del usuario (ahora correctamente desde 'id')
  getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      console.log('✅ ID extraído del token:', decoded.id);
      return decoded.id;
    } catch (error) {
      console.error('❌ Error al decodificar token:', error);
      return null;
    }
  }

  // Opcional: obtener el rol del usuario
  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.rol || null;
    } catch (error) {
      console.error('❌ Error al obtener el rol:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;
      if (!exp) return true; // si no hay `exp`, asumimos válido
      const now = Date.now().valueOf() / 1000;
      return now < exp;
    } catch (e) {
      return false;
    }
  }
}
