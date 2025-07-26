import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { PagoService } from '../../../services/pago.service';
import { DateUtilsService } from 'src/app/services/date-utils.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { CreateReservaDto } from 'src/app/models/reserva';

@Component({
  selector: 'app-contenido-pago',
  templateUrl: './contenido-pago.component.html',
  styleUrls: ['./contenido-pago.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class ContenidoPagoComponent implements OnInit {
  formulario!: FormGroup;
  datosRecibidos: any;
  resumen: any;
  metodoSeleccionado: 'credito' | 'debito' | 'paypal' | null = null;
  mostrarFormulario = false;
  reservaExitosa: boolean = false;

  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService,
    private reservaService: ReservaService,
    protected dateUtil: DateUtilsService
  ) {}

  ngOnInit(): void {
    this.datosRecibidos = history.state;

    this.formulario = this.fb.group({
      encargado: this.fb.group({
        nombre: [
          '',
          [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)],
        ],
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      }),
      metodo: [''],
      pago: this.fb.group({
        nombreTarjeta: [
          '',
          [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)],
        ],
        numeroTarjeta: [
          '',
          [Validators.required, Validators.pattern(/^\d{16}$/)],
        ],
        vencimiento: [
          '',
          [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
        ],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      }),
      paypal: this.fb.group({
        correoPaypal: ['', [Validators.required, Validators.email]],
        contrasenaPaypal: ['', [Validators.required, Validators.minLength(6)]],
      }),
    });
  }

  get pagoGroup(): FormGroup {
    return this.formulario.get('pago') as FormGroup;
  }

  get paypalGroup(): FormGroup {
    return this.formulario.get('paypal') as FormGroup;
  }

  get encargadoGroup(): FormGroup {
    return this.formulario.get('encargado') as FormGroup;
  }

  campoInvalido(campoPath: string): boolean {
    const control = this.formulario.get(campoPath);
    return !!control && control.invalid && control.touched;
  }

  generarHora(): string {
    const hora = Math.floor(Math.random() * 12) + 9;
    const minutos = Math.floor(Math.random() * 60);
    return `${hora}:${minutos.toString().padStart(2, '0')}`;
  }

  seleccionarMetodo(metodo: 'credito' | 'debito' | 'paypal'): void {
    this.metodoSeleccionado = metodo;
    this.formulario.get('metodo')?.setValue(metodo);
    this.mostrarFormulario = true;

    this.pagoGroup.enable();
    this.paypalGroup.enable();

    if (metodo === 'paypal') {
      this.pagoGroup.disable();
    } else {
      this.paypalGroup.disable();
    }
  }

  soloNumeros(event: KeyboardEvent): void {
    const tecla = event.key;
    if (
      !/^\d$/.test(tecla) &&
      tecla !== 'Backspace' &&
      tecla !== 'Tab' &&
      tecla !== 'ArrowLeft' &&
      tecla !== 'ArrowRight'
    ) {
      event.preventDefault();
    }
  }

  soloNumerosYSlash(event: KeyboardEvent): void {
    const tecla = event.key;
    if (
      !/^\d$/.test(tecla) &&
      tecla !== '/' &&
      tecla !== 'Backspace' &&
      tecla !== 'Tab' &&
      tecla !== 'ArrowLeft' &&
      tecla !== 'ArrowRight'
    ) {
      event.preventDefault();
    }
  }

  reservar(): void {
    if (this.formulario.valid) {
      const datosPago =
        this.metodoSeleccionado === 'paypal'
          ? this.paypalGroup.value
          : this.pagoGroup.value;

      this.resumen = {
        ubicacion: this.datosRecibidos.ciudad,
        experiencia: this.datosRecibidos.titulo,
        fecha: this.datosRecibidos.fecha,
        hora: this.datosRecibidos.hora,
        total: this.datosRecibidos.total,
      };
      const fechaOriginal = new Date(this.datosRecibidos.fecha);
      fechaOriginal.setHours(0, 0, 0, 0); // Elimina la hora

      console.log('ID experiencia: ', this.datosRecibidos.idUsuario);

      const reservaDTO: CreateReservaDto = {
        cantidadPersonas:
          Number(this.datosRecibidos.adultos) +
          Number(this.datosRecibidos.ninos),
        totalPago: Number(this.datosRecibidos.total),
        fecha: this.datosRecibidos.fecha, // Se envía como Date sin hora,
        idUsuario: Number(this.datosRecibidos.idUsuario ?? 1),
        idExperiencia: Number(this.datosRecibidos.idExperiencia),
      };

      this.reservaService.crearReserva(reservaDTO).subscribe({
        next: (reserva: any) => {
          const reserva_id = reserva.idReserva;

          this.pagoService
            .crearPago({
              metodo: this.metodoSeleccionado,
              monto: this.resumen.total,
              datosPago,
              reserva_id,
            })
            .subscribe((respuesta: any) => {
              if (respuesta.success) {
                this.reservaExitosa = true;
                alert('¡Reserva realizada con éxito!');
              }
            });
        },
        error: (err) => {
          console.error('❌ Error al crear reserva:', err);
          alert(
            'Hubo un problema al registrar la reserva. Verifica los datos.'
          );
        },
      });
    } else {
      this.formulario.markAllAsTouched();
      alert('Completa todos los campos correctamente.');
    }
  }
}
