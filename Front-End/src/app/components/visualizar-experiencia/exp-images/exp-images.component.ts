import { Component, Input } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';

@Component({
  selector: 'app-exp-images',
  templateUrl: './exp-images.component.html',
  styleUrls: ['./exp-images.component.css'],
})
export class ExpImagesComponent {
  @Input() experiencia: Experiencia | undefined;
  
  get ciudadDesdeUbicacion(): string {
    if (!this.experiencia?.ubicacion) return '';

    const partes = this.experiencia.ubicacion.split(',');
    const ciudadSegmento = partes[1]?.trim(); // "1032065 Arica"

    if (!ciudadSegmento) return '';

    const ciudad = ciudadSegmento.split(' ').slice(1).join(' '); // elimina "1032065"
    return ciudad;
  }
}
