import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AuthStateService } from '../../../services/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  constructor(private authService: AuthService, private authStateService: AuthStateService, private router: Router) {}

  ngAfterViewInit(): void {
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', this.onSubmit.bind(this));
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const correoInput = document.getElementById(
      'inputEmail'
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      'inputPassword'
    ) as HTMLInputElement;

    const correo = correoInput?.value.trim();
    const contraseña = passwordInput?.value;

    if (!correo || !contraseña) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.authService.login({ correo, contraseña }).subscribe({
      next: (res: any) => {
        if (res.token) {
          this.authStateService.loginSuccess(res.token);
          this.router.navigate(['/home']);
        } else {
          alert('Error: el servidor no retornó token');
        }
      },
      error: (err) => {
        console.error('Error de login', err);
        alert('Correo o contraseña incorrectos');
      },
    });
  }
}
