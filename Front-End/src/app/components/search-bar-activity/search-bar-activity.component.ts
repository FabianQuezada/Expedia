import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar-activity',
  templateUrl: './search-bar-activity.component.html',
  styleUrls: ['./search-bar-activity.component.css']
})
export class SearchBarActivityComponent {
  destino: string = '';

  @Output() destinoSeleccionado = new EventEmitter<string>();
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
    const destinoFormateado = this.destino.trim().replace(/ /g, '-');
    if (destinoFormateado) {
      this.destinoSeleccionado.emit(destinoFormateado);
    } else {
      console.warn('Destino vacío o inválido, no se emitió');
    }  
  }
}
