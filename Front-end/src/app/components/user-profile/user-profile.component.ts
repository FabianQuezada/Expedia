import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user/user.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { ServiceProvider } from 'src/app/models/service-provider';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  user!: User;
  servicios: ServiceProvider[] = [];
  seccionSeleccionada: 'perfil' | 'servicios' | 'detalleServicio' | 'notificaciones' | 'ayudaComentarios' | 'misReservas' = 'perfil';
  servicioEditando: any = null;
  servicioSeleccionado?: ServiceProvider;

  constructor(private providerService: ProviderService) {}

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
      tipo: 'Proveedor'
    };
  }

  mostrarServicios(): void {
    console.log('Mostrar servicios activado');
    this.seccionSeleccionada = 'servicios';
    this.servicios = this.providerService.getServices();
    console.log('Servicios:', this.servicios);
  }

  mostrarDetalle(servicio: ServiceProvider) {
    this.servicioSeleccionado = servicio;
    this.seccionSeleccionada = 'detalleServicio';
  }
}