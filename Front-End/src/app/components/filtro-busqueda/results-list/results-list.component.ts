import { Component, Input } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
})
export class ResultsListComponent {
  @Input() experiencias: Experiencia[] = [];
  @Input() fechaSeleccionada: Date | undefined;

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/noimage.jpg';
  }
  obtenerPrecioMinimo(exp: Experiencia): number {
    return Math.min(...(exp.fechasExperiencias?.map((f) => f.precio) || [0]));
  }
}
