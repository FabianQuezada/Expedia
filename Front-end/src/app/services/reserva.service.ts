import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReservaDto } from '../models/reserva';
import { map, Observable } from 'rxjs';
import { Experience } from '../models/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private baseUrl = 'http://localhost:3000/reserva';

  constructor(private http: HttpClient) {}

  crearReserva(reserva: CreateReservaDto): Observable<any> {
    return this.http.post(this.baseUrl, reserva);
  }

getMisReservas$(): Observable<Experience[]> {
  return this.http.get<any[]>(`${this.baseUrl}/mis-reservas`).pipe(
    map(data =>
      data.map(item => new Experience(
        item.id,
        item.imagenUrl,
        item.titulo,
        item.fecha,
        item.precio,
        item.puntuacion,
        item.resenas,
        item.descripcion
      ))
    )
  );
}
}
