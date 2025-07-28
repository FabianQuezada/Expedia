
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authStateService.isLoggedIn$.subscribe((logged) => {
      this.isLoggedIn = logged;
    });

    this.authStateService.nombreUsuario$.subscribe((nombre) => {
      this.nombreUsuario = nombre;
    });
  }

  logout(): void {
    this.authStateService.logout();
    this.router.navigate(['/login']);
  }

  goToPerfil(): void {
    const rol = this.authStateService.getUserRole();
    const ruta = rol === 'proveedor' ? '/provider-profile' : '/perfil';
    this.router.navigate([ruta]);
  }
}
