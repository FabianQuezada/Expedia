import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar-activity',
  templateUrl: './search-bar-activity.component.html',
  styleUrls: ['./search-bar-activity.component.css']
})
export class SearchBarActivityComponent {
  destino: string = '';
  fecha: Date|undefined;

  @Output() busquedaEmitida = new EventEmitter<{ destino: string, fecha: Date }>();
  @Input() destinoBusqueda: string = '';


  ngAfterViewInit(): void {
    const input = document.getElementById('floatingLocation') as HTMLInputElement;

    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['(regions)'], // Solo regiones (ciudades, países, etc.)
      fields: ['name', 'geometry', 'place_id'],
      componentRestrictions: { country: 'cl' }
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place?.name) {
        this.destino = place.name;
      }
    });
  }

  onBuscarClick() {
    const fechaReal = this.fecha ? new Date(this.fecha) : undefined;
    const destinoFormateado = this.destino.trim().replace(/ /g, '-');
    if (!destinoFormateado) {
    alert('Por favor, ingresa un destino.');
    return;
    }

    if (!fechaReal) {
      alert('Por favor, selecciona una fecha.');
      return;
    }
    if (destinoFormateado && fechaReal) {
      this.busquedaEmitida.emit({ destino: destinoFormateado, fecha: fechaReal });
    } else {
      console.warn('Destino vacío o inválido, o fecha no definida, no se emitió');
    }  
  }
}
