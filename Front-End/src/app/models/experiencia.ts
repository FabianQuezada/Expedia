import { Fecha } from './Fecha';

export interface Imagen {
  id?: number;
  url: string;
}

export interface Experiencia {
  idExperiencia: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  estado: string;
  categoria: string;
  cuposDisponibles: number;
  datosGenerales: string[];
  precio: number;
  puntuacion: number;
  fechasExperiencia: Fecha[];
  imagenes: Imagen[]; 
}