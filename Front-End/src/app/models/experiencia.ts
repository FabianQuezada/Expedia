import { Fecha } from './Fecha';

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
  imagen: string;
  fechasExperiencia: Fecha[];
}
