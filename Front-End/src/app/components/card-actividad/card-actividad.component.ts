import { Component } from '@angular/core';

@Component({
  selector: 'app-card-actividad',
  templateUrl: './card-actividad.component.html',
  styleUrls: ['./card-actividad.component.css']
})
export class CardActividadComponent {
  actividad = {
    id:1,
    nombre:'Tirolesa Fly LINQ',
    imagen:'https://images.trvl-media.com/localexpert/533318/bae48478-ac2f-4e42-99a8-64eb8a0e4597.jpg?impolicy=resizecrop&rw=1005&rh=565'
  };
}
