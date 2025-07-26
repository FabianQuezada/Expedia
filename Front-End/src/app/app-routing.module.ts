import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProviderProfileComponent } from './components/provider-profile/provider-profile.component';


const routes: Routes = [
  {path: '', component: UserProfileComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'provider-profile', component: ProviderProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { 
}
