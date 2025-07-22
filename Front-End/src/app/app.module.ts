import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContenidoPagoComponent } from './components/pago/contenido-pago/contenido-pago.component';
import { MetodoPagoComponent } from './components/pago/metodo-pago/metodo-pago.component';
import { DisponibilidadComponent } from './components/disponibilidad/disponibilidad.component';
import { PagoComponent } from './components/pago/pago.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CardVueloComponent } from './components/card-vuelo/card-vuelo.component';
import { CardHospedajeComponent } from './components/card-hospedaje/card-hospedaje.component';
import { CardActividadComponent } from './components/card-actividad/card-actividad.component';
import { SearchBarActivityComponent } from './components/search-bar-activity/search-bar-activity.component';
import { ResultsListComponent } from './components/filtro-busqueda/results-list/results-list.component';
import { FiltersPanelComponent } from './components/filtro-busqueda/filters-panel/filters-panel.component';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './components/filtro-busqueda/search-results/search-results.component';
import { ExpImagesComponent } from './components/visualizar-experiencia/exp-images/exp-images.component';
import { ExpDescComponent } from './components/visualizar-experiencia/exp-desc/exp-desc.component';
import { ExpDispComponent } from './components/visualizar-experiencia/exp-disp/exp-disp.component';
import { ExpOtherComponent } from './components/visualizar-experiencia/exp-other/exp-other.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ExperienceComponent } from './components/visualizar-experiencia/experience/experience.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    CardVueloComponent,
    CardHospedajeComponent,
    CardActividadComponent,
    SearchBarActivityComponent,
    ResultsListComponent,
    FiltersPanelComponent,
    SearchResultsComponent,
    ExpImagesComponent,
    ExpDescComponent,
    ExpDispComponent,
    ExpOtherComponent,
    ReviewsComponent,
    ExperienceComponent,
    ContenidoPagoComponent,
    MetodoPagoComponent,
    DisponibilidadComponent,
    PagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: 'LOCALE_ID', useValue: 'es' } 
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
