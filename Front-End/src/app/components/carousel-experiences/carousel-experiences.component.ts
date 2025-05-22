import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-experiences',
  templateUrl: './carousel-experiences.component.html',
  styleUrls: ['./carousel-experiences.component.css'],
})
export class CarouselExperiencesComponent {
  @Input() carouselId: string = 'defaultCarousel';
  
}
