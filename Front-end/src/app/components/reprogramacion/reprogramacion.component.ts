import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reprogramacion',
  templateUrl: './reprogramacion.component.html',
  styleUrls: ['./reprogramacion.component.css']
})
export class ReprogramacionComponent implements OnInit {

  formulario!: FormGroup;
  datosRecibidos: any;
  metodoSeleccionado: 'credito' | 'debito' | 'paypal' = 'credito';
  reservaExitosa: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.datosRecibidos = history.state;

    if (!this.datosRecibidos?.adultos) {
      this.datosRecibidos = {
        ciudad: 'Santiago',
        titulo: 'Tour de ejemplo',
        fecha: '04/05/2025',
        hora: this.generarHora(),
        precio: 80000,
        adultos: 1,
        ninos: 0,
        total: 80000
      };
    }

    this.formulario = this.fb.group({
      nuevaFecha: ['', Validators.required],

      encargado: this.fb.group({
        nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
        apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
        celular: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        correo: ['', [Validators.required, Validators.email]]
      }),

      // Crédito
      nombreTarjeta: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      fechaVencimiento: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/\\d{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],

      // Débito
      nombreDebito: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      numeroDebito: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      fechaDebito: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/\\d{2}$')]],
      cvvDebito: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],

      // PayPal
      correoPaypal: ['', [Validators.required, Validators.email]],
      clavePaypal: ['', Validators.required]
    });
  }

  generarHora(): string {
    const horas = ['08:00', '10:30', '13:00', '15:45'];
    const random = Math.floor(Math.random() * horas.length);
    return horas[random];
  }

  seleccionarMetodo(metodo: 'credito' | 'debito' | 'paypal') {
    this.metodoSeleccionado = metodo;
    this.activarTodosLosCampos(); // Para cambiar entre métodos sin errores
  }

  reagendar(): void {
    const f = this.formulario;
    const metodo = this.metodoSeleccionado;

    this.activarTodosLosCampos();

    if (metodo === 'credito') {
      this.deshabilitarCampos([
        'nombreDebito', 'numeroDebito', 'fechaDebito', 'cvvDebito',
        'correoPaypal', 'clavePaypal'
      ]);
    } else if (metodo === 'debito') {
      this.deshabilitarCampos([
        'nombreTarjeta', 'numeroTarjeta', 'fechaVencimiento', 'cvv',
        'correoPaypal', 'clavePaypal'
      ]);
    } else if (metodo === 'paypal') {
      this.deshabilitarCampos([
        'nombreTarjeta', 'numeroTarjeta', 'fechaVencimiento', 'cvv',
        'nombreDebito', 'numeroDebito', 'fechaDebito', 'cvvDebito'
      ]);
    }

    f.updateValueAndValidity();

    if (f.invalid) {
      f.markAllAsTouched();
      alert('⚠️ Por favor, completa todos los campos requeridos.');
      return;
    }

    console.log('✅ Reprogramación enviada:', f.value);
    this.reservaExitosa = true;
    setTimeout(() => this.reservaExitosa = false, 3000);
  }

  cancelar(): void {
    history.back();
  }

  private deshabilitarCampos(campos: string[]) {
    campos.forEach(campo => this.formulario.get(campo)?.disable({ emitEvent: false }));
  }

  private activarTodosLosCampos() {
    [
      'nombreTarjeta', 'numeroTarjeta', 'fechaVencimiento', 'cvv',
      'nombreDebito', 'numeroDebito', 'fechaDebito', 'cvvDebito',
      'correoPaypal', 'clavePaypal'
    ].forEach(campo => this.formulario.get(campo)?.enable({ emitEvent: false }));
  }

  soloNumeros(event: KeyboardEvent): void {
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode) && charCode !== 'Backspace' && charCode !== 'Tab') {
      event.preventDefault();
    }
  }

  soloFecha(event: KeyboardEvent): void {
    const charCode = event.key;
    if (!/^[0-9\/]$/.test(charCode) && charCode !== 'Backspace' && charCode !== 'Tab') {
      event.preventDefault();
    }
  }

}
