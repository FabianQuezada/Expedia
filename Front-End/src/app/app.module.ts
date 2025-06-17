import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    AppComponent,
    HomeComponent,
    CardVueloComponent,
    CardHospedajeComponent,
    CardActividadComponent,
    SearchBarActivityComponent,
    ResultsListComponent,
    FiltersPanelComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
