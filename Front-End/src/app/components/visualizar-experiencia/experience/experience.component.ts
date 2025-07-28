import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experiencia: Experiencia | undefined;
  fechaSeleccionada: Date | undefined;
  ciudad: string = '...';
  
  constructor(
    private experienciaService: ExperienceService, 
    private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.experienciaService.getExperienciaPorId(id).subscribe(data => {
        this.experiencia = data;
        this.obtenerCiudadDesdeUbicacion();
        
      });
    });

    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        this.fechaSeleccionada = new Date(params['date']);
      }
    });
  }
  
  getCiudadDesdeCoordsString(locationStr: string): Promise<string | null> {
    const [latStr, lngStr] = locationStr.split(',').map(coord => coord.trim());
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (isNaN(lat) || isNaN(lng)) {
      console.error('Coordenadas inválidas:', locationStr);
      return Promise.resolve(null);
    }

    const geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          // Buscar el componente "locality" que representa la ciudad
          const ciudadComp = results[0].address_components.find(comp =>
            comp.types.includes('locality')
          );

          if (ciudadComp) {
            resolve(ciudadComp.long_name);
          } else {
            // A veces la ciudad puede estar como "administrative_area_level_2"
            const adminArea = results[0].address_components.find(comp =>
              comp.types.includes('administrative_area_level_2')
            );
            resolve(adminArea?.long_name || null);
          }
        } else {
          console.warn('Geocoding falló:', status);
          resolve(null);
        }
      });
    });
  }

  private async obtenerCiudadDesdeUbicacion(): Promise<void> {
    try {
      if (this.experiencia?.ubicacion) {
        const ciudad = await this.getCiudadDesdeCoordsString(this.experiencia.ubicacion);
        this.ciudad = ciudad ?? '...';
      }
    } catch (error) {
      console.error('Fallo al obtener la ciudad:', error);
      this.ciudad = '...';
    }
  }  
}
