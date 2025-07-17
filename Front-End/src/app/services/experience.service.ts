import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor() {}

  getExperiencias(): Observable<Experiencia[]> {
    const experienciasSimuladas: Experiencia[] = [
      {
        titulo: 'Tour Viña del Mar',
        precio: 77666,
        puntuacion: 9.6,
        imagen: 'assets/images/vina.jpg'
      },
      {
        titulo: 'Excursión Cordillera',
        precio: 55000,
        puntuacion: 8.7,
        imagen: 'assets/images/cordillera.jpg'
      },
      {
        titulo: 'Valle Nevado Aventura',
        precio: 110000,
        puntuacion: 9.2,
        imagen: 'assets/images/valle-nevado.jpg'
      },
      {
        titulo: 'Tour Histórico Santiago',
        precio: 38000,
        puntuacion: 7.5,
        imagen: 'assets/images/santiago.jpg'
      }
    ];

    // Emula una respuesta asincrónica como una API real
    return of(experienciasSimuladas);
  }
}
