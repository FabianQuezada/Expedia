import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';

@Component({
  selector: 'app-exp-images',
  templateUrl: './exp-images.component.html',
  styleUrls: ['./exp-images.component.css'],
})
export class ExpImagesComponent implements OnInit {
  @Input() experiencia: Experiencia | undefined;
  ciudad: string = '...';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.experiencia?.ubicacion) {
      this.obtenerCiudadDesdeUbicacion(this.experiencia.ubicacion);
    }
  }

  obtenerCiudadDesdeUbicacion(ubicacion: string): void {
    const [lat, lon] = ubicacion.split(',').map((val) => val.trim());
    if (!lat || !lon) return;

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.ciudad =
          data?.address?.city ||
          data?.address?.town ||
          data?.address?.village ||
          'Desconocido';
      },
      error: (err) => {
        console.error('No se pudo traducir lat/lon a ciudad ❌', err);
        this.ciudad = 'Desconocido';
      },
    });
  }

  defaultImg: string = '/assets/images/default-image.jpg';

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = this.defaultImg;
  }
}
