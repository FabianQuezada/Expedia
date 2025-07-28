// src/app/services/profile-proveedor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from '../models/provider'; // ajusta si aplica
@Injectable({
  providedIn: 'root'
})
export class ProfileProveedorService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMiPerfil(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mi-perfil`);
  }

  getUserProfile(): Observable<Provider> {
      const token = localStorage.getItem('token'); // o this.authState.getToken() si lo tienes
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
  
      return this.http.get<Provider>(`${this.apiUrl}/auth/profile-proveedor`, { headers });
    }
}