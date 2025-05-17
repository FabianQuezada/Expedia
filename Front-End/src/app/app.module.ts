import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 👈 IMPORTANTE

import { AppComponent } from './app.component';
import { VisualizarExperienciaComponent } from './paginas/visualizar-experiencia/visualizar-experiencia.component';
import { PagoComponent } from './paginas/pago/pago.component';
import { AnuncioComponent } from './paginas/anuncio/anuncio.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { LoginComponent } from './paginas/login/login.component'; // Asegúrate de que esté

@NgModule({
  declarations: [
    AppComponent,
    VisualizarExperienciaComponent,
    PagoComponent,
    AnuncioComponent,
    PerfilComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,               // 👈 para ngModel (si se usa)
    ReactiveFormsModule        // ✅ para formGroup, formArrayName, etc.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
