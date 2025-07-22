import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoPagoComponent } from './components/pago/contenido-pago/contenido-pago.component';
import { DisponibilidadComponent } from './components/disponibilidad/disponibilidad.component';

const routes: Routes = [
  { path: '', component: DisponibilidadComponent },
  { path: 'pago', component: ContenidoPagoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
