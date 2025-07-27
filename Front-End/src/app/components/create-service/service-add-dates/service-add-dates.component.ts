import { Component, EventEmitter, Output } from '@angular/core';
import { Fecha } from 'src/app/models/Fecha';
import { DateUtilsService } from 'src/app/services/date-util.service';

@Component({
  selector: 'app-service-add-dates',
  templateUrl: './service-add-dates.component.html',
  styleUrls: ['./service-add-dates.component.css']
})
export class ServiceAddDatesComponent {
  @Output() fechasCambiadas = new EventEmitter<Fecha[]>();
  
  nuevaFecha: string = '';
  nuevoPrecio: number | null = null;

  fechas: Fecha[] = [];

  constructor(protected dateUtils: DateUtilsService) {}

  aceptarFecha() {
    if(!this.nuevaFecha){
      alert('Por favor, ingrese una fecha');
    }
    else if(!this.nuevoPrecio){
      alert('Por favor, ingrese un precio');
    }

    if (this.nuevaFecha && this.nuevoPrecio != null) {
      const fechaLocal = this.dateUtils.parseLocalDate(this.nuevaFecha);

      const yaExiste = this.fechas.some(f =>
        this.dateUtils.esMismaFecha(f.fecha, fechaLocal)
      );

      if (yaExiste) {
        alert('Esa fecha ya ha sido agregada');
        return;
      }

      this.fechas.push({
        fecha: fechaLocal,
        precio: this.nuevoPrecio
      });

      this.fechasCambiadas.emit(this.fechas);

      this.nuevaFecha = '';
      this.nuevoPrecio = null;
    }
  }

  getFechas(): Fecha[] {
    return [...this.fechas];
  }
}
