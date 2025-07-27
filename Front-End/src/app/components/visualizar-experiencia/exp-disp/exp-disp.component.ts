import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { Fecha } from 'src/app/models/Fecha';
import { DateUtilsService } from 'src/app/services/date-utils.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { AuthStateService } from '../../../services/auth-state.service';

@Component({
  selector: 'app-exp-disp',
  templateUrl: './exp-disp.component.html',
  styleUrls: ['./exp-disp.component.css'],
})
export class ExpDispComponent implements OnChanges {
  @Input() experiencia: Experiencia | undefined;
  @Input() fechaBusqueda: Date | undefined;
  @Input() ciudad: string = '...';
  fechaSeleccionada: Fecha | undefined;
  fechasFiltradas: Fecha[] = [];
  adultos: number = 1;
  ninos: number = 0;


  constructor(private router: Router, protected expService: ExperienceService, protected dateUtilService: DateUtilsService, private authStateService: AuthStateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Fecha de búsqueda recibida:', this.fechaBusqueda);
    this.fechaBusqueda ??= new Date();
    if (this.experiencia && this.fechaBusqueda) {
      this.filtrarFechaBusqueda();
      }

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
      this.experiencia?.fechasExperiencias[0].precio;
    return precio! * this.adultos + this.ninos * 20000;
  }

  irAPagar() {
    if (!this.fechaSeleccionada) {
      alert('Debes seleccionar una fecha.');
      return;
    }
    const idUsuario = this.authStateService.getUserId();

    
    this.router.navigate(['/pago'], {
      state: {
        ciudad: this.ciudad,
        titulo: this.experiencia?.titulo,
        fecha: this.fechaSeleccionada.fecha,
        hora: this.generarHora(),
        total: this.calcularTotal(),
        adultos: this.adultos,
        ninos: this.ninos,
        idExperiencia: this.experiencia?.idExperiencia,
      },
    });
  }

  generarHora(): string {
    const hora = Math.floor(Math.random() * 12) + 9;
    const minutos = Math.floor(Math.random() * 60);
    return `${hora}:${minutos.toString().padStart(2, '0')}`;
  }

  filtrarFechaBusqueda() {
    const fechaRef = new Date(this.fechaBusqueda!.toISOString().split('T')[0]); 
    console.log('Fecha de referencia para filtrado:', fechaRef);
    this.fechasFiltradas = this.experiencia!.fechasExperiencias
      .filter(f => new Date(f.fecha) >= fechaRef)
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .slice(0, 5); // máximo 5 fechas
  }
} 

