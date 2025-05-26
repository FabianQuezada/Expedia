import { Component } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-service-detail-upload',
  templateUrl: './service-detail-upload.component.html',
  styleUrls: ['./service-detail-upload.component.css'],
})
export class ServiceDetailUploadComponent {
  center: google.maps.LatLngLiteral = { lat: -33.4489, lng: -70.6693 };
  markerPosition: google.maps.LatLngLiteral = { lat: -33.4489, lng: -70.6693 };

  // Al hacer click en el mapa
  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    }
  }

  // Al arrastrar el marcador
  onMarkerDrag(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    }
  }
}
