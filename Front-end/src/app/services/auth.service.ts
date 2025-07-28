import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthStateService } from './auth-state.service'; // 👈 Asegúrate que esto exista

interface RegisterDto {
  nombre: string;
  apellido: string;
  correo: string;
  contraseña: string;
}

interface RegisterPDto {
  nombreEmpresa: string;
  correo: string;
  contraseña: string;
}

interface LoginDto {
  correo: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private authState: AuthStateService) {}

  register(data: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  registerProveedor(data: RegisterPDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerProveedor`, data);
  }

  login(data: LoginDto): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data).pipe(
      tap((response) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token); // ✅ Guardar en localStorage
          this.authState.loginSuccess(token);    // ✅ Notificar al AuthStateService
        }
      })
    );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }
}
