import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VisualizarExperienciaComponent } from './paginas/visualizar-experiencia/visualizar-experiencia.component';
import { AnuncioComponent } from './paginas/anuncio/anuncio.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { LoginComponent } from './paginas/login/login.component';
import { ContenidoPagoComponent } from './paginas/pago/contenido-pago/contenido-pago.component';
import { MetodoPagoComponent } from './paginas/pago/metodo-pago/metodo-pago.component';
import { ContenidoReprogramacionComponent } from './paginas/reprogramacion/contenido-reprogramacion/contenido-reprogramacion.component';
import { MetodoPagoReprogramacionComponent } from './paginas/reprogramacion/metodo-pago-reprogramacion/metodo-pago-reprogramacion.component';
import { NavbarComponent } from './paginas/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualizarExperienciaComponent,
    AnuncioComponent,
    PerfilComponent,
    LoginComponent,
    ContenidoPagoComponent,
    MetodoPagoComponent,
    ContenidoReprogramacionComponent,
    MetodoPagoReprogramacionComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
