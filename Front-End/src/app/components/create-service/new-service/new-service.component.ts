import { Component, ViewChild } from '@angular/core';
import { ServiceDetailUploadComponent } from '../service-detail-upload/service-detail-upload.component';
import { ServiceAddDatesComponent } from '../service-add-dates/service-add-dates.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { ExperienceService } from '../../../services/experience.service';
import { CrearExperiencia } from 'src/app/models/createExperience';
import { Router } from '@angular/router';

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

  constructor(private experienceService: ExperienceService, private router: Router) {}

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

  const nuevaExperiencia: CrearExperiencia = {
    titulo: expDetails.titulo,
    descripcion: expDetails.descripcion,
    ubicacion: `${expDetails.ubicacion?.lat},${expDetails.ubicacion?.lng}`,
    estado: 'ACTIVA',
    categoria: expDetails.categoria,
    idCaracteristicas: expDetails.caracteristicas,
    duracion: 5,
    fechas: fechasFinales,
    imagenes: imagenesFinales,
  };

  this.experienceService.crearExperiencia(nuevaExperiencia).subscribe({
    next: () => {
      alert('Experiencia creada con éxito');
      this.router.navigate(['/provider-profile']);
    },
    error: (err) => {
      console.error('Error al crear experiencia', err);
      alert('Error al crear experiencia. Por favor, intente nuevamente.');
    }
  });
  }
}
