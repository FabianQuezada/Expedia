import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  idUsuario: number;
  nombre: string;
  apellido: string;
  genero: string;
  fechaNacimiento: string;
  numeroTelefono: string;
  correo: string;
  contrasena: string;
  fechaRegistro: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
