import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ExperienceComponent } from './components/experience/experience.component';

const routes: Routes = [
  { path: '', component: ExperienceComponent },
  { path: 'resenas', component: ReviewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
