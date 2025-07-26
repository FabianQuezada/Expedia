import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomepageComponent } from './components/home/homepage/homepage.component';
import { SearchbarComponent } from './components/home/searchbar/searchbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NewServiceComponent } from './components/create-service/new-service/new-service.component';
import { ImageUploadComponent } from './components/create-service/image-upload/image-upload.component';
import { ServiceDetailUploadComponent } from './components/create-service/service-detail-upload/service-detail-upload.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { ServiceAddDatesComponent } from './components/create-service/service-add-dates/service-add-dates.component';
import { CouponsSectionComponent } from './components/user-coupon/coupons-section/coupons-section.component';
import { CardCouponComponent } from './components/user-coupon/card-coupon/card-coupon.component';
import { ProviderProfileComponent } from './components/provider-profile/provider-profile.component';
import { ViewServiceComponent } from './components/view-service/view-service.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    ServiceAddDatesComponent,
    CouponsSectionComponent,
    CardCouponComponent,
    ViewServiceComponent,
    ProviderProfileComponent
  ],
  imports: [BrowserModule, AppRoutingModule, GoogleMapsModule, FormsModule, ReactiveFormsModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
