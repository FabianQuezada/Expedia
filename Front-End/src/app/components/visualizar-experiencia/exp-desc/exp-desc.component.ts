import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Experiencia } from 'src/app/models/experiencia';

@Component({
  selector: 'app-exp-desc',
  templateUrl: './exp-desc.component.html',
  styleUrls: ['./exp-desc.component.css']
})
export class ExpDescComponent {
  @Input() experiencia: Experiencia | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  getMapaUrl(ubicacion?: string): SafeResourceUrl {
    if (!ubicacion) return '';
    const encoded = encodeURIComponent(ubicacion);
    const url = `https://maps.google.com/maps?q=${encoded}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}