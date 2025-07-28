import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Experience } from 'src/app/models/experience.model';

@Component({
  selector: 'app-carousel-experiences',
  templateUrl: './carousel-experiences.component.html',
  styleUrls: ['./carousel-experiences.component.css'],
})
export class CarouselExperiencesComponent implements OnChanges {
  @Input() carouselId: string = 'defaultCarousel';
  @Input() experiences: Experience[] = [];
  experienceChunks: Experience[][] = [];

  // Reacciona cuando cambia el input 'experiences'
  ngOnChanges(changes: SimpleChanges) {
    if (changes['experiences']) {
      this.groupExperiences();
    }
  }

  // Divide en 4 chunks las experiencias para los slides
  private groupExperiences(): void {
    this.experienceChunks = [];
    const chunkSize = 4;
    for (let i = 0; i < this.experiences.length; i += chunkSize) {
      this.experienceChunks.push(this.experiences.slice(i, i + chunkSize));
    }
  }
}
