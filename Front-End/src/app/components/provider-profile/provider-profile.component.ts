import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienceService } from 'src/app/services/experience.service';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { Router } from '@angular/router';
import { ProfileProveedorService } from 'src/app/services/profile-proveedor.service';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
})
export class ProviderProfileComponent implements OnInit {
  servicios: Experiencia[] = [];
  servicioSeleccionado?: Experiencia;
  seccionSeleccionada: 'perfil' | 'servicios' | 'detalleServicio' | 'notificaciones' | 'ayudaComentarios' = 'perfil';
  editarPerfil = false;
  formPerfil!: FormGroup;

  provider = {
    nombreEmpresa: '',
    correo: '',
    numeroTelefono: '',
    fechaRegistro: '',
    calificacion: 0,
    descripcion: ''
  };

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService,
    private authState: AuthStateService,
    private router: Router,
    private profileService: ProfileProveedorService
  ) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      next: (data) => {
        this.provider = {
          nombreEmpresa: data.nombreEmpresa || '',
          correo: data.correo || '',
          numeroTelefono: data.numeroTelefono || '',
          fechaRegistro: data.fechaRegistro || '',
          calificacion: data.calificacion || 0,
          descripcion: data.descripcion || ''
        };

        this.formPerfil = this.fb.group({
          nombreEmpresa: [this.provider.nombreEmpresa, [Validators.required]],
          descripcion: [this.provider.descripcion],
          correo: [this.provider.correo, [Validators.required, Validators.email]],
          numeroTelefono: [
            this.provider.numeroTelefono,
            [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)],
          ],
        });
      },
      error: (err) => {
        console.error('❌ Error al obtener perfil del proveedor:', err);
      },
    });
  }

  mostrarServicios(): void {
    this.seccionSeleccionada = 'servicios';

    this.experienceService.getMisExperiencias().subscribe({
      next: (data: Experiencia[]) => {
        this.servicios = data;
        console.log('✅ Experiencias del proveedor logueado:', data);
      },
      error: (err) => {
        console.error('❌ Error al cargar experiencias del proveedor:', err);
      }
    });
  }

  mostrarDetalle(servicio: Experiencia): void {
    this.servicioSeleccionado = servicio;
    this.seccionSeleccionada = 'detalleServicio';
  }

  guardarPerfil(): void {
    if (this.formPerfil.valid) {
      this.provider = {
        ...this.provider,
        ...this.formPerfil.value
      };
      this.editarPerfil = false;
      console.log('✅ Perfil actualizado (solo en frontend):', this.provider);
      // Si quieres guardar en backend en el futuro, aquí iría el PATCH
    }
  }

  cerrarSesion(): void {
    this.authState.logout();
    this.router.navigate(['/login']);
  }
}
