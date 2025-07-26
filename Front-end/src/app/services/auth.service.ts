import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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
  // Agrega los demás campos que tenga tu DTO de proveedor
}

interface LoginDto {
  correo: string;
  contraseña: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(data: RegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  registerProveedor(data: RegisterPDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerProveedor`, data);
  }

  login(data: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }


}