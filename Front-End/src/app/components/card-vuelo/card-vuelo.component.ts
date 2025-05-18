import { Component } from '@angular/core';

@Component({
  selector: 'app-card-vuelo',
  templateUrl: './card-vuelo.component.html',
  styleUrls: ['./card-vuelo.component.css']
})
export class CardVueloComponent {
  vuelo = {
    id:1,
    nombre:'SKY AIRLINE',
    logo:'https://upload.wikimedia.org/wikipedia/commons/5/5a/Nuevo-logo-Sky-Airline.png',
    imagen:'https://a.travel-assets.com/travel-assets-manager/ca44f761-d2eb-4ba7-b313-e4c96302ac06/EG-CC-HP-woman-on-the-beach.jpg?impolicy=resizecrop&rw=800&ra=fit',
    horaInicio:'6:15 a. m.',
    horaFinal:'8:00 a. m.',
    lugarInicio:'Puerto Montt (PMC)',
    lugarFinal:'Santiago (SCL)',
    precio:58428,
  }
}
