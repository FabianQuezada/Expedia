
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileProveedorService } from 'src/app/services/profile-proveedor.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  nombreUsuario: string | null = null;

  constructor(
    private authStateService: AuthStateService,
    private router: Router,
    private userService: UserService,
    private proveedorService: ProfileProveedorService
  ) {}

  ngOnInit(): void {
    this.authStateService.isLoggedIn$.subscribe((logged) => {
      this.isLoggedIn = logged;

      if (logged) {
        const rol = this.authStateService.getUserRole();

        if (rol === 'proveedor') {
          this.proveedorService.getUserProfile().subscribe({
            next: (proveedor) => {
              this.nombreUsuario = proveedor.nombreEmpresa;
            },
            error: (err) => {
              console.error('Error cargando perfil del proveedor:', err);
            }
          });
        } else {
          this.userService.getUserProfile().subscribe({
            next: (usuario) => {
              this.nombreUsuario = `${usuario.nombre} ${usuario.apellido}`;
            },
            error: (err) => {
              console.error('Error cargando perfil del usuario:', err);
            }
          });
        }
      } else {
        this.nombreUsuario = null;
      }
    });
  }

  logout(): void {
    this.authStateService.logout();
    this.router.navigate(['/login']);
  }

  goToPerfil(): void {
    const rol = this.authStateService.getUserRole();
    const ruta = rol === 'proveedor' ? '/perfil-proveedor' : '/perfil';
    this.router.navigate([ruta]);
  }
}
