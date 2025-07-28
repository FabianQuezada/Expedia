import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
@Component({
  selector: 'app-service-detail-upload',
  templateUrl: './service-detail-upload.component.html',
  styleUrls: ['./service-detail-upload.component.css'],
})
export class ServiceDetailUploadComponent {
  center: google.maps.LatLngLiteral = {
    lat: -33.4489,
    lng: -70.6693,
  };

  nuevaExperiencia = {
    titulo: '',
    descripcion: '',
    ubicacion: null as google.maps.LatLngLiteral | null,
    categoria: '',
  };

  zoom = 14;
  markerPosition: google.maps.LatLngLiteral | null = null;
  address: string | null = null;
  direccionBuscada: string = '';
  direccionConfirmada: string | null = null;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    const input = document.getElementById('autocomplete') as HTMLInputElement;

    if (!input) return;

    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['geocode'],
    });

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;

        const location = place.geometry.location;
        this.markerPosition = {
          lat: location.lat(),
          lng: location.lng(),
        };

        this.center = { ...this.markerPosition };
        this.direccionConfirmada = place.formatted_address || '';
      });
    });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.getAddressFromCoords(
        this.markerPosition.lat,
        this.markerPosition.lng
      );
    }
  }

  getAddressFromCoords(lat: number, lng: number): void {
    const geocoder = new google.maps.Geocoder();
    const latLng = { lat, lng };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        this.address = results[0].formatted_address;
      } else {
        this.address = 'No se pudo obtener la dirección';
      }
    });
  }

  // Método para manejar automáticamente el tamaño del textarea de titulo
  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // set new height
  }

  buscarDireccion() {
    if (!this.direccionBuscada) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.direccionBuscada }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;

        this.markerPosition = {
          lat: location.lat(),
          lng: location.lng(),
        };

        this.center = { ...this.markerPosition };
        this.direccionConfirmada = results[0].formatted_address;
      } else {
        alert('No se encontró la dirección');
      }
    });
  }

  getDetails() {
    this.nuevaExperiencia.ubicacion = this.markerPosition;

    const experienciaFinal = {
      ...this.nuevaExperiencia,
      caracteristicas: this.obtenerCaracteristicas(),
    };

    return experienciaFinal;
  }

  obtenerCaracteristicas(): number[] {
    const opciones: { id: string; label: string; value: number }[] = [
      {
        id: 'checkCancelacion',
        label: 'Cancelación gratuita disponible',
        value: 1,
      },
      { id: 'checkVoucher', label: 'Voucher móvil', value: 2 },
      {
        id: 'checkTraslado',
        label: 'Traslado de hoteles seleccionados',
        value: 3,
      },
      {
        id: 'checkAccesibilidad',
        label: 'Accesible para personas con movilidad reducida',
        value: 4,
      },
      { id: 'checkConfirmacion', label: 'Confirmación instantánea', value: 5 },
      { id: 'checkIdiomas', label: 'Varios idiomas', value: 6 },
    ];

    return opciones
      .filter((op) => {
        const input = document.getElementById(op.id) as HTMLInputElement;
        return input && input.checked;
      })
      .map((op) => op.value);
  }
  setData(exp: any): void {
    // Adaptar ubicación
    let ubicacionAdaptada: { lat: number; lng: number } | null = null;
    if (exp.ubicacion) {
      if (typeof exp.ubicacion === 'string') {
        const [lat, lng] = exp.ubicacion.split(',').map(Number);
        ubicacionAdaptada = { lat, lng };
      } else if (
        typeof exp.ubicacion === 'object' &&
        exp.ubicacion.lat &&
        exp.ubicacion.lng
      ) {
        ubicacionAdaptada = exp.ubicacion;
      }
    } else {
      // Ubicación por defecto
      ubicacionAdaptada = { lat: -33.4489, lng: -70.6693 };
    }

    // Adaptar categoría
    const categoriaAdaptada =
      typeof exp.categoria === 'string'
        ? exp.categoria
        : exp.categoria?.nombre ?? '';

    this.nuevaExperiencia = {
      titulo: exp.titulo,
      descripcion: exp.descripcion,
      categoria: categoriaAdaptada,
      ubicacion: ubicacionAdaptada,
    };

    this.markerPosition = ubicacionAdaptada;
    if (this.markerPosition) {
      this.center = this.markerPosition;
    }

    setTimeout(() => {
      this.setCaracteristicas(exp.idCaracteristicas ?? []);
      this.setCategoria(categoriaAdaptada);
      if (ubicacionAdaptada) {
        this.setUbicacion(ubicacionAdaptada);
      }
    }, 0);
  }

  setCategoria(categoria: string): void {
    console.log(categoria);
    this.nuevaExperiencia.categoria = categoria;

    // Si usas radio buttons o checkboxes para categorías:
    const categoriasIds = [
      'catCultural',
      'catAventura',
      'catGastronomia',
      // agrega aquí los ids de tus categorías
    ];

    categoriasIds.forEach((catId) => {
      const input = document.getElementById(catId) as HTMLInputElement;
      if (input) {
        input.checked = input.value === categoria;
      }
    });
  }

  setUbicacion(ubicacion: { lat: number; lng: number }): void {
    console.log(ubicacion);
    this.nuevaExperiencia.ubicacion = ubicacion;
    this.markerPosition = ubicacion;
    this.center = ubicacion;
  }

  setCaracteristicas(ids: number[]): void {
    const idToDomId: { [key: number]: string } = {
      1: 'checkCancelacion',
      2: 'checkVoucher',
      3: 'checkTraslado',
      4: 'checkAccesibilidad',
      5: 'checkConfirmacion',
      6: 'checkIdiomas',
    };

    // Limpiar todos los checks primero
    Object.values(idToDomId).forEach((elementId) => {
      const input = document.getElementById(elementId) as HTMLInputElement;
      if (input) {
        input.checked = false;
      }
    });

    // Setear los checks correspondientes
    ids.forEach((id) => {
      const elementId = idToDomId[id];
      const input = document.getElementById(elementId) as HTMLInputElement;
      if (input) {
        input.checked = true;
      }
    });
  }
}
