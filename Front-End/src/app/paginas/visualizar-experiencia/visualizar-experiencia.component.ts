import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizar-experiencia',
  templateUrl: './visualizar-experiencia.component.html',
  styleUrls: ['./visualizar-experiencia.component.css']
})
export class VisualizarExperienciaComponent implements OnInit {

  experiencia: any;
  fechaSeleccionada: any = null;
  adultos: number = 1;
  ninos: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.experiencia = {
      titulo: 'Tour de Viña del Mar, Valparaíso, Casablanca y Reñaca',
      ciudad: 'Santiago',
      duracion: '10h',
      rating: 8.0,
      estado: 'Muy Bueno',
      fechasDisponibles: [
        { fecha: 'mié. 23 de abr.', precio: 37639 },
        { fecha: 'jue. 24 de abr.', precio: 42990 }
      ],
      incluye: [
        'Excursión para grupos pequeños',
        'Guía profesional',
        'Impuestos locales',
        'Vino y aceite de oliva con galletas',
        'Comentarios en vivo a bordo',
        'Recogida y entrega en el hotel'
      ],
      noIncluye: [
        'Comida y bebidas adicionales',
        'Propina opcional',
        'Entrada a La Sebastiana',
        'Funicular de Valparaíso',
        'Museo Marítimo Nacional'
      ],
      descripcion: `Dirígete por la Ruta 68 desde Santiago hasta el valle de Curacaví para una degustación gratuita de vino y aceite de oliva. Continúa hasta Valparaíso, declarada Patrimonio de la Humanidad por la UNESCO...`
    };
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
    const precio = this.fechaSeleccionada?.precio || this.experiencia.fechasDisponibles[0].precio;
    return (precio * this.adultos) + (this.ninos * 20000);
  }

  irAPagar() {
    if (!this.fechaSeleccionada) {
      alert('Debes seleccionar una fecha.');
      return;
    }

    this.router.navigate(['/pago'], {
      state: {
        ciudad: this.experiencia.ciudad,
        titulo: this.experiencia.titulo,
        fecha: this.fechaSeleccionada.fecha,
        hora: this.generarHora(),
        total: this.calcularTotal(),
        adultos: this.adultos,
        ninos: this.ninos
      }
    });
  }

  generarHora(): string {
    const hora = Math.floor(Math.random() * 12) + 9;
    const minutos = Math.floor(Math.random() * 60);
    return `${hora}:${minutos.toString().padStart(2, '0')}`;
  }
}
