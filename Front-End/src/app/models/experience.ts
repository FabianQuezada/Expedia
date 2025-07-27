import { Fecha } from './Fecha';
import { Imagen } from './Imagen';


export interface Experiencia {
  idExperiencia: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  estado: string;
  categoria: string;
  idCaracteristicas: number[];
  cuposDisponibles: number;
  precio: number;
  puntuacion: number;
  fechasExperiencias: Fecha[];
  imagenes: Imagen[]; 
  duracion: number;
}