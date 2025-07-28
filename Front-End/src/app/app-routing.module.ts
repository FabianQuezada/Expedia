import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoReprogramacionComponent } from './components/reprogramacion/contenido-reprogramacion/contenido-reprogramacion.component'; 
import { ContenidoPagoComponent } from './components/pago/contenido-pago/contenido-pago.component';
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/filtro-busqueda/search-results/search-results.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ExperienceComponent } from './components/visualizar-experiencia/experience/experience.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProviderProfileComponent } from './components/provider-profile/provider-profile.component';
import { NewServiceComponent } from './components/create-service/new-service/new-service.component';
import { ExperienceHistoryComponent } from './components/experience-history/experience-history-section/experience-history.component';
import { ProviderRegisterComponent } from './components/auth/provider-register/provider-register.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ResenaGuard } from './guards/resena.guard';
import { PagoGuard } from './guards/pago.guard';


const routes: Routes = [
  
  {path: '', component: HomeComponent},
  {path: 'resultados', component: SearchResultsComponent},
  {path: 'experiencia/:id', component: ExperienceComponent },
  {path: 'pago', component: ContenidoPagoComponent, canActivate: [PagoGuard] },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'home', component: HomeComponent },
  {path: 'resenas/:idExperiencia', component: ReviewsComponent, canActivate: [ResenaGuard] },
  {path: 'perfil-proveedor', component: ProviderProfileComponent, canActivate: [RoleGuard]},
  {path: 'add-service', component: NewServiceComponent, canActivate: [RoleGuard]},
  {path: 'perfil', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'historialExperiencia', component: ExperienceHistoryComponent},
  {path: 'registro-proveedor', component: ProviderRegisterComponent},
  {path: 'reprogramacion', component: ContenidoReprogramacionComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { 
}
