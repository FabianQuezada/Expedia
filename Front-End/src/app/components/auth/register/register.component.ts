import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('inputNames') inputNames!: ElementRef;
  @ViewChild('inputSurnames') inputSurnames!: ElementRef;
  @ViewChild('inputEmail') inputEmail!: ElementRef;
  @ViewChild('inputPassword') inputPassword!: ElementRef;

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

  onSubmit(event: Event) {
    event.preventDefault();

    const nombre = (document.getElementById('inputNames') as HTMLInputElement)?.value.trim();
    const apellido = (document.getElementById('inputSurnames') as HTMLInputElement)?.value.trim();
    const correo = (document.getElementById('inputEmail') as HTMLInputElement)?.value.trim();
    const contraseña = (document.getElementById('inputPassword') as HTMLInputElement)?.value.trim();

    if (!nombre || !apellido || !correo || !contraseña) {
      alert('Por favor completa todos los campos ❗');
      return;
    }

    this.authService.register({ nombre, apellido, correo, contraseña }).subscribe({
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
