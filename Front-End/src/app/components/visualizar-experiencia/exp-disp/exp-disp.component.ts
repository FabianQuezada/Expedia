import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { Fecha } from 'src/app/models/Fecha';
import { ExperienceService } from 'src/app/services/experience.service';
import { AuthStateService } from '../../../services/auth-state.service';

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

  constructor(
    private router: Router,
    protected expService: ExperienceService,
    private authStateService: AuthStateService
  ) {}

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
      this.experiencia?.fechasExperiencias[0].precio;
    return precio! * this.adultos + this.ninos * 20000;
  }

  irAPagar() {
    if (!this.fechaSeleccionada) {
      alert('Debes seleccionar una fecha.');
      return;
    }
    const idUsuario = this.authStateService.getUserId();

    if (!idUsuario) {
      alert('No se pudo obtener la sesión del usuario');
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
        idExperiencia: this.experiencia?.idExperiencia,
        idUsuario: idUsuario,
      },
    });
  }

  generarHora(): string {
    const hora = Math.floor(Math.random() * 12) + 9;
    const minutos = Math.floor(Math.random() * 60);
    return `${hora}:${minutos.toString().padStart(2, '0')}`;
  }
}
