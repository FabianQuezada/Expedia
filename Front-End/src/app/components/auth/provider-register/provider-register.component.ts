import { Component } from '@angular/core';

@Component({
  selector: 'app-provider-register',
  templateUrl: './provider-register.component.html',
  styleUrls: ['./provider-register.component.css']
})
export class ProviderRegisterComponent {
  formSubmitted = false;
  formData = {
    empresa: '',
    email: '',
    password: ''
  };

  onSubmit() {
    const { empresa, email, password } = this.formData;
    console.log('Datos del formulario:', this.formData);

    if (!empresa || !email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }
  }
}
