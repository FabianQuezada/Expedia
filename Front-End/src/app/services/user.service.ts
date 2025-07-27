import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from './auth-state.service'; // ✅ importa correctamente según tu estructura
import { User } from '../models/user'; // ajusta si aplica
import { updateUser } from '../models/User/updateUser'; // ajusta si aplica

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authState: AuthStateService // ✅ inyectamos tu servicio
  ) {}

  getUserProfile(): Observable<User> {
    const token = localStorage.getItem('token'); // o this.authState.getToken() si lo tienes
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User>(`${this.baseUrl}/auth/profile`, { headers });
  }

  updateUserProfile(user: Partial<updateUser>): Observable<updateUser> {
    console.log(user)
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.patch<updateUser>(`${this.baseUrl}/usuario/mi-perfil`, user, { headers });
  }
}
