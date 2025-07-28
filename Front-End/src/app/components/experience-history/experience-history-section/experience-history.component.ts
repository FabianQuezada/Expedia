import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience.model';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-experience-history',
  templateUrl: './experience-history.component.html',
  styleUrls: ['./experience-history.component.css'],
})
export class ExperienceHistoryComponent implements OnInit {
  constructor(private reservaService: ReservaService) {}
  experienceInactive: Experience[] = [];
  experienceActive: Experience[] = [];

  ngOnInit(): void {
    this.reservaService.getMisReservas$().subscribe((experiences: Experience[]) => {
      console.log('Experiencias reservadas:', experiences);
      this.experienceActive = experiences.filter(exp => exp.esActiva());
      this.experienceInactive = experiences.filter(exp => !exp.esActiva());
    });
  }
}
