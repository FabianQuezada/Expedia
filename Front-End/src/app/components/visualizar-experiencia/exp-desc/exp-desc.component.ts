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

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['experiencia'] && this.experiencia?.idExperiencia) {
      this.cargarCaracteristicas(this.experiencia.idExperiencia);
    }
  }

  cargarCaracteristicas(id: number): void {
    this.http
      .get<Caracteristica[]>(`http://localhost:3000/experiencia/${id}/caracteristicas`)
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
}