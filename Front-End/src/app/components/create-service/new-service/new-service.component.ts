import { Component, ViewChild } from '@angular/core';
import { ServiceDetailUploadComponent } from '../service-detail-upload/service-detail-upload.component';
import { ServiceAddDatesComponent } from '../service-add-dates/service-add-dates.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css']
})
export class NewServiceComponent {
  @ViewChild(ServiceDetailUploadComponent)
  detalleUploadComp!: ServiceDetailUploadComponent;
  @ViewChild(ServiceAddDatesComponent) fechasComponent!: ServiceAddDatesComponent;
  @ViewChild(ImageUploadComponent) imageUploadComp!: ImageUploadComponent;
  
  crearExperiencia() {
    const expDetails = this.detalleUploadComp.getDetails();
    const fechasFinales = this.fechasComponent.getFechas();
    const imagenesFinales = this.imageUploadComp.getImagenes();

    if (!expDetails.titulo || !expDetails.descripcion || !expDetails.ubicacion || !expDetails.categoria) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    if (imagenesFinales.length != 4) {
      alert('Por favor, suba todas las imagenes.');
      return;
    }
    if (fechasFinales.length === 0) {
      alert('Por favor, ingrese por lo menos una fecha.');
      return;
    }

    console.log('Detalles experiencia:', expDetails);
    console.log('Fechas seleccionadas:', fechasFinales);
    console.log('Imágenes seleccionadas:', imagenesFinales);

  }
}
