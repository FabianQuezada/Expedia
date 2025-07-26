import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';

@Component({
  selector: 'app-card-actividad',
  templateUrl: './card-actividad.component.html',
  styleUrls: ['./card-actividad.component.css']
})
export class CardActividadComponent implements OnInit {
  @Input() experiencia!: Experiencia;

  ngOnInit(): void {
  }
}