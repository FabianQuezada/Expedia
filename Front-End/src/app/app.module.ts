import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContenidoPagoComponent } from './components/pago/contenido-pago/contenido-pago.component';
import { MetodoPagoComponent } from './components/pago/metodo-pago/metodo-pago.component';
import { DisponibilidadComponent } from './components/disponibilidad/disponibilidad.component';
import { PagoComponent } from './components/pago/pago.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenidoPagoComponent,
    MetodoPagoComponent,
    DisponibilidadComponent,
    PagoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
