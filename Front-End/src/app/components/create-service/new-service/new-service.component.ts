import { Component, EventEmitter, Output } from '@angular/core';
import { FechaPrecio } from 'src/app/models/fecha-precio';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css']
})
export class NewServiceComponent {

  nuevaExperiencia: any;
  fechasServicio: FechaPrecio[] = [];
  experiencia: any;
  imagenes: (string | null)[] = [];

  @Output() experienciaCambiada = new EventEmitter<any>();

  ngOnChanges() {
    this.experienciaCambiada.emit(this.nuevaExperiencia);
  }

  recibirDatos(event: any) {
    this.experiencia = event;
  }

  guardarImagenes(imagenes: (string | null)[]) {
  this.imagenes = imagenes;
  }

  guardarFechas(fechaList: FechaPrecio[]) {
  this.fechasServicio = fechaList;
  }
  
  crearExperiencia() {
    throw new Error('Method not implemented.');
  }
}
