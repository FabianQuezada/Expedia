import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoPagoComponent } from './components/pago/contenido-pago/contenido-pago.component';
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/filtro-busqueda/search-results/search-results.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ExperienceComponent } from './components/visualizar-experiencia/experience/experience.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'resultados/:destino', component: SearchResultsComponent},
  {path: 'experiencia/:id', component: ExperienceComponent },
  {path: 'resenas', component: ReviewsComponent },
  {path: 'pago', component: ContenidoPagoComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
