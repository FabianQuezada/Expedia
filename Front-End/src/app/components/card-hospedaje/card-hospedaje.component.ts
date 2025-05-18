import { Component } from '@angular/core';

@Component({
  selector: 'app-card-hospedaje',
  templateUrl: './card-hospedaje.component.html',
  styleUrls: ['./card-hospedaje.component.css']
})
export class CardHospedajeComponent {
//@Input() hospeje!: {}; 

hospedaje = {
  id: 1,
  nombre: 'The Franklin Castle',
  imagen: 'https://images.trvl-media.com/lodging/94000000/93470000/93462800/93462740/681c45f5.jpg?impolicy=resizecrop&rw=1200&ra=fit'
};
}
