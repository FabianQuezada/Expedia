import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { updateUser } from 'src/app/models/User/updateUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  user!: User;
  formPerfil!: FormGroup;
  editarPerfil = false;
  seccionSeleccionada: string = 'perfil';

  constructor(
    private userService: UserService,
    private authState: AuthStateService,
    private fb: FormBuilder,
    private router: Router
    
  ) {}
  
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.initForm();
      },
      error: (err) => {
        console.error('Error al obtener perfil de usuario', err);
      },
    });
  }
  irAHistorial(): void {
  this.router.navigate(['/historialExperiencia']);
}
  initForm(): void {
    this.formPerfil = this.fb.group({
      nombre: [this.user.nombre, Validators.required],
      apellido: [this.user.apellido, Validators.required],
      genero: [this.user.genero],
      fechaNacimiento: [this.user.fechaNacimiento],
      numeroTelefono: [
        this.user.numeroTelefono,
        [Validators.pattern(/^\+?\d{7,15}$/)],
      ],
    });
  }

guardarPerfil(): void {
  if (this.formPerfil.valid) {
    const datosFormulario: updateUser = {
      nombre: this.formPerfil.value.nombre,
      apellido: this.formPerfil.value.apellido,
      genero: this.formPerfil.value.genero,
      fechaNacimiento: this.formPerfil.value.fechaNacimiento,
      numeroTelefono: this.formPerfil.value.numeroTelefono,

    };

    this.userService.updateUserProfile(datosFormulario).subscribe({
      next: (data) => {
        this.user = { ...this.user, ...datosFormulario };
        this.editarPerfil = false;
        console.log('Perfil actualizado exitosamente');
      },
      error: (err) => {
        console.error('Error al actualizar perfil', err);
      }
    });
  }
}

  cerrarSesion(): void {
    this.authState.logout();
  }
}
