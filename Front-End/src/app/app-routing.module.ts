import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home-section/home.component';
import { ExperienceHistoryComponent } from './components/experience-history/experience-history-section/experience-history.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'historialExperiencia', component: ExperienceHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
