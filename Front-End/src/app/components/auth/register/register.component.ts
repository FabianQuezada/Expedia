import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    name: '',
    surname: '',
    email: '',
    password: ''
  };

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

    this.authService.register({ nombre: name, apellido: surname, correo: email, contraseña: password }).subscribe({
      next: (res) => {
        console.log('Registro exitoso ✔️', res);
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar ❌', err);
        alert('Ocurrió un error al registrar el usuario');
      }
    });
  }
}
