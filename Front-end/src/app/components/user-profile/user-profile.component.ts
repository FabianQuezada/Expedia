import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  user!: User;
   seccionSeleccionada: string = 'perfil';

    cerrarSesion() {
    // lógica aquí
  }
  ngOnInit(): void {
    // Datos de prueba
    this.user = {
      idUsuario: 1,
      nombre: 'Valentina',
      apellido: 'Ramírez',
      genero: 'Femenino',
      fechaNacimiento: '1998-05-14',
      numeroTelefono: '+56912345678',
      correo: 'valentina.ramirez@email.com',
      contrasena: '********',
      fechaRegistro: '2024-01-01',
    };
  }
}