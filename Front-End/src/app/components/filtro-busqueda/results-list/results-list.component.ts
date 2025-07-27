import { Component, Input, OnChanges } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css'],
})
export class ResultsListComponent implements OnChanges {
  @Input() experiencias: Experiencia[] = [];
  @Input() fechaSeleccionada: Date | undefined;

  cantidadResenas: { [id: number]: number } = {};

  constructor(private experienciaService: ExperienceService) {}

  ngOnChanges(): void {
    this.experiencias.forEach((exp) => {
      if (exp.idExperiencia) {
        this.experienciaService
          .getCantidadResenas(exp.idExperiencia)
          .subscribe({
            next: (count) => (this.cantidadResenas[exp.idExperiencia] = count),
            error: () => (this.cantidadResenas[exp.idExperiencia] = 0),
          });
      }
    });
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/noimage.jpg';
  }

  obtenerPrecioMinimo(exp: Experiencia): number {
    return Math.min(...(exp.fechasExperiencias?.map((f) => f.precio) || [0]));
  }
}
