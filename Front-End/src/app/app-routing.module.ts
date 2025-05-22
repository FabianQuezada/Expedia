import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExperienceHistoryComponent } from './pages/experience-history/experience-history.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'historialExperiencia', component: ExperienceHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
