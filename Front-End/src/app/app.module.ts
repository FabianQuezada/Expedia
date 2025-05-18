import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CardVueloComponent } from './components/card-vuelo/card-vuelo.component';
import { CardHospedajeComponent } from './components/card-hospedaje/card-hospedaje.component';
import { CardActividadComponent } from './components/card-actividad/card-actividad.component';
import { SearchBarActivityComponent } from './components/search-bar-activity/search-bar-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardVueloComponent,
    CardHospedajeComponent,
    CardActividadComponent,
    SearchBarActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
