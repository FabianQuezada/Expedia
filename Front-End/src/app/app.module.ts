import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home-section/home.component';
import { CardActividadComponent } from './components/home/card-actividad/card-actividad.component';
import { SearchBarActivityComponent } from './components/search-bar-activity/search-bar-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
