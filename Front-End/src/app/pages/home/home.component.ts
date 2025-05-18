import { Component } from '@angular/core';
import { CardVueloComponent } from 'src/app/components/card-vuelo/card-vuelo.component';
import { CardHospedajeComponent } from 'src/app/components/card-hospedaje/card-hospedaje.component';
import { CardActividadComponent } from 'src/app/components/card-actividad/card-actividad.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedTab: string = 'vuelos';
  personas: number = 1;


  selectTab(tab: string): void {
    this.selectedTab = tab;}
}
