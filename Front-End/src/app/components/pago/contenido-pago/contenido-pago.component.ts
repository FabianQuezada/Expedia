import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { PagoService } from '../../../services/pago.service';
import { DateUtilsService } from 'src/app/services/date-utils.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { CreateReservaDto } from 'src/app/models/reserva';
import { CreatePagoDto } from 'src/app/models/createPago';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/services/auth-state.service';

@Component({
  selector: 'app-contenido-pago',
  templateUrl: './contenido-pago.component.html',
  styleUrls: ['./contenido-pago.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ContenidoPagoComponent implements OnInit {
  formulario!: FormGroup;
  datosRecibidos: any;
  metodoSeleccionado: 'credito' | 'debito' | 'paypal' | null = null;
  mostrarFormulario = false;
  reservaExitosa: boolean = false;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService,
    private reservaService: ReservaService,
    protected dateUtil: DateUtilsService,
    private router: Router,
    private authState: AuthStateService // ✅ Inyectar servicio
  ) {}

  ngOnInit(): void {
    this.datosRecibidos = history.state;

    const userId = this.authState.getUserId(); // ✅ Usar servicio
    if (userId) {
      console.log(userId)
      this.userId = userId;
    } else {
      console.error('No se pudo obtener el ID del usuario desde el token');
      return;
    }

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
    if (this.formulario.valid && this.userId) {
      const reservaDTO: CreateReservaDto = {
        cantidadPersonas:
          Number(this.datosRecibidos.adultos) +
          Number(this.datosRecibidos.ninos),
        totalPago: Number(this.datosRecibidos.total),
        fecha: this.datosRecibidos.fecha,
        idUsuario: this.userId, // ✅ seguro
        idExperiencia: Number(this.datosRecibidos.idExperiencia),
      };

      this.reservaService.crearReserva(reservaDTO).subscribe({
        next: (reserva: any) => {
          const reservaId = reserva.idReserva;
          const pagoDTO: CreatePagoDto = {
            metodo: this.metodoSeleccionado!,
            monto: Number(this.datosRecibidos.total),
            idReserva: reservaId,
            idUsuario: this.userId, // ✅ seguro
          };

          this.pagoService.crearPago(pagoDTO).subscribe({
            next: (respuesta: any) => {
              if (respuesta && respuesta.idPago) {
                this.reservaExitosa = true;
                alert('¡Reserva realizada con éxito!');
                this.router.navigate(['/home']);
              } else {
                alert('Error al registrar el pago.');
              }
            },
            error: (err) => {
              console.error('Error al crear pago:', err);
              alert('Error al procesar el pago.');
            },
          });
        },
        error: (err) => {
          console.error('Error al crear reserva:', err);
          alert('Hubo un problema al registrar la reserva.');
        },
      });
    } else {
      this.formulario.markAllAsTouched();
      alert('Completa todos los campos correctamente.');
    }
  }
}
