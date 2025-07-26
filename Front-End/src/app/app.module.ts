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
import { CouponsSectionComponent } from './components/user-coupon/coupons-section/coupons-section.component';
import { CardCouponComponent } from './components/user-coupon/card-coupon/card-coupon.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    SearchbarComponent,
    NavbarComponent,
    UserProfileComponent,
    CouponsSectionComponent,
    CardCouponComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
