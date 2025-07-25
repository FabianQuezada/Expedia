import { Component, Input } from '@angular/core';
import { Experience } from 'src/app/models/experience.model';

@Component({
  selector: 'app-card-actividad',
  templateUrl: './card-actividad.component.html',
  styleUrls: ['./card-actividad.component.css']
})
export class CardActividadComponent {
  @Input() experiencia!: Experience;
}
