export interface ServiceProvider {
  id: number;
  imagen: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  precio: number;
  categoria: string;
  caracteristicas: string[];
  datosGenerales: string[];
}