import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';
import { CrearExperiencia } from '../models/createExperience';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiUrl = 'http://localhost:3000/experiencia';

  constructor(private http: HttpClient) {}

  crearExperiencia(experiencia: CrearExperiencia): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-experiencia`, experiencia);
  }

  getExperiencias(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.apiUrl);
  }

  getExperienciaPorId(id: number): Observable<Experiencia> {
    return this.http.get<Experiencia>(`${this.apiUrl}/${id}`);
  }

  actualizarExperiencia(
    id: number,
    experiencia: CrearExperiencia
  ): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, experiencia);
  }

  getMisExperiencias(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(`${this.apiUrl}/mis-experiencias`);
  }

  getCantidadResenas(idExperiencia: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/${idExperiencia}/resenas/count`
    );
  }

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
  
  
}
