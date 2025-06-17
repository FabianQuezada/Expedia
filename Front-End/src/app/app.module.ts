import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
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
    ExpImagesComponent,
    ExpDescComponent,
    ExpDispComponent,
    ExpOtherComponent,
    ReviewsComponent,
    ExperienceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: 'LOCALE_ID', useValue: 'es' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
