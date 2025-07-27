import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-provider-register',
  templateUrl: './provider-register.component.html',
  styleUrls: ['./provider-register.component.css']
})
export class ProviderRegisterComponent {
  registerForm!: FormGroup;
  submitted = false;
  formData = {
    empresa: '',
    email: '',
    password: ''
  };

  constructor(private fb: FormBuilder) {}
  

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      empresa: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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

    // Aquí puedes enviar los datos al backend
    console.log('Datos del formulario:', this.registerForm.value);
  }
}
