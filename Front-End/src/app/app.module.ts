import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home-section/home.component';
import { CardVueloComponent } from './components/home/card-vuelo/card-vuelo.component';
import { CardHospedajeComponent } from './components/home/card-hospedaje/card-hospedaje.component';
import { CardActividadComponent } from './components/home/card-actividad/card-actividad.component';
import { SearchBarActivityComponent } from './components/search-bar-activity/search-bar-activity.component';
import { ExperienceHistoryComponent } from './components/experience-history/experience-history-section/experience-history.component';
import { CarouselExperiencesComponent } from './components/experience-history/carousel-experiences/carousel-experiences.component';
import { CardExperienceComponent } from './components/experience-history/card-experience/card-experience.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardVueloComponent,
    CardHospedajeComponent,
    CardActividadComponent,
    SearchBarActivityComponent,
    ExperienceHistoryComponent,
    CarouselExperiencesComponent,
    CardExperienceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
