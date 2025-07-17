import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.css']
})
export class FiltersPanelComponent {
  price: number = 10000;
  puntuacion: number = 0;

  @Output() filtrosCambiados = new EventEmitter<{ precioMax: number, puntuacionMin: number }>();

  onFiltroChange() {
    this.filtrosCambiados.emit({
      precioMax: this.price,
      puntuacionMin: this.puntuacion
    });
  }

  setPuntuacion(p: number) {
    this.puntuacion = p;
    this.onFiltroChange();
  }  



}
