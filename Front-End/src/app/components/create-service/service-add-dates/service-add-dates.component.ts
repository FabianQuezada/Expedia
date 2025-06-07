import { Component, EventEmitter, Output } from '@angular/core';
import { FechaPrecio } from 'src/app/models/fecha-precio';

@Component({
  selector: 'app-service-add-dates',
  templateUrl: './service-add-dates.component.html',
  styleUrls: ['./service-add-dates.component.css']
})
export class ServiceAddDatesComponent {
  @Output() fechasCambiadas = new EventEmitter<FechaPrecio[]>();
  
  nuevaFecha: string = '';
  nuevoPrecio: number | null = null;

  fechas: FechaPrecio[] = [];

  aceptarFecha() {
    if (this.nuevaFecha && this.nuevoPrecio != null) {
      this.fechas.push({
        fecha: this.nuevaFecha,
        precio: this.nuevoPrecio
      });

      this.fechasCambiadas.emit(this.fechas); // Notificar al padre

      this.nuevaFecha = '';
      this.nuevoPrecio = null;
    }
  }
}
