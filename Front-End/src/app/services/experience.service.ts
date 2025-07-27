import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiUrl = 'http://localhost:3000/experiencia';

  constructor(private http: HttpClient) {}

  // Obtener todas las experiencias
  getExperiencias(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.apiUrl);
  }

  // Obtener una experiencia específica por ID
  getExperienciaPorId(id: number): Observable<Experiencia> {
    return this.http.get<Experiencia>(`${this.apiUrl}/${id}`);
  }

  // Formatear fecha para mostrar en UI
  getFechaString(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    };

    let fechaFormateada = new Date(fecha).toLocaleDateString('es-CL', opciones);
    return fechaFormateada
      .toLowerCase()
      .replace(/(^|\s)([a-záéíóúüñ])/, (m) => m.toLowerCase());
  }
  getCantidadResenas(idExperiencia: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/${idExperiencia}/resenas/count`
    );
  }
}
