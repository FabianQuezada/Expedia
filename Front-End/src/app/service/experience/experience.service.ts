import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Experience } from '../../models/experience.model';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private experiences: Experience[] = [
    new Experience(
      1,
      'https://images.trvl-media.com/localexpert/419435/c102684c-2217-46be-bf3a-8a32bf3c6398.jpg?impolicy=resizecrop&rw=1005&rh=5655',
      'Atardecer en Valle de la Luna - San Pedro de Atacama',
      'USA',
      '30/05/2025',
      54900,
      9.0,
      240,
      'Tour de medio día con guía, transporte y pisco sour al atardecer.'
    ),
    new Experience(
      2,
      'https://picsum.photos/800/600',
      'Parque Xcaret con Espectáculo (Buffet y Transporte Opcional)',
      'USA',
      '04/06/2025',
      102894,
      7,
      140,
      'Disfruta de un día completo en Xcaret con actividades y show en vivo.'
    ),
    new Experience(
      3,
      'https://media.vrbo.com/localexpert/189689/43748090-465f-4a20-8a12-1e5be9922694.jpg?impolicy=resizecrop&rw=1005&rh=565',
      'Tour por la Riviera Maya',
      'USA',
      '12/07/2025',
      85000,
      8,
      200,
      'Explora las playas y ruinas de la Riviera Maya con guía experto.'
    ),
    new Experience(
      4,
      'https://media.vrbo.com/localexpert/515692/573c26ad-9a0c-4c23-886b-9feea64f51f8.jpg?impolicy=resizecrop&rw=1005&rh=565',
      'Buceo en Cozumel',
      'USA',
      '01/08/2025',
      120000,
      9,
      80,
      'Experiencia de buceo en uno de los mejores arrecifes del mundo.'
    ),
    new Experience(
      5,
      'https://picsum.photos/800/600',
      'Tour Premium a Isla de Pascua - Todo Incluido',
      'USA',
      '15/09/2025',
      899990,
      9.2,
      320,
      'Visita los moáis, playas de arena rosa y cuevas volcánicas con guía Rapa Nui. Incluye vuelos desde Santiago, alojamiento y comidas.'
    ),
    new Experience(
      6,
      'https://picsum.photos/800/600',
      'Trekking en Torres del Paine - W Circuit',
      'USA',
      '10/11/2025',
      1250000,
      9.8,
      180,
      'Ruta completa de 5 días por los glaciares Grey, Francés y las torres. Equipo de camping incluido.'
    ),
    new Experience(
      7,
      'https://images.trvl-media.com/localexpert/419435/c102684c-2217-46be-bf3a-8a32bf3c6398.jpg?impolicy=resizecrop&rw=1005&rh=565',
      'City Tour Santiago - Lo Mejor en 1 Día',
      'USA',
      '22/01/2025',
      65990,
      7.9,
      890,
      'Recorre La Moneda, Cerro San Cristóbal, Barrio Lastarria y Mercado Central con guía local.'
    ),
    new Experience(
      8,
      'https://images.trvl-media.com/localexpert/414540/96e01ebc-5173-4b77-a323-951db21421e5.jpg?impolicy=resizecrop&rw=1005&rh=565',
      'Kayak en Lagos del Sur',
      'USA',
      '05/05/2025',
      89900,
      8.3,
      60,
      'Remada guiada por lagos y fiordos del sur de Chile. Incluye almuerzo campestre.'
    ),
    new Experience(
      9,
      'https://picsum.photos/800/600',
      'Día de Ski en Nevados de Chillán',
      'USA',
      '20/05/2025',
      179000,
      8.7,
      150,
      'Incluye traslado, equipo y pase diario en centro de ski. Nivel intermedio.'
    ),
    new Experience(
      10,
      'https://images.trvl-media.com/localexpert/796267/aa68107e-4a75-45b0-ada6-8209611b2dea.jpg?impolicy=resizecrop&rw=1005&rh=565',
      'Tour de Vinos en Valle de Colchagua',
      'USA',
      '05/04/2025',
      249990,
      8.5,
      410,
      'Visita 4 viñas premium con degustaciones gourmet y transporte privado desde Santiago.'
    ),
    new Experience(
      11,
      'https://picsum.photos/800/600',
      'Tour de Vinos en Valle de Colchagua',
      'USA',
      '09/04/2025',
      249990,
      8.5,
      410,
      'Visita 4 viñas premium con degustaciones gourmet y transporte privado desde Santiago.'
    ),
  ];

  private experiences$ = new BehaviorSubject<Experience[]>(this.experiences);

  getAllExperiences$(): Observable<Experience[]> {
    return this.experiences$.asObservable();
  }
}