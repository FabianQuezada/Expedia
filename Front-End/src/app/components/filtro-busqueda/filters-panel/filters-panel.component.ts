import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.css']
})
export class FiltersPanelComponent {
  price: number = 10000;
  puntuacion: number = 0;
  categorias: string[] = ['cultural', 'aventura', 'gastronomia', 'naturaleza', 'historica'];
  categoriasSeleccionadas: Set<string> = new Set();

  @Output() filtrosCambiados = new EventEmitter<{ precioMax: number, puntuacionMin: number, categorias: string[] }>();

  onFiltroChange() {
    this.filtrosCambiados.emit({
      precioMax: this.price,
      puntuacionMin: this.puntuacion,
      categorias: Array.from(this.categoriasSeleccionadas)
    });
  }

  setPuntuacion(p: number) {
    this.puntuacion = p;
    this.onFiltroChange();
  }  

  onCategoriaChange(categoria: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const isChecked = input?.checked;

    if (isChecked) {
      this.categoriasSeleccionadas.add(categoria);
    } else {
      this.categoriasSeleccionadas.delete(categoria);
    }

    this.onFiltroChange(); // Emite los cambios actualizados
  }

}
