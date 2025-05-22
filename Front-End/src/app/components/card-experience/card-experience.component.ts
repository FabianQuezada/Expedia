import { Component } from '@angular/core';

@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrls: ['./card-experience.component.css']
})
export class CardExperienceComponent {
experiencia= {
  id:1,
  imagen:'https://media.vrbo.com/localexpert/189689/43748090-465f-4a20-8a12-1e5be9922694.jpg?impolicy=resizecrop&rw=1005&rh=565',
  titulo:'Parque Xcaret con Espectáculo (Buffet y Transporte Opcional)',
  fecha:'04/06/2025',
  precio:'102,894',
  valoracion: 7,
  cantidadValoracion: 140,
}
}
