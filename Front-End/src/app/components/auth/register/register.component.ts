import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formData = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };

  mensajeError: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', this.onSubmit.bind(this));
    }
  }

  onSubmit() {
    const { name, surname, email, password } = this.formData;
    console.log('Datos del formulario:', this.formData);
    if (!name || !surname || !email || !password) {
      alert('Por favor completa todos los campos ❗');
      return;
    }

    const { name, surname, email, password } = this.formData;

    this.authService
      .register({
        nombre: name,
        apellido: surname,
        correo: email,
        contraseña: password,
      })
      .subscribe({
        next: (res) => {
          this.mensajeError = null;
          alert('Usuario registrado correctamente');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error al registrar ❌', err);
          alert('Error al registrar'+err?.error?.message);
          this.mensajeError = Array.isArray(err?.error?.message)
            ? err.error.message.join('. ')
            : err?.error?.message || 'Error inesperado al registrar.';
        },
      });
  }
}
