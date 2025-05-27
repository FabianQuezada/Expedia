import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomepageComponent } from './components/home/homepage/homepage.component';
import { SearchbarComponent } from './components/home/searchbar/searchbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NewServiceComponent } from './components/new-service/new-service.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ServiceDetailUploadComponent } from './components/service-detail-upload/service-detail-upload.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    SearchbarComponent,
    NavbarComponent,
    UserProfileComponent,
    NewServiceComponent,
    ImageUploadComponent,
    ServiceDetailUploadComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, GoogleMapsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
