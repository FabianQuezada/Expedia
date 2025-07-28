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
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NewServiceComponent } from './components/create-service/new-service/new-service.component';
import { ImageUploadComponent } from './components/create-service/image-upload/image-upload.component';
import { ServiceDetailUploadComponent } from './components/create-service/service-detail-upload/service-detail-upload.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ServiceAddDatesComponent } from './components/create-service/service-add-dates/service-add-dates.component';
import { CouponsSectionComponent } from './components/user-coupon/coupons-section/coupons-section.component';
import { CardCouponComponent } from './components/user-coupon/card-coupon/card-coupon.component';
import { ProviderProfileComponent } from './components/provider-profile/provider-profile.component';
import { ViewServiceComponent } from './components/view-service/view-service.component';
import { ContenidoPagoComponent } from './components/pago/contenido-pago/contenido-pago.component';
import { MetodoPagoComponent } from './components/pago/metodo-pago/metodo-pago.component';
import { PagoComponent } from './components/pago/pago.component';
import { HomeComponent } from './components/home/home.component';
import { CardVueloComponent } from './components/home/card-vuelo/card-vuelo.component';
import { CardHospedajeComponent } from './components/home/card-hospedaje/card-hospedaje.component';
import { CardActividadComponent } from './components/home/card-actividad/card-actividad.component';
import { SearchBarActivityComponent } from './components/search-bar-activity/search-bar-activity.component';
import { ExperienceHistoryComponent } from './components/experience-history/experience-history-section/experience-history.component';
import { CarouselExperiencesComponent } from './components/experience-history/carousel-experiences/carousel-experiences.component';
import { CardExperienceComponent } from './components/experience-history/card-experience/card-experience.component';
import { ResultsListComponent } from './components/filtro-busqueda/results-list/results-list.component';
import { FiltersPanelComponent } from './components/filtro-busqueda/filters-panel/filters-panel.component';
import { SearchResultsComponent } from './components/filtro-busqueda/search-results/search-results.component';
import { ExpImagesComponent } from './components/visualizar-experiencia/exp-images/exp-images.component';
import { ExpDescComponent } from './components/visualizar-experiencia/exp-desc/exp-desc.component';
import { ExpDispComponent } from './components/visualizar-experiencia/exp-disp/exp-disp.component';
import { ExpOtherComponent } from './components/visualizar-experiencia/exp-other/exp-other.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ExperienceComponent } from './components/visualizar-experiencia/experience/experience.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/interceptors/jwt.interceptor';


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
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    UserProfileComponent,
    NewServiceComponent,
    ImageUploadComponent,
    ServiceDetailUploadComponent,
    ServiceAddDatesComponent,
    CouponsSectionComponent,
    CardCouponComponent,
    ViewServiceComponent,
    ProviderProfileComponent,
    HomeComponent,
    CardVueloComponent,
    CardHospedajeComponent,
    CardActividadComponent,
    SearchBarActivityComponent,
    ExperienceHistoryComponent,
    CarouselExperiencesComponent,
    CardExperienceComponent,
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
    PagoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, GoogleMapsModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}

