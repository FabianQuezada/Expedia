import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Provider {
  idProveedor: number;
  nombreEmpresa: string;
  numeroTelefono: string;
  correo: string;
  contrasena: string;
  fechaRegistro: string;
  calificacion: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<Provider> {
    return this.http.get<Provider>(`${this.apiUrl}/${id}`);
  }
}
