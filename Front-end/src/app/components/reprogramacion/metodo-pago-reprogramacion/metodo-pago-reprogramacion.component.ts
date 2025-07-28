import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-metodo-pago-reprogramacion',
  templateUrl: './metodo-pago-reprogramacion.component.html',
  styleUrls: ['./metodo-pago-reprogramacion.component.css']
})
export class MetodoPagoReprogramacionComponent {
  @Input() formulario!: FormGroup;
  @Input() metodoSeleccionado!: 'credito' | 'debito' | 'paypal';
  @Output() seleccionMetodo = new EventEmitter<'credito' | 'debito' | 'paypal'>();

  seleccionarMetodo(metodo: 'credito' | 'debito' | 'paypal') {
    this.seleccionMetodo.emit(metodo);
  }

  soloNumeros(event: KeyboardEvent): void {
    const tecla = event.key;
    if (!/^\d$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'Tab' &&
        tecla !== 'ArrowLeft' && tecla !== 'ArrowRight') {
      event.preventDefault();
    }
  }

  soloFecha(event: KeyboardEvent): void {
    const tecla = event.key;
    if (!/^[\d\/]$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'Tab' &&
        tecla !== 'ArrowLeft' && tecla !== 'ArrowRight') {
      event.preventDefault();
    }
  }
}
