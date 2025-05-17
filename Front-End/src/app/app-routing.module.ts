import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizarExperienciaComponent } from '../app/paginas/visualizar-experiencia/visualizar-experiencia.component';
import { PagoComponent } from './paginas/pago/pago.component';
import { AnuncioComponent } from './paginas/anuncio/anuncio.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { LoginComponent } from './paginas/login/login.component'; // ✅ nuevo import

const routes: Routes = [
  { path: '', redirectTo: '/experiencia', pathMatch: 'full' },
  { path: 'experiencia', component: VisualizarExperienciaComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'anuncio', component: AnuncioComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent }, // ✅ nueva ruta agregada

  // Ruta comodín
  { path: '**', redirectTo: '/experiencia' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
