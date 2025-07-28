import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';
import { ServiceDetailUploadComponent } from '../../create-service/service-detail-upload/service-detail-upload.component';
import { ServiceAddDatesComponent } from '../../create-service/service-add-dates/service-add-dates.component';
import { ImageUploadComponent } from '../../create-service/image-upload/image-upload.component';
import { CrearExperiencia } from 'src/app/models/createExperience';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'],
})
export class EditServiceComponent implements OnInit {
  experienciaId: number = 0;

  @ViewChild(ServiceDetailUploadComponent)
  detalleUploadComp!: ServiceDetailUploadComponent;

  @ViewChild(ServiceAddDatesComponent)
  fechasComponent!: ServiceAddDatesComponent;

  @ViewChild(ImageUploadComponent)
  imageUploadComp!: ImageUploadComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private experienceService: ExperienceService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.experienciaId = idParam ? Number(idParam) : 0;
    this.experienceService.getExperienciaPorId(this.experienciaId).subscribe({
      next: (exp: any) => {
        console.log('Respuesta del backend:', exp);
        // Adaptar características: solo IDs
        const idCaracteristicas = Array.isArray(exp.caracteristicas)
          ? exp.caracteristicas.map((c: any) => c.idCaracteristica)
          : [];
        // Adaptar fechas
        const fechas = Array.isArray(exp.fechasExperiencias)
          ? exp.fechasExperiencias.map((f: any) => ({
              fecha: f.fecha,
              precio: Number(f.precio),
            }))
          : [];
        // Adaptar categoría (si viene como string, úsala directo)
        const categoria =
          typeof exp.categoria === 'string'
            ? exp.categoria
            : exp.categoria?.nombre ?? '';
            
        const ubicacion = exp.ubicacion
          ? {
              lat: parseFloat(exp.ubicacion.split(',')[0]),
              lng: parseFloat(exp.ubicacion.split(',')[1]),
            }
          : null;
        const experienciaAdaptada = {
          ...exp,
          idCaracteristicas,
          fechas,
          imagenes: exp.imagenes ?? [],
          categoria,
          ubicacion: exp.ubicacion ?? null,
        };
        setTimeout(() => {
          this.detalleUploadComp.setData(experienciaAdaptada);
          this.detalleUploadComp.setCaracteristicas(
            experienciaAdaptada.idCaracteristicas
          );
          this.detalleUploadComp.setCategoria(experienciaAdaptada.categoria);
          this.detalleUploadComp.setUbicacion(experienciaAdaptada.ubicacion);
          this.fechasComponent.setFechas(experienciaAdaptada.fechas);
          this.imageUploadComp.setImagenes(experienciaAdaptada.imagenes);
        });
      },
      error: (err) => {
        console.error('Error al cargar experiencia', err);
        alert('Error al cargar los datos de la experiencia');
      },
    });
  }
  actualizarExperiencia(): void {
    const expDetails = this.detalleUploadComp.getDetails();
    const fechasFinales = this.fechasComponent.getFechas();
    const imagenesFinales = this.imageUploadComp.getImagenes();
    if (
      !expDetails.titulo ||
      !expDetails.descripcion ||
      !expDetails.ubicacion ||
      !expDetails.categoria
    ) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
    if (imagenesFinales.length < 1) {
      alert('Debe haber al menos una imagen.');
      return;
    }
    if (fechasFinales.length === 0) {
      alert('Por favor, agrega al menos una fecha.');
      return;
    }
    const experienciaActualizada: CrearExperiencia = {
      titulo: expDetails.titulo,
      descripcion: expDetails.descripcion,
      ubicacion: `${expDetails.ubicacion?.lat},${expDetails.ubicacion?.lng}`,
      estado: 'ACTIVA',
      categoria: expDetails.categoria,
      idCaracteristicas: expDetails.caracteristicas,
      imagenes: imagenesFinales,
      fechas: fechasFinales,
      duracion: 5,
    };
    this.experienceService
      .actualizarExperiencia(this.experienciaId, experienciaActualizada)
      .subscribe({
        next: () => {
          alert('Experiencia actualizada con éxito.');
          this.router.navigate(['/provider-profile']);
        },
        error: (err) => {
          console.error('Error al actualizar experiencia', err);
          alert('Hubo un error al actualizar la experiencia.');
        },
      });
  }
}
