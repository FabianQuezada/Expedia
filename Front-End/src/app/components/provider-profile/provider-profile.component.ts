import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Provider } from '../../services/provider/provider.service';
import { ProviderExperienceService } from '../../services/providerExperience/providerExperience.service';
import { ServiceProvider } from 'src/app/models/service-provider';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
})
export class ProviderProfileComponent implements OnInit {
  provider!: Provider;
  servicios: ServiceProvider[] = [];
  seccionSeleccionada: 'perfil' | 'servicios' | 'detalleServicio' | 'notificaciones' | 'ayudaComentarios' = 'perfil';
  servicioEditando: any = null;
  servicioSeleccionado?: ServiceProvider;

  editarPerfil = false;
  formPerfil!: FormGroup;

  constructor(
    private providerExperienceService: ProviderExperienceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Datos de prueba
    this.provider = {
      idProveedor: 1,
      nombreEmpresa: 'Expedia',
      numeroTelefono: '+56912345678',
      correo: 'expedia@email.com',
      contrasena: '********',
      fechaRegistro: '2024-01-01',
      calificacion: 4.5,
      descripcion: 'Proveedor de servicios turísticos',
    };

    this.formPerfil = this.fb.group({
      nombreEmpresa: [this.provider.nombreEmpresa, [Validators.required]],
      descripcion: [this.provider.descripcion],
      correo: [
        this.provider.correo,
        [Validators.required, Validators.email]
      ],
      numeroTelefono: [
        this.provider.numeroTelefono,
        [
          Validators.required,
          Validators.pattern(/^\+?\d{7,15}$/) 
        ]
      ]
    });
  }

  mostrarServicios(): void {
    console.log('Mostrar servicios activado');
    this.seccionSeleccionada = 'servicios';
    this.servicios = this.providerExperienceService.getServices();
    console.log('Servicios:', this.servicios);
  }

  mostrarDetalle(servicio: ServiceProvider) {
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
      console.log('Perfil actualizado:', this.provider);
      // Aquí puedes llamar a un servicio HTTP para guardar los datos en el backend
    }
  }
}
