import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Caracteristica } from 'src/app/models/caracteristica';
import { Experiencia } from 'src/app/models/experiencia';

@Component({
  selector: 'app-exp-desc',
  templateUrl: './exp-desc.component.html',
  styleUrls: ['./exp-desc.component.css'],
})
export class ExpDescComponent implements OnChanges {

  @Input() experiencia: Experiencia | undefined;
  caracteristicas: Caracteristica[] = [];

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['experiencia'] && this.experiencia?.idExperiencia) {
      this.cargarCaracteristicas(this.experiencia.idExperiencia);
    }
  }

  cargarCaracteristicas(id: number): void {
    this.http
      .get<Caracteristica[]>(
        `http://localhost:3000/experiencia/${id}/caracteristicas`
      )
      .subscribe((data) => {
        this.caracteristicas = data;
      });
  }

  getMapaUrl(ubicacion?: string): SafeResourceUrl {
    if (!ubicacion) return '';
    const encoded = encodeURIComponent(ubicacion);
    const url = `https://maps.google.com/maps?q=${encoded}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getCustomStarClass(starIndex: number): string {
    const score = this.experiencia?.puntuacionPromedio || 0;

    const estrellas = this.mapScoreToStars(score); // 0.5, 1.0, 1.5, ..., 5.0

    if (starIndex <= Math.floor(estrellas)) {
      return 'bi bi-star-fill text-success'; // completa
    } else if (starIndex === Math.ceil(estrellas) && estrellas % 1 !== 0) {
      return 'bi bi-star-half text-success'; // media
    } else {
      return 'bi bi-star text-success'; // vacía
    }
  }

  mapScoreToStars(score: number): number {
    if (score <= 1.0) return 0.5;
    if (score <= 2.0) return 1.0;
    if (score <= 3.0) return 1.5;
    if (score <= 4.0) return 2.0;
    if (score <= 5.0) return 2.5;
    if (score <= 6.0) return 3.0;
    if (score <= 7.0) return 3.5;
    if (score <= 8.0) return 4.0;
    if (score <= 9.0) return 4.5;
    return 5.0;
  }
}
