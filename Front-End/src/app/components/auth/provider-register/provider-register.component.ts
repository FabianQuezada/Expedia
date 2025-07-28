import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'; // Ajusta el path si es necesario
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-provider-register',
  templateUrl: './provider-register.component.html',
  styleUrls: ['./provider-register.component.css'],
})
export class ProviderRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  errorMessage: string | null = null;
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      empresa: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const formData = {
      nombreEmpresa: this.registerForm.value.empresa,
      correo: this.registerForm.value.email,
      contraseña: this.registerForm.value.password,
    };

    this.authService.registerProveedor(formData).subscribe({
      next: (res) => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al registrar:', err);
        if (err.error && err.error.message) {
          this.errorMessage = Array.isArray(err.error.message)
            ? err.error.message.join(', ')
            : err.error.message;
            alert('Error al registrar: ' + this.errorMessage);
        } else {
          this.errorMessage =
            'Ocurrió un error inesperado. Intenta nuevamente.';
            alert('Error al registrar: ' + this.errorMessage);
            
        }
      },
    });
  }
}
