import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizarExperienciaComponent } from './paginas/visualizar-experiencia/visualizar-experiencia.component';
import { ContenidoPagoComponent } from './paginas/pago/contenido-pago/contenido-pago.component';
import { AnuncioComponent } from './paginas/anuncio/anuncio.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { LoginComponent } from './paginas/login/login.component';
import { ContenidoReprogramacionComponent } from './paginas/reprogramacion/contenido-reprogramacion/contenido-reprogramacion.component'; // ✅ NUEVO

const routes: Routes = [
  { path: '', component: VisualizarExperienciaComponent },
  { path: 'pago', component: ContenidoPagoComponent },
  { path: 'anuncio', component: AnuncioComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reprogramacion', component: ContenidoReprogramacionComponent } // ✅ CORREGIDO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
