// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { updateUser} from '../models/User/updateUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000'; // Ajusta si usas proxy o dominio

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/usuario/mi-perfil`);
  }

  updateUserProfile(user: Partial<updateUser>): Observable<updateUser> {
    return this.http.patch<updateUser>(`${this.baseUrl}/usuario/mi-perfil`, user);
  }
}