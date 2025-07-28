import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.css']
})
export class MetodoPagoComponent {
  @Input() formulario!: FormGroup;
  @Input() metodoSeleccionado: 'credito' | 'debito' | 'paypal' | null = null;
  @Input() mostrarFormulario: boolean = false;

  @Output() seleccionCambio = new EventEmitter<'credito' | 'debito' | 'paypal'>();

  seleccionarMetodo(metodo: 'credito' | 'debito' | 'paypal') {
    this.seleccionCambio.emit(metodo);
  }

  soloNumeros(event: KeyboardEvent): void {
    const tecla = event.key;
    if (!/^\d$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'Tab' &&
        tecla !== 'ArrowLeft' && tecla !== 'ArrowRight') {
      event.preventDefault();
    }
  }

  soloNumerosYSlash(event: KeyboardEvent): void {
    const tecla = event.key;
    if (!/^\d$/.test(tecla) && tecla !== '/' && tecla !== 'Backspace' &&
        tecla !== 'Tab' && tecla !== 'ArrowLeft' && tecla !== 'ArrowRight') {
      event.preventDefault();
    }
  }

  campoInvalido(path: string): boolean {
    const control = this.formulario.get(path);
    return !!control && control.invalid && control.touched;
  }

  get pagoGroup(): FormGroup {
    return this.formulario.get('pago') as FormGroup;
  }

  get paypalGroup(): FormGroup {
    return this.formulario.get('paypal') as FormGroup;
  }
}
