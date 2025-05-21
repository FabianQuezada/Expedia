import { Injectable } from '@angular/core';
import { ServiceProvider } from 'src/app/models/service-provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor() {}

  getServices(): ServiceProvider[] {
    return [
      {
        id: 1,
        imagen: 'https://mediaim.expedia.com/localexpert/44533216/656e56ab-9e99-474d-876a-37cb8b3011a3.jpg?impolicy=resizecrop&rw=1005&rh=565',
        nombre: 'Santiago: tour de Viña del Mar, Valparaíso, Casablanca y Reñaca',
        descripcion: 'Haz una parada en el valle de Curacaví para disfrutar de una degustación gratuita de vino y aceite de oliva.',
        ubicacion: 'Santiago, Chile',
        precio: 116611,
        categoria: 'Turismo',
        datosGenerales: 'Duración: 3 horas. Incluye transporte y guía.'
      },
      {
        id: 2,
        imagen: 'https://mediaim.expedia.com/localexpert/44616055/20a215cd-a344-4f2b-a228-aebb8ee0c458.jpg?impolicy=resizecrop&rw=1005&rh=565',
        nombre: 'Santiago: excursión de un día al centro de esquí de Valle Nevado y Farellones',
        descripcion: 'Descubre el pequeño pueblo de montaña de Farellones.',
        ubicacion: 'La Serena, Chile',
        precio: 159433,
        categoria: 'Turismo',
        datosGenerales: 'Duración: 2 horas. Incluye equipo completo.'
      },
      {
        id: 3,
        imagen: 'https://mediaim.expedia.com/localexpert/212892/40bf4e64-0ac1-46cd-b8f6-2401cccc6728.jpg?impolicy=resizecrop&rw=1005&rh=565',
        nombre: 'Excursión histórica de un día a Valparaíso y Viña del Mar',
        descripcion: 'Encantadoras calles empedradas y funiculares en las laderas de Valparaíso.',
        ubicacion: 'Valdivia, Chile',
        precio: 48345,
        categoria: 'Turismo',
        datosGenerales: 'Horario: 8:00 - 18:00. Incluye casco.'
      },
      {
        id: 4,
        imagen: 'https://mediaim.expedia.com/localexpert/852760/b6e675c3-a44e-4a06-8aa2-775cbc2b4445.jpg?impolicy=resizecrop&rw=1005&rh=565',
        nombre: 'Laguna inca de Portillo en la cordillera de los Andes y degustación en el viñedo San Esteban desde Santiago',
        descripcion: 'Disfrute de un excelente viaje a un viñedo propiedad de una familia de San Esteban. Viaje a través de un paisaje espectacular...',
        ubicacion: 'Valdivia, Chile',
        precio: 64571,
        categoria: 'Turismo',
        datosGenerales: 'Horario: 8:00 - 18:00. Incluye casco.'
      }
    ];
  }
}
