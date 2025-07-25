import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience.model';
import { ExperienceService } from 'src/app/service/experience/experience.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selectedTab: string = 'actividades';
  personas: number = 1;

  @Input() experiences: Experience[] = [];
  experienceChunks: Experience[][] = [];

  constructor(
    private experienceService: ExperienceService,
  ) {}

  ngOnInit(): void {
    // Cargar experiencias
    this.experienceService.getAllExperiences$().subscribe((data) => {
      this.experiences = data;
      this.groupExperiences();
    });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  private groupExperiences(): void {
    const chunkSize = 4;
    this.experienceChunks = [];
    for (let i = 0; i < this.experiences.length; i += chunkSize) {
      this.experienceChunks.push(this.experiences.slice(i, i + chunkSize));
    }
  }
}
