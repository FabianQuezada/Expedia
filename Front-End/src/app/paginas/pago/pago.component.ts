
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  formulario!: FormGroup;
  datosRecibidos: any;
  resumen: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Recibir datos desde navegación
    this.datosRecibidos = history.state;

    // Valores por defecto si no vienen datos
    if (!this.datosRecibidos?.adultos) {
      this.datosRecibidos = {
        ciudad: 'Santiago',
        titulo: 'Tour de ejemplo',
        fecha: 'mié. 23 de abr.',
        hora: this.generarHora(),
        precio: 37639,
        adultos: 1,
        ninos: 0,
        total: 37639
      };
    }

    // Inicializar formulario principal
    this.formulario = this.fb.group({
      viajeros: this.fb.array([]),
      pago: this.fb.group({
        nombreTarjeta: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)]],
        numeroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{13,16}$/)]],
        vencimiento: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
      })
    });

    // Cargar viajeros según cantidad
    this.agregarViajeros();
  }

  // Getter del FormArray de viajeros
  get viajeros(): FormArray {
    return this.formulario.get('viajeros') as FormArray;
  }

  // Getter del FormGroup de pago
  get pagoGroup(): FormGroup {
    return this.formulario.get('pago') as FormGroup;
  }

  // Añadir viajeros adultos y niños al FormArray
  agregarViajeros(): void {
    for (let i = 0; i < this.datosRecibidos.adultos; i++) {
      this.viajeros.push(this.fb.group({
        tipo: 'adulto',
        nombre: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)]],
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
      }));
    }

    for (let i = 0; i < this.datosRecibidos.ninos; i++) {
      this.viajeros.push(this.fb.group({
        tipo: 'niño',
        nombre: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)]]
      }));
    }
  }

  // Función para contar viajeros por tipo (adulto o niño) hasta el índice actual
  contarPorTipo(index: number, tipo: string): number {
    let contador = 0;
    for (let i = 0; i <= index; i++) {
      if (this.viajeros.at(i).value.tipo === tipo) {
        contador++;
      }
    }
    return contador;
  }

  // Verificar si un campo es inválido (para validación visual)
  campoInvalido(campoPath: string): boolean {
    const control = this.formulario.get(campoPath);
    return !!control && control.invalid && control.touched;
  }

  // Generar una hora aleatoria entre 9:00 y 20:59
  generarHora(): string {
    const hora = Math.floor(Math.random() * 12) + 9;
    const minutos = Math.floor(Math.random() * 60);
    return `${hora}:${minutos.toString().padStart(2, '0')}`;
  }

  // Enviar formulario si es válido
  reservar(): void {
    if (this.formulario.valid) {
      this.resumen = {
        ubicacion: this.datosRecibidos.ciudad,
        experiencia: this.datosRecibidos.titulo,
        fecha: this.datosRecibidos.fecha,
        hora: this.datosRecibidos.hora,
        total: this.datosRecibidos.total
      };

      console.log('✅ Reserva confirmada:', {
        viajeros: this.formulario.value.viajeros,
        pago: this.formulario.value.pago,
        resumen: this.resumen
      });

      alert('✅ ¡Reserva realizada con éxito!');
    } else {
      this.formulario.markAllAsTouched();
      alert('❌ Completa todos los campos correctamente.');
    }
  }
}
