import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReservaDto } from '../models/reserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private baseUrl = 'http://localhost:3000/reserva';

  constructor(private http: HttpClient) {}

  crearReserva(reserva: CreateReservaDto): Observable<any> {
    return this.http.post(this.baseUrl, reserva);
  }
}
