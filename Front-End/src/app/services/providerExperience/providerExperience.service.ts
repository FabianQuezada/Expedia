import { Injectable } from '@angular/core';
import { ServiceProvider } from 'src/app/models/service-provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderExperienceService {

  constructor() {}

  getServices(): ServiceProvider[] {
    return [
      {
        id: 1,
        imagen: 'https://mediaim.expedia.com/localexpert/44533216/656e56ab-9e99-474d-876a-37cb8b3011a3.jpg?impolicy=resizecrop&rw=1005&rh=565',
        nombre: 'Santiago: tour de Viña del Mar, Valparaíso, Casablanca y Reñaca',
        descripcion: 'Haz una parada en el valle de Curacaví para disfrutar de una degustación gratuita de vino y aceite de oliva.',
        ubicacion: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14926.709415676382!2d-71.5455171!3d-33.0245039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dde1ad3aa93b%3A0xebbdfb7587bcf51a!2sVi%C3%B1a%20del%20Mar%2C%20Valpara%C3%ADso!5e0!3m2!1ses-419!2scl!4v1626898149471!5m2!1ses-419!2scl',
        precio: 116611,
        categoria: 'Turismo',
        caracteristicas:['Cancelacion gratuita disponible', 'Voucher móvil', 'Traslado de hoteles seleccionados', 
                    '10h', 'Confirmación instantánea', 'Varios idiomas'],
        datosGenerales: ['Haz una parada en el valle de Curacaví para disfrutar de una degustación gratuita de vino y aceite de oliva',
                  'Contempla las coloridas casas de la ciudad costera de Valparaíso',
                  'Admira los parques y jardines de la popular Viña del Mar']
      },
      {
        id: 2,
        imagen: 'https://mediaim.expedia.com/localexpert/44616055/20a215cd-a344-4f2b-a228-aebb8ee0c458.jpg?impolicy=resizecrop&rw=1005&rh=565',
        nombre: 'Santiago: excursión de un día al centro de esquí de Valle Nevado y Farellones',
        descripcion: 'Descubre el pequeño pueblo de montaña de Farellones.',
        ubicacion: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14926.709415676382!2d-71.5455171!3d-33.0245039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dde1ad3aa93b%3A0xebbdfb7587bcf51a!2sVi%C3%B1a%20del%20Mar%2C%20Valpara%C3%ADso!5e0!3m2!1ses-419!2scl!4v1626898149471!5m2!1ses-419!2scl',
        precio: 159433,
        categoria: 'Turismo',
        caracteristicas:['Cancelacion gratuita disponible', 'Voucher móvil', 'Traslado de hoteles seleccionados', 
                    '9h o más', 'Confirmación instantánea', 'Varios idiomas'],
        datosGenerales: ['Descubre el pequeño pueblo de montaña de Farellones',
                  'Ver Valle Nevado, considerado el mejor centro de esquí de Sudamérica',
                  'Disfruta de las vistas panorámicas de la ciudad desde la plataforma de observación',
                  'Adquiere un boleto para montar en ascensor en Valle Nevado']
      },
      {
        id: 3,
        imagen: 'https://mediaim.expedia.com/localexpert/212892/40bf4e64-0ac1-46cd-b8f6-2401cccc6728.jpg?impolicy=resizecrop&rw=1005&rh=565',
        nombre: 'Excursión histórica de un día a Valparaíso y Viña del Mar',
        descripcion: 'Encantadoras calles empedradas y funiculares en las laderas de Valparaíso.',
        ubicacion: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14926.709415676382!2d-71.5455171!3d-33.0245039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dde1ad3aa93b%3A0xebbdfb7587bcf51a!2sVi%C3%B1a%20del%20Mar%2C%20Valpara%C3%ADso!5e0!3m2!1ses-419!2scl!4v1626898149471!5m2!1ses-419!2scl',
        precio: 48345,
        categoria: 'Turismo',
        caracteristicas:['Cancelacion gratuita disponible', 'Voucher móvil', 'Traslado de hoteles seleccionados', 
                    '10h', 'Confirmación instantánea', 'Varios idiomas'],
        datosGenerales: ['Encantadoras calles empedradas y funiculares en las laderas de Valparaíso',
                  'Playas de arena blanca y bulevares bordeados de palmeras de Viña del Mar',
                  'Reloj de flores famoso',
                  'Graffiti en las calles de Valparaíso',
                  'Conducir panorámico por los valles de Curacaví y Casablanca']
      },
      {
        id: 4,
        imagen: 'https://mediaim.expedia.com/localexpert/852760/b6e675c3-a44e-4a06-8aa2-775cbc2b4445.jpg?impolicy=resizecrop&rw=1005&rh=565',
        nombre: 'Laguna inca de Portillo en la cordillera de los Andes y degustación en el viñedo San Esteban desde Santiago',
        descripcion: 'Disfrute de un excelente viaje a un viñedo propiedad de una familia de San Esteban. Viaje a través de un paisaje espectacular...',
        ubicacion: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14926.709415676382!2d-71.5455171!3d-33.0245039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dde1ad3aa93b%3A0xebbdfb7587bcf51a!2sVi%C3%B1a%20del%20Mar%2C%20Valpara%C3%ADso!5e0!3m2!1ses-419!2scl!4v1626898149471!5m2!1ses-419!2scl',
        precio: 64571,
        categoria: 'Turismo',
        caracteristicas:['Cancelacion gratuita disponible', 'Voucher móvil', 'Traslado de hoteles seleccionados', 
                    '11h', 'Confirmación instantánea', 'Varios idiomas'],
        datosGenerales: ['Disfrute de un excelente viaje a un viñedo propiedad de una familia de San Esteban. Viaje a través de un paisaje espectacular de uno de los más hermosas lagunas de la cordillera de los Andes, un espléndido día en la cordillera de los Andes y disfrutará de vinos de buena calidad del Valle del Aconcagua. Una relajante degustación en el viñedo donde aprenderá muchas cosas sobre estos vinos y verá las montañas.']
      }
    ];
  }
}
