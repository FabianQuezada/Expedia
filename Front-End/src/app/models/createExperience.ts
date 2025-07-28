import { Fecha } from './Fecha';
import { Imagen } from './Imagen';


export interface CrearExperiencia {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  estado: string;
  categoria: string;
  idCaracteristicas: number[];
  imagenes: Imagen[];
  fechas: Fecha[];
  duracion: number;
}