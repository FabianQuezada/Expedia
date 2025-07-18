import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor() {}

  getExperiencias(): Observable<Experiencia[]> {
const experienciasSimuladas: Experiencia[] = [
  {
    idExperiencia: 1,
    titulo: 'Tour por Viña del Mar y Valparaíso',
    descripcion: 'Recorre los icónicos cerros, las playas de la región y descubre la cultura y arquitectura única de Viña del Mar y Valparaíso.',
    ubicacion: 'Valparaíso',
    estado: 'activa',
    categoria: 'Cultural',
    cuposDisponibles: 12,
    datosGenerales: ['Guía local experto', 'Transporte incluido', 'Degustación de vinos', 'Visita al Museo de Bellas Artes'],
    precio: 45000,
    puntuacion: 9.2,
    imagen: 'https://www.santiagotours.org/uploads/fotos/original/foto_4667_c.jpg' // Imagen de Valparaíso
  },
  {
    idExperiencia: 2,
    titulo: 'Excursión al Cajón del Maipo',
    descripcion: 'Vive una aventura en la cordillera andina con caminatas por senderos naturales y vistas impresionantes del paisaje montañoso.',
    ubicacion: 'Santiago',
    estado: 'activa',
    categoria: 'Aventura',
    cuposDisponibles: 8,
    datosGenerales: ['Almuerzo campestre incluido', 'Guía bilingüe', 'Seguro de viaje', 'Transporte privado'],
    precio: 55000,
    puntuacion: 9.6,
    imagen: 'https://images.pexels.com/photos/1078947/pexels-photo-1078947.jpeg' // Imagen de Cajón del Maipo
  },
  {
    idExperiencia: 3,
    titulo: 'Ruta del Vino en Colchagua',
    descripcion: 'Visita las mejores viñas del Valle de Colchagua y disfruta de una exclusiva degustación de vinos premiados.',
    ubicacion: 'Colchagua',
    estado: 'activa',
    categoria: 'Gastronomía',
    cuposDisponibles: 10,
    datosGenerales: ['Degustación de vinos premium', 'Tour guiado por expertos', 'Regalo de botella de vino', 'Comida gourmet incluida'],
    precio: 70000,
    puntuacion: 8.9,
    imagen: 'https://images.unsplash.com/photo-1614646198457-27e8a12556b7?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OXx8Y29sY2hhdWElMjB2aW5vJTIwd2luZXxlbnwwfHx8fDE2MTg0NzYwOTc&ixlib=rb-1.2.1&q=80&w=1080' // Imagen de viñedos en Colchagua
  },
  {
    idExperiencia: 4,
    titulo: 'Sandboard en el Valle de la Muerte',
    descripcion: 'Deslízate por las imponentes dunas del Valle de la Muerte en San Pedro de Atacama en una experiencia única de sandboard.',
    ubicacion: 'San Pedro de Atacama',
    estado: 'activa',
    categoria: 'Aventura',
    cuposDisponibles: 15,
    datosGenerales: ['Tabla incluida', 'Instructor profesional certificado', 'Transporte en vehículos 4x4'],
    precio: 35000,
    puntuacion: 9.0,
    imagen: 'https://images.unsplash.com/photo-1577889222340-8f6360c3c5ab?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8Z2FyYWxlJTIwdGFjYW1hfGVufDB8fHx8fDE2MTg0NzYxMjM&ixlib=rb-1.2.1&q=80&w=1080' // Imagen de Valle de la Muerte en Atacama
  },
  {
    idExperiencia: 5,
    titulo: 'Kayak en el Lago Llanquihue',
    descripcion: 'Navega por el Lago Llanquihue, rodeado de volcanes y naturaleza, en una actividad tranquila y relajante, perfecta para todos los niveles.',
    ubicacion: 'Puerto Varas',
    estado: 'activa',
    categoria: 'Naturaleza',
    cuposDisponibles: 6,
    datosGenerales: ['Equipo completo de kayak', 'Guía local experto en naturaleza', 'Transporte a los puntos de embarque'],
    precio: 48000,
    puntuacion: 9.5,
    imagen: 'https://images.unsplash.com/photo-1567094413-53cba5952e8d?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8a2F5YWt8ZW58MHx8fHwxNjEyNDAxNjgy&ixlib=rb-1.2.1&q=80&w=1080' // Imagen del Lago Llanquihue
  }
];

    // Emula una respuesta asincrónica como una API real
    return of(experienciasSimuladas);
  }


  getExperienciaPorId(id: number): Observable<Experiencia | undefined> {
    return this.getExperiencias().pipe(
      map(experiencias => experiencias.find(exp => exp.idExperiencia === id))
    );
  }


}
