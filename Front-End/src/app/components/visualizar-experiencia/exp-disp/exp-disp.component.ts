import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { Fecha } from 'src/app/models/Fecha';

@Component({
  selector: 'app-exp-disp',
  templateUrl: './exp-disp.component.html',
  styleUrls: ['./exp-disp.component.css'],
})
export class ExpDispComponent {
  @Input() experiencia: Experiencia | undefined;
  fechaSeleccionada: Fecha | undefined;
  adultos: number = 1;
  ninos: number = 0;

  constructor(private router: Router) {}

  getFechaString(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    };

    let fechaFormateada = new Date(fecha).toLocaleDateString('es-CL', opciones);

    fechaFormateada = fechaFormateada
      .toLowerCase()
      .replace(/(^|\s)([a-záéíóúüñ])/, (m) => m.toLowerCase());

    return fechaFormateada;
  }

  seleccionarFecha(fechaObj: any) {
    this.fechaSeleccionada = fechaObj;
  }

  cambiarCantidad(tipo: 'adultos' | 'ninos', cambio: number) {
    if (tipo === 'adultos') {
      this.adultos = Math.max(1, this.adultos + cambio);
    } else {
      this.ninos = Math.max(0, this.ninos + cambio);
    }
  }

  calcularTotal(): number {
    const precio =
      this.fechaSeleccionada?.precio ||
      this.experiencia?.fechasExperiencia[0].precio;
    return precio! * this.adultos + this.ninos * 20000;
  }

  irAPagar() {
    if (!this.fechaSeleccionada) {
      alert('Debes seleccionar una fecha.');
      return;
    }

    this.router.navigate(['/pago'], {
      state: {
        ciudad: this.experiencia?.ubicacion,
        titulo: this.experiencia?.titulo,
        fecha: this.fechaSeleccionada.fecha,
        hora: this.generarHora(),
        total: this.calcularTotal(),
        adultos: this.adultos,
        ninos: this.ninos,
      },
    });
  }

  generarHora(): string {
    const hora = Math.floor(Math.random() * 12) + 9;
    const minutos = Math.floor(Math.random() * 60);
    return `${hora}:${minutos.toString().padStart(2, '0')}`;
  }
}
