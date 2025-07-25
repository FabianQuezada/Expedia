import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  experiencias: Experiencia[] = [];

  constructor() {
    this.experiencias = this.generarExperienciasMock();

  }

  getExperiencias(): Observable<Experiencia[]> {
    const experienciasFijas = [ {
      idExperiencia: 1,
      titulo: 'Tour por Valparaíso y Viña',
      descripcion: 'Explora los cerros de Valparaíso y relájate en las playas de Viña del Mar.',
      ubicacion: 'Valparaíso',
      estado: 'activa',
      categoria: 'Cultural',
      cuposDisponibles: 15,
      datosGenerales: ['Guía local', 'Transporte', 'Degustación'],
      precio: 35000,
      puntuacion: 9.1,
      imagen: 'https://source.unsplash.com/featured/?valparaiso',
      fechasExperiencia: [
        { fecha: new Date(2025,7,1), precio: 35000 },
        { fecha: new Date(2025,7,10), precio: 37000 }
      ]
    },
    {
      idExperiencia: 2,
      titulo: 'Trekking en el Cajón del Maipo',
      descripcion: 'Caminata por senderos cordilleranos rodeados de naturaleza.',
      ubicacion: 'Santiago',
      estado: 'activa',
      categoria: 'Aventura',
      cuposDisponibles: 10,
      datosGenerales: ['Guía', 'Snack', 'Seguro'],
      precio: 40000,
      puntuacion: 9.4,
      imagen: 'https://source.unsplash.com/featured/?maipo',
      fechasExperiencia: [
        { fecha: new Date(2025,6,28), precio: 40000 },
        { fecha: new Date(2025,7,12), precio: 42000 }
      ]
    },
    {
      idExperiencia: 3,
      titulo: 'Ruta del vino en Colchagua',
      descripcion: 'Recorrido por las mejores viñas del valle con degustación.',
      ubicacion: 'Colchagua',
      estado: 'activa',
      categoria: 'Gastronomía',
      cuposDisponibles: 12,
      datosGenerales: ['Degustación', 'Almuerzo', 'Transporte'],
      precio: 55000,
      puntuacion: 8.9,
      imagen: 'https://source.unsplash.com/featured/?wine',
      fechasExperiencia: [
        { fecha: new Date('2025-08-03'), precio: 55000 },
        { fecha: new Date('2025-08-24'), precio: 58000 }
      ]
    }];
    const experienciasGeneradas = this.generarExperienciasMock();
    return of([...experienciasFijas, ...experienciasGeneradas]);  }

  getExperienciaPorId(id: number): Observable<Experiencia | undefined> {
    return this.getExperiencias().pipe(
      map((experiencias) =>
        experiencias.find((exp) => exp.idExperiencia === id)
      )
    );
  }

  generarExperienciasMock(): Experiencia[] {
    const ubicaciones = [
      'Santiago', 'Valparaíso', 'Puerto Varas', 'Pucón', 'San Pedro de Atacama', 'La Serena',
      'Rancagua', 'Temuco', 'Chiloé', 'Iquique', 'Arica', 'Antofagasta', 'Concepción',
      'Valdivia', 'Punta Arenas', 'Coyhaique', 'Talca', 'Osorno', 'Copiapó', 'Curicó'
    ];

    const categorias = ['Cultural', 'Aventura', 'Gastronomía', 'Naturaleza', 'Histórica'];

    const experiencias: Experiencia[] = [];

    for (let i = 4; i <= 50; i++) {
      const ubicacion = ubicaciones[i % ubicaciones.length];
      const categoria = categorias[i % categorias.length];
      const precioBase = 30000 + (i % 5) * 5000;
      const fecha1 = new Date(`2025-08-${(i % 28) + 1}`);
      const fecha2 = new Date(`2025-09-${(i % 28) + 1}`);

      experiencias.push({
        idExperiencia: i,
        titulo: `${categoria} en ${ubicacion}`,
        descripcion: `Una experiencia de tipo ${categoria.toLowerCase()} en la ciudad de ${ubicacion}.`,
        ubicacion,
        estado: 'activa',
        categoria,
        cuposDisponibles: 10 + (i % 5) * 2,
        datosGenerales: ['Guía local', 'Transporte', 'Equipamiento'],
        precio: precioBase,
        puntuacion: +(8 + (i % 2) + Math.random()).toFixed(1),
        imagen: `https://source.unsplash.com/featured/?${encodeURIComponent(ubicacion)}`,
        fechasExperiencia: [
          { fecha: fecha1, precio: precioBase },
          { fecha: fecha2, precio: precioBase + 2000 }
        ]
      });
    }

    return experiencias;
  }
}
